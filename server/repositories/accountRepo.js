const { Account, Investment } = require("../models"); 

module.exports = {
  async insert(data) {
    return await Account.create(data);
  },

  async findAllByUser(userId) {
    return await Account.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  },

  async findById(id, userId) {
    return await Account.findOne({ where: { id, userId } });
  },
  async update(id, userId, data) {
    const account = await this.findById(id, userId);
    if (account) return await account.update(data);
    return null;
  },
  async delete(id, userId) {
    return await Account.destroy({
      where: { id, userId },
    });
  },
  async findByIdWithActiveInvestments(id, userId) {
    //para buscar cuentas con inversiones que siguen en activo 
    return await Account.findOne({
      where: { id, userId },
      include: [{
        model: Investment,
        as: "investments",
        where: { status: "active" },
        required: false, 
      }],
    });
  },
};
