'use strict';
const Service = require('egg').Service; 

class RoleService extends Service {
  // 获取角色列表
  async list(options) {
    const {
      ctx: { model }
    } = this;
    return model.Role.findAndCountAll({
      ...options,
      order: [
        ["created_at", "desc"],
        ["id", "desc"]
      ]
    });
  }

  // 通过 id 获取角色
  async find(id) {
    const {
      ctx: { model }
    } = this;
    const role = await model.Role.findByPk(id);
    if (!role) {
      this.ctx.throw(404, "role not found");
    }
    return role;
  }

  // 创建角色
  async create(role) {
    const {
      ctx: { model }
    } = this;
    return model.Role.create(role);
  }

  // 更新角色
  async update({ id, updates }) {
    const role = await this.ctx.model.Role.findByPk(id);
    if (!role) {
      this.ctx.throw(404, "role not found");
    }
    return role.update(updates);
  }

  // 删除角色
  async destroy(id) {
    const role = await this.ctx.model.Role.findByPk(id);
    if (!role) {
      this.ctx.throw(404, "role not found");
    }
    return role.destroy();
  }
}

module.exports = RoleService;