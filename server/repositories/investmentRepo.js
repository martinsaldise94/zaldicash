const { Investment } = require("../models");

module.exports = {
  async insert(data) {
    return await Investment.create(data);
  },

  async getByUserId(userId) {
    //PARA QUE LAS AMS RECIENTES SALGAN PRIMERO 
    return await Investment.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  },
};
