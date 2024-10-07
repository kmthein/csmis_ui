export class User {
    id: number;
    staffId: string;
    role: string;
    name: string;

    constructor(id: number, staffId: string, role: string, name: string) {
        this.id = id;
        this.staffId = staffId;
        this.role = role;
        this.name = name;
    }
}