import { Op } from 'sequelize';
import { setSeconds, setMinutes, setHours, isAfter, isBefore } from 'date-fns';

import Delivery from '../models/Delivery';

class StartDeliveryController {
  async store(req, res) {
    const { delivery_id, deliveryman_id } = req.params;

    let delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.deliveryman_id !== Number(deliveryman_id)) {
      return res.status(404).json({ error: 'Delivery of another worker' });
    }

    if (delivery.start_date) {
      return res.status(400).json({ error: 'Delivery already started' });
    }

    if (delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: 'You cannot pick a canceled delivery' });
    }
    const date = new Date();

    const startHour = setSeconds(setMinutes(setHours(date, 8), 0), 0);
    const endHour = setSeconds(setMinutes(setHours(date, 18), 0), 0);

    if (isAfter(date, endHour) || isBefore(date, startHour)) {
      return res
        .status(400)
        .json({ error: 'Delivery pickups must happen between 8am and 6pm' });
    }

    const deliveries = await Delivery.findAndCountAll({
      where: {
        canceled_at: null,
        end_date: null,
        deliveryman_id,
        start_date: {
          [Op.between]: [startHour, endHour],
        },
      },
    });

    if (deliveries.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only have 5 deliveries per day' });
    }

    delivery = await delivery.update({ start_date: date });

    return res.json(delivery);
  }
}

export default new StartDeliveryController();
