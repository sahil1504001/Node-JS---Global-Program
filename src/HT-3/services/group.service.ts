import { Group } from '../models/Group.model';

export class GroupService {

    getAllGroups(): Promise<any[]> {
        return Group.findAll();
    }

    createGroup(group: any): Promise<any> {
        return Group.create(group);
    }

    findGroup(id: string): Promise<any> {
        return Group.findOne({
            where: { id }
        })
    }

    updateGroup(id: string, data: any): Promise<any> {
        return Group.update(data, {
            where: { id },
            returning: true
        });
    }

    deleteGroup(id: string): Promise<any> {
        return Group.destroy({
            where: { id }
        })
    }
}