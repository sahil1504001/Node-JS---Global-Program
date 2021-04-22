import { User } from '../models/User.model';
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
    console.log(id, data);
    return User.update(data, {
      where: {id, isDeleted: false},
      returning: true
    });
  }

  findUser(id: string): Promise<any> {
    return User.findOne({
      where: { id, isDeleted: false },
      attributes: ['id', 'login', 'age'],
    });
  }

  deleteUser(id: string) {
    return User.update({isDeleted: true}, {
      where: { id, isDeleted: false }
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
