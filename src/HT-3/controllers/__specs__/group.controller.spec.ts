import { Response, NextFunction, Request } from 'express';
import { GroupController } from '../group.controller';
import { GroupService } from "../../services/group.service";
import { getPromiseMock } from './mocks/promise.mock';

jest.mock('../../services/group.service');

describe('GroupController', () => {
  let controller: GroupController;
  let gs: jest.Mocked<GroupService>;
  let promise: Promise<any>;
  let resolveFn: (value: any | PromiseLike<any>) => void;
  let rejectFn: (reason?: any | PromiseLike<any>) => void;
  beforeEach(() => {
    controller = new GroupController();
    gs = controller['groupService'] as jest.Mocked<GroupService>;
    ({ resolveFn, rejectFn, promise } = getPromiseMock())
  });

  it('should be created', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllGroups', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn((code) => expect(code).toEqual(404)).mockReturnThis()
    } as any;
    let req: Request;

    afterEach(() => {
      gs.getActiveGroups.mockReset();
    });

    it('should success on API success', () => {
      gs.getActiveGroups.mockImplementation(() => promise);
      controller.getAllGroups(req, res);
      promise.then(() => {
        expect(gs.getActiveGroups).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([{ message: 'Mock Response' }]);
      })
        .catch(err => console.log(err));
      resolveFn([{ message: 'Mock Response' }]);
    });

    it('should fail on API fail', async () => {
      gs.getActiveGroups.mockImplementation(() => {
        rejectFn({ message: 'Mock Rejection' });
        return promise;
      });
      controller.getAllGroups(req, res);

      return promise
        .then(() => { })
        .catch(() => {
          expect(gs.getActiveGroups).toHaveBeenCalled();
        });
    });
  });

  describe('findGroup', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn()
    } as any;
    let req: Request = { params: { id: 'id-slug' } } as any as Request;

    afterEach(() => {
      gs.findGroup.mockReset();
    });

    it('should success on API success response', () => {
      gs.findGroup.mockImplementation(() => promise);
      controller.findGroup(req, res);
      promise.then(() => {
        expect(gs.findGroup).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith([{ message: 'Mock Response' }]);
      })
        .catch(err => console.log(err));
      resolveFn([{ message: 'Mock Response' }]);
    });

    it('should success on API empty response', () => {
      gs.findGroup.mockImplementation(() => promise);
      controller.findGroup(req, res);
      promise.then(() => {
        expect(gs.findGroup).toHaveBeenCalledWith(req.params.id);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
      })
        .catch(err => console.log(err));
      resolveFn(null);
    });

    it('should fail on API fail', () => {
      gs.findGroup.mockImplementation(() => {
        rejectFn({});
        return promise
      }
      );
      controller.findGroup(req, res);

      return promise
        .then(() => { })
        .catch((error) => {
          expect(gs.findGroup).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith(error);
        });
    });
  });

  describe('createGroup', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    } as any;
    let req: Request = { body: 'test body' } as unknown as Request;

    afterEach(() => {
      gs.createGroup.mockReset();
    });

    it('should success on API success', () => {
      gs.createGroup.mockImplementation(() => promise);
      controller.createGroup(req, res);
      promise.then((response) => {
        expect(gs.createGroup).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(response);
      })
        .catch(err => console.log(err));
      resolveFn([{ message: 'Mock Response' }]);
    });

    it('should fail on API fail', async () => {
      gs.createGroup.mockImplementation(() => {
        rejectFn({
          errors: [{
            message: 'Mock Error message'
          }]
        });
        return promise;
      });
      controller.createGroup(req, res);

      return promise.then()
        .catch((err) => {
          expect(gs.createGroup).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith(err);
        });
    });
  });

  describe('updateGroup', () => {
    let res: Response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn()
    } as any;
    let req: Request = { params: { id: 'id-slug' }, body: 'test body' } as unknown as Request;

    afterEach(() => {
      gs.updateGroup.mockReset();
    });

    it('should respond on update success', () => {
      gs.updateGroup.mockImplementation(() => {
        resolveFn([1]);
        return promise;
      });
      controller.updateGroup(req, res);
      return promise.then(() => {
        expect(gs.updateGroup).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.json).toHaveBeenCalledWith({
          message: `${req.params.id} updated successfully`
        });
      })
        .catch(err => console.log(err));
    });

    it('should respond on update failure', () => {
      gs.updateGroup.mockImplementation(() => {
        resolveFn([0]);
        return promise;
      });
      controller.updateGroup(req, res);
      return promise.then(() => {
        expect(gs.updateGroup).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
      })
        .catch(err => console.log(err));
    });

    it('should fail on API fail', async () => {
      gs.updateGroup.mockImplementation(() => {
        rejectFn({
          errors: [{
            message: 'Mock Error message'
          }]
        });
        return promise;
      });
      controller.updateGroup(req, res);

      return promise.then()
        .catch(() => {
          expect(gs.updateGroup).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: `Error updating ${req.params.id}` });
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
    let next = jest.fn().mockImplementation(() => {});

    afterEach(() => {
      gs.deleteGroup.mockReset();
    });

    it('should respond on update success', () => {
      gs.deleteGroup.mockImplementation(() => {
        resolveFn([1]);
        return promise;
      });
      controller.deleteGroup(req, res);
      return promise.then(() => {
        expect(gs.deleteGroup).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith({
          message: `${req.params.id} deleted successfully`
        });
      })
      .catch(err => console.log(err));
    });

    it('should respond on update failure', () => {
      gs.deleteGroup.mockImplementation(() => {
        resolveFn([0]);
        return promise;
      });
      controller.deleteGroup(req, res);
      return promise.then(() => {
        expect(gs.deleteGroup).toHaveBeenCalledWith(req.params.id);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
      })
      .catch(err => {throw({err})});
    });

    it('should fail on API fail', async() => {
      gs.deleteGroup.mockImplementation(() => {
        rejectFn({errors: [{
          message: 'Mock Error message'
        }]});
        return promise;
      });
      controller.deleteGroup(req, res);

      return promise.then()
      .catch(() => {
        expect(gs.deleteGroup).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: `Error deleting ${req.params.id}`});
      });
    });
  });
});
