import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliverymanDeliveryController {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        signature_id: null,
      },
      order: ['id', 'start_date'],
      attributes: ['id', 'start_date', 'end_date', 'created_at', 'product'],
      include: {
        model: Recipient,
        as: 'recipient',
        attributes: [
          'id',
          'name',
          'street',
          'street_number',
          'zipcode',
          'city',
          'state',
        ],
      },
    });

    if (!deliveries) {
      return res
        .status(404)
        .json({ error: 'There is no available deliveries' });
    }

    return res.status(200).json(deliveries);
  }
}

export default new DeliverymanDeliveryController();
