import Delivery from '../models/Delivery';
import File from '../models/File';

class EndDeliveryController {
  async store(req, res) {
    const { delivery_id, deliveryman_id } = req.params;

    const { originalname: name, filename: path } = req.file;

    let delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.deliveryman_id !== Number(deliveryman_id)) {
      return res.status(404).json({ error: 'Delivery of another worker' });
    }

    if (delivery.canceled_at) {
      return res
        .status(400)

        .json({ error: 'You cannot pick a canceled delivery' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Delivery already ended' });
    }

    const file = await File.create({
      name,
      path,
    });

    if (!file) {
      return res
        .status(500)
        .json({ error: 'Could not create the signature file' });
    }

    delivery = await delivery.update({
      signature_id: file.id,
      end_date: new Date(),
    });
    return res.status(201).json(delivery);
  }
}

export default new EndDeliveryController();
