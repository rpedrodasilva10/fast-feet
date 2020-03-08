import Mail from '../../lib/Mail';

class DeliverycreationMail {
  get key() {
    return 'DeliverycreationMail';
  }

  async handle({ data }) {
    const { deliveryman_name, email, product, recipient_name } = data;

    await Mail.sendMail({
      to: `${deliveryman_name} <${email}>`,
      subject: 'Mercadoria para retirada',
      template: 'deliverycreation',
      context: {
        deliveryman_name,
        product,
        recipient_name,
      },
    });
  }
}

export default new DeliverycreationMail();
