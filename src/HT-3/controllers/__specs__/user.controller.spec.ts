import { Response, Request} from 'express';
import { UserService } from '../../services/user.service';
import { UserController } from '../user.controller';
import { getPromiseMock } from './mocks/promise.mock';

jest.mock('../../services/user.service');

describe('UserController', () => {
  let controller: UserController;
  let us: jest.Mocked<UserService>;
  let promise: Promise<any>;
  let resolveFn: (value: any | PromiseLike<any>) => void;
  let rejectFn: (reason?: any| PromiseLike<any>) => void;

  beforeEach(() => {
    controller = new UserController();
    us = controller['userService'] as jest.Mocked<UserService>;
    ({ resolveFn, rejectFn, promise } = getPromiseMock());
  });

  it('should be created', () => {
    expect(controller).toBeDefined();
  });

  describe('getActiveUsers', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn((code) => expect(code).toEqual(404)).mockReturnThis()
    } as any;
    let req: Request;

    afterEach(() => {
      us.getActiveUsers.mockReset();
    });

    it('should success on API success', () => {
      us.getActiveUsers.mockImplementation(() => promise);
      controller.getActiveUsers(req, res);
      promise.then(() => {
        expect(us.getActiveUsers).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([{message: 'Mock Response'}]);
      })
      .catch(err => console.log(err));
      resolveFn([{message: 'Mock Response'}]);
    });

    it('should fail on API fail', async() => {
      us.getActiveUsers.mockImplementation(() => {
        rejectFn({message: 'Mock Rejection'});
        return promise;
      });
      controller.getActiveUsers(req, res);

      promise
      .catch((error) => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('getAutoSuggestUsers', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn(() => {
        return this;
      }).mockReturnThis()
    } as any;
    let req: Request = {
      query: {
        search: 'test',
        limit: 10
      } as any
    } as Request;

    afterEach(() => {
      us.getAutoSuggestUsers.mockReset();
    });

    it('should success on API success', async() => {
      us.getAutoSuggestUsers.mockImplementation((loginSubstring, limit, orderBy) => {
        expect(loginSubstring).toEqual('test');
        expect(limit).toEqual(10);
        expect(orderBy).toBeUndefined();
        return promise;
      });
      controller.getAutoSuggestUsers(req, res);

      await resolveFn({rows: [], count: 10})
      expect(us.getAutoSuggestUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({rows: [], count: 10});
    });

    it('should fail on API fail', () => {
      us.getAutoSuggestUsers.mockImplementation(() => {
        rejectFn({message: 'Mock Rejection'});
        return promise;
      });

      controller.getAutoSuggestUsers(req, res);
      return promise.then(() => {})
      .catch((error) => {
        expect(us.getAutoSuggestUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('findUser', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn()
    } as any;
    let req: Request = {params: {id: 'Mock'}} as any as Request;

    afterEach(() => {
      us.findUser.mockReset();
    });

    it('should success on API success response', () => {
      us.findUser.mockImplementation(() => promise);
      controller.findUser(req, res);
      promise.then(() => {
        expect(us.findUser).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith([{message: 'Mock Response'}]);
      })
      .catch(err => console.log(err));
      resolveFn([{message: 'Mock Response'}]);
    });

    it('should success on API empty response', () => {
      us.findUser.mockImplementation(() => promise);
      controller.findUser(req, res);
      promise.then(() => {
        expect(us.findUser).toHaveBeenCalledWith(req.params.id);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
      })
      .catch(err => console.log(err));
      resolveFn(null);
    });

    it('should fail on API fail', () => {
      us.findUser.mockImplementation(() => {
        rejectFn({ id: 'Mock' });
        return promise}
      );
      controller.findUser(req, res);

      return promise
      .then(() => {})
      .catch(() => {
        expect(us.findUser).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('createUser', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    } as any;
    let req: Request = {body: 'test body'} as unknown as Request;

    afterEach(() => {
      us.createUser.mockReset();
    });

    it('should success on API success', () => {
      us.createUser.mockImplementation(() => promise);
      controller.createUser(req, res);
      promise.then((response) => {
        expect(us.createUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(response);
      })
      .catch(err => console.log(err));
      resolveFn([{message: 'Mock Response'}]);
    });

    it('should fail on API fail', async() => {
      us.createUser.mockImplementation(() => {
        rejectFn({errors: [{
          message: 'Mock Error message'
        }]});
        return promise;
      });
      controller.createUser(req, res);

      return promise.then()
      .catch(() => {
        expect(us.createUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('updateUser', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn()
    } as any;
    let req: Request = {params: {id: 'id-slug'}, body: 'test body'} as unknown as Request;

    afterEach(() => {
      us.updateUser.mockReset();
    });

    it('should respond on update success', () => {
      us.updateUser.mockImplementation(() => {
        resolveFn([1]);
        return promise;
      });
      controller.updateUser(req, res);
      return promise.then(() => {
        expect(us.updateUser).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.json).toHaveBeenCalledWith({
          message: `${req.params.id} updated successfully`
        });
      })
      .catch(err => console.log(err));
    });

    it('should respond on update failure', () => {
      us.updateUser.mockImplementation(() => {
        resolveFn([0]);
        return promise;
      });
      controller.updateUser(req, res);
      return promise.then(() => {
        expect(us.updateUser).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
      })
      .catch(err => console.log(err));
    });

    it('should fail on API fail', async() => {
      us.updateUser.mockImplementation(() => {
        rejectFn({errors: [{
          message: 'Mock Error message'
        }]});
        return promise;
      });
      controller.updateUser(req, res);

      return promise.then()
      .catch(() => {
        expect(us.updateUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: `Error updating ${req.params.id} ${{}}`});
      });
    });
  });

  describe('deleteUser', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn()
    } as any;
    let req: Request = {params: {id: 'id-slug'}} as unknown as Request;

    afterEach(() => {
      us.deleteUser.mockReset();
    });

    it('should respond on update success', () => {
      us.deleteUser.mockImplementation(() => {
        resolveFn([1]);
        return promise;
      });
      controller.deleteUser(req, res);
      return promise.then(() => {
        expect(us.deleteUser).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith({
          message: `${req.params.id} deleted successfully`
        });
      })
      .catch(err => console.log(err));
    });

    it('should respond on update failure', () => {
      us.deleteUser.mockImplementation(() => {
        resolveFn([0]);
        return promise;
      });
      controller.deleteUser(req, res);
      return promise.then(() => {
        expect(us.deleteUser).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
      })
      .catch(err => console.log(err));
    });

    it('should fail on API fail', async() => {
      us.deleteUser.mockImplementation(() => {
        rejectFn({errors: [{
          message: 'Mock Error message'
        }]});
        return promise;
      });
      controller.deleteUser(req, res);

      return promise.then()
      .catch(() => {
        expect(us.deleteUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: `Error deleting ${req.params.id} ${{errors: [{
          message: 'Mock Error message'
        }]}}`});
      });
    });
  });
});
