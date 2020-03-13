import Delivery from '../models/Delivery';
import DeliveryProblems from '../models/DeliveryProblems';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import DeliverycancellationMail from '../jobs/DeliverycancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async destroy(req, res) {
    const { problem_id } = req.params;

    const problem = await DeliveryProblems.findByPk(problem_id);

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    let delivery = await Delivery.findByPk(problem.delivery_id);

    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery already done' });
    }

    // if (delivery.canceled_at) {
    //   return res.status(401).json({ error: 'Delivery already canceled' });
    // }

    const { description } = problem;

    const { email, name: deliveryman_name } = await Deliveryman.findByPk(
      delivery.deliveryman_id
    );

    const { product } = delivery;

    const { name: recipient_name } = await Recipient.findByPk(
      delivery.recipient_id
    );

    Queue.add(DeliverycancellationMail.key, {
      deliveryman_name,
      email,
      recipient_name,
      product,
      description,
    });

    delivery = await delivery.update({
      canceled_at: new Date(),
    });
    return res.status(201).json(delivery);
  }

  async index(req, res) {
    const { delivery_id } = req.params;

    const problems = await DeliveryProblems.findAll({
      where: {
        delivery_id,
      },
    });

    if (!problems) {
      return res.status(401).json({ error: 'No problems to show' });
    }

    return res.json(problems);
  }

  async store(req, res) {
    const { delivery_id } = req.params;

    const { description } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery already ended' });
    }

    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery already canceled' });
    }

    const problem = await DeliveryProblems.create({
      delivery_id,
      description,
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemsController();
