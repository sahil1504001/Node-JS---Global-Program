import { User } from '../models/User.model';
import { Group } from '../models/Group.model';
import { Op } from 'sequelize';

export class UserService {

  getActiveUsers(): Promise<any[]> {
    return User.findAll({
      attributes: ['id', 'login', 'age'],
      where: {
        isDeleted: false
      }
    });
  }

  createUser(data: any): Promise<any> {
    return User.create(data);
  }

  updateUser(id: string, data: any) {
    return User.update(data, {
      where: {id, isDeleted: false},
      returning: true
    });
  }

  findUser(id: string): Promise<any> {
    return User.findOne({
      include: {
        model: Group,
        as: 'groups',
        required: false,
        attributes: ['id', 'name', 'permissions'],
        through: {
          attributes: []
        }
      },
      where: { id, isDeleted: false },
      attributes: ['id', 'login', 'age'],
    });
  }

  softDeleteUser(id: string) {
    return User.update({isDeleted: true}, {
      where: { id, isDeleted: false }
    });
  }

  deleteUser(id: string) {
    return User.destroy({
      where: { id }
    });
  }

  getAutoSuggestUsers(loginSubstring = '', limit = 10, orderBy = 'ASC') {
    return User.findAndCountAll({
      where: {
        isDeleted: false,
        login: {
          [Op.like]: `%${loginSubstring}%`
        }
      },
      limit,
      attributes: ['id', 'login', 'age'],
      order: [
        ['login', orderBy]
      ]
    })
  }
}
