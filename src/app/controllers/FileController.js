import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.status(201).json({ message: 'File created', file });
  }

  async index(req, res) {
    const files = await File.findAll();

    return res.status(200).json(files);
  }

  async show(req, res) {
    const { id } = req.params;

    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.status(200).json(file);
  }
}

export default new FileController();
