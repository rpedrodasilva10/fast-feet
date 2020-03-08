import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import DeliverycreationMail from '../jobs/DeliverycreationMail';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      order: ['id'],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
      signature_id: Yup.number().integer(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation error' });
    }

    const { recipient_id, deliveryman_id, signature_id, product } = req.body;

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });

    const { email, name: deliveryman_name } = await Deliveryman.findByPk(
      deliveryman_id
    );

    const { name: recipient_name } = await Recipient.findByPk(recipient_id);
    Queue.add(DeliverycreationMail.key, {
      deliveryman_name,
      email,
      recipient_name,
      product,
    });

    return res.status(201).json(delivery);
  }

  async destroy(req, res) {
    const { id } = req.params;

    let delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    delivery = await delivery.destroy();

    return res.status(200).json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;
    const { deliveryman_id, product, canceled_at } = req.body;

    let delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    delivery = await delivery.update({
      ...delivery,
      deliveryman_id,
      product,
      canceled_at,
    });

    return res.status(200).json(delivery);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    return res.status(200).json(delivery);
  }
}

export default new DeliveryController();
