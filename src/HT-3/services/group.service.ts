import { Group } from '../models/Group.model';
import { Op } from 'sequelize';
import { User } from '../models/User.model';

export class GroupService {

  getActiveGroups(): Promise<any[]> {
    return Group.findAll({
      attributes: ['id', 'name', 'permissions']
    });
  }

  createGroup(data: any): Promise<any> {
    return Group.create(data);
  }

  updateGroup(id: string, data: any) {
    return Group.update(data, {
      where: {id},
      returning: true
    });
  }

  findGroup(id: string): Promise<any> {
    return Group.findOne({
      where: { id },
      include: {
        model: User,
        as: 'users',
        attributes: ['id', 'login'],
        required: false,
        through: {
          attributes: []
        }
      },
      attributes: ['id', 'name', 'permissions'],
    });
  }

  deleteGroup(id: string) {
    return Group.destroy({
      where: { id }
    });
  }

  getAutoSuggestGroups(name = '', limit = 10, orderBy = 'ASC') {
    return Group.findAndCountAll({
      where: {
        login: {
          [Op.like]: `%${name}%`
        }
      },
      limit,
      attributes: ['id', 'name', 'permissions'],
      order: [
        ['name', orderBy]
      ]
    })
  }
}
