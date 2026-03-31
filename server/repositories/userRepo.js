const { User } = require("../models");

module.exports = {
  getAll() {
    return User.findAll();
  },
  insert(data) {
    return User.create(data);
  },
  async getById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ["password_hash"] }, // Seguridad: nunca enviamos el hash
    });
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
  async deleteById(id) {
    return await User.destroy({ where: { id } });
  },
};
