import { User } from '../models/User.model';
import { Group } from '../models/Group.model';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import config from "../config/dev.json";

export class UserService {

  async login(username: string, password: string) {
    const user = await User.findOne({ where: { login: username } });

    if (!user || user.getDataValue('password') !== password) {
      return Promise.reject({ status: 401, message: `username or password is wrong!` });
    }

    const accessToken = jwt.sign({ username }, config.token.secret, { expiresIn: config.token.tokenLife });
    return Promise.resolve({ status: 200, accessToken });
  }

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
