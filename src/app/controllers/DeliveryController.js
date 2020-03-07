import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const deliveries = Delivery.findAll();

    return res.json(deliveries);
  }

  async store(req, res) {
    const { recipient_id, deliveryman_id, signature_id, product } = req.body;

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });

    return res.status(201).json(delivery);
    /**
     *  A data de início deve ser cadastrada assim que for feita a retirada do produto pelo entregador,
     *  e as retiradas só podem ser feitas entre as 08:00 e 18:00h.

 A data de término da entrega deve ser cadastrada quando o entregador finalizar a entrega:

 Os campos recipient_id e deliveryman_id devem ser cadastrados no momento que for cadastrada a encomenda.

 Quando a encomenda é cadastrada para um entregador, o entregador recebe um e-mail
 com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.
     */
  }
}

export default new DeliveryController();
