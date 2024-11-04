export class User {
    id: number;
    staffId: string;
    role: string;
    name: string;
    receivedMail: boolean;

    constructor(id: number, staffId: string, role: string, name: string, receivedMail: boolean) {
        this.id = id;
        this.staffId = staffId;
        this.role = role;
        this.name = name;
        this.receivedMail = receivedMail;
    }
}