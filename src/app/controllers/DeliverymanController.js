import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.status(200).json(deliverymans);
  }

  async store(req, res) {
    const { name, email } = req.body;

    const deliveryman = await Deliveryman.create({ name, email });

    if (!deliveryman) {
      return res
        .status(500)
        .json({ error: 'Could not create the deliveryman' });
    }
    return res.json(deliveryman);
  }

  async update(req, res) {
    const { id } = req.params;

    let deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    deliveryman = await deliveryman.update(req.body);

    return res.status(200).json({ deliveryman });
  }

  async destroy(req, res) {
    const { id } = req.params;

    let deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    deliveryman = await deliveryman.destroy();
    return res.status(200).json({ deliveryman });
  }
}

export default new DeliverymanController();
