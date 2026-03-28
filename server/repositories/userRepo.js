const { User } = require("../models");

module.exports = {
  getAll() {
    return User.findAll();
  },
  insert(data) {
    return User.create(data);
  },
  getById(id) {
    return User.findByPk(id);
  },
  getByMail(email) {
    return User.findOne({
      where: { email },
    });
  },
  async update(id, data) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error(`El usuario con ID ${id} no existe`);
    }
    return await user.update(data);
  },
  deleteById(id) {
    return User.destroy({ where: { id } });
  },
};
