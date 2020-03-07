import * as yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  static validateDefaultSchema(payload) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      state: yup
        .string()
        .min(2)
        .required(),
      street: yup.string().required(),
      street_number: yup
        .number()
        .integer()
        .required(),
      city: yup.string().required(),
      complement: yup.string(),
      zipcode: yup
        .string()
        .length(5)
        .matches(/^[0-9]*$/)
        .required(),
    });

    return schema.isValid(payload);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res
        .status(404)
        .json({ error: 'Recipient not found with the given ID' });
    }
    return res.json(recipient);
  }

  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async store(req, res) {
    if (!(await RecipientController.validateDefaultSchema(req.body))) {
      return res.status(401).json({ error: 'Validation error' });
    }
    const {
      id,
      name,
      street,
      street_number,
      zipcode,
      complement,
      city,
      state,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      street_number,
      zipcode,
      complement,
      city,
      state,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    let recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    recipient = await recipient.update(req.body);
    return res.status(200).json({ recipient });
  }

  async destroy(req, res) {
    const { id } = req.params;

    let result = await Recipient.findByPk(id);

    if (!result) {
      return res.staus(404).json({ error: 'Recipient not found' });
    }

    result = await result.destroy();
    return res.status(200).json(result);
  }
}
export default new RecipientController();
