const axios = require('axios');
const { errorResolver } = require('../util/sequelizeUtil');
const { CONFIGS } = require('../config/configs');

module.exports = {
  async listAll(req, res) {
    try {
      const users = await axios.get(CONFIGS.JSON_PLACEHOLDER_URL);
      return res.json(users.data);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
