import Mail from '../../lib/Mail';

class DeliverycancellationMail {
  get key() {
    return 'DeliverycancellationMail';
  }

  async handle({ data }) {
    const {
      deliveryman_name,
      email,
      product,
      recipient_name,
      description,
    } = data;

    await Mail.sendMail({
      to: `${deliveryman_name} <${email}>`,
      subject: 'Entrega cancelada',
      template: 'deliverycancellation',
      context: {
        deliveryman_name,
        product,
        recipient_name,
        description,
      },
    });
  }
}

export default new DeliverycancellationMail();
