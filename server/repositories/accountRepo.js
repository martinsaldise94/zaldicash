const { Account } = require("../models");

module.exports = {
  async insert(data) {
    return await Account.create(data);
  },

  async findAllByUser(userId) {
    return await Account.findAll({ 
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  },

  async findById(id, userId) {
    return await Account.findOne({ where: { id, userId } });
  }
};