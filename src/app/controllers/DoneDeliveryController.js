import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DoneDeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        signature_id: {
          [Op.ne]: null,
        },
      },
      order: ['id', 'start_date'],
      attributes: [
        'id',
        'start_date',
        'end_date',
        'created_at',
        'product',
        'signature_id',
      ],
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
        .json({ error: 'You do not have deliveries done yet' });
    }

    return res.status(200).json(deliveries);
  }
}

export default new DoneDeliveryController();
