const sanitizeHtml = require('sanitize-html');

class IndextController {
  constructor() {
  }

  async getHome(req, res) {
    try {
      res.render('./index/index', {});
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getIndexMain(req, res) {
    try {
        const { searchTerm = ''} = req.query;
        const sanitizedSearchTerm = sanitizeHtml(searchTerm, {
              allowedTags: [],
              allowedAttributes: {},
          });

        res.render('./index/indexMain', {searchTerm : sanitizedSearchTerm});
    } catch (error) {
        res.status(500).send(error);
    }
  }

}

module.exports = IndextController;
