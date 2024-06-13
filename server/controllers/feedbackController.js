class FeedbackController {
  async create(req, res) {
    const { userid } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {}
}

module.exports = new FeedbackController();
