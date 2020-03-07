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
}

export default new FileController();
