const Debt = require('../database/models/Debt');
const { errorResolver, mergeUserInDebt } = require('../util/sequelizeUtil');

module.exports = {
  async list(req, res) {
    try {
      let debt = await Debt.findByPk(req.params.id);
      if (!debt) return res.status(404).json({ error: 'Debt not found.' });
      debt = await mergeUserInDebt(debt);
      return res.json(debt);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async listAll(req, res) {
    try {
      let debts = await Debt.findAll({ order: [['id', 'ASC']] });
      debts = await mergeUserInDebt(debts);

      return res.json(debts);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async create(req, res) {
    try {
      const debt = await Debt.create(req.body);

      return res.status(201).json(debt);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async update(req, res) {
    try {
      const debt = await Debt.findByPk(req.params.id);
      if (!debt) return res.status(404).json({ error: 'Debt not found.' });

      const result = await debt.update(req.body);

      return res.json(result);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async delete(req, res) {
    try {
      const debt = await Debt.findByPk(req.params.id);
      if (!debt) return res.status(404).json({ error: 'Debt not found.' });
      debt.destroy();

      return res.sendStatus(204);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
