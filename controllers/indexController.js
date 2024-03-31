class IndextController {
  constructor() {
  }

  async getHome(req, res) {
    try {
      res.render('./index', {});
    } catch (error) {
      res.status(500).send(error);
    }
  }

}

module.exports = IndextController;
