export class User {
    id: number;
    staffId: string;
    role: string;
    name: string;
    receivedMail: boolean;
    hasDefaultPassword: boolean;

    constructor(id: number, staffId: string, role: string, name: string, receivedMail: boolean, hasDefaultPassword: boolean) {
        this.id = id;
        this.staffId = staffId;
        this.role = role;
        this.name = name;
        this.receivedMail = receivedMail;
        this.hasDefaultPassword = hasDefaultPassword;
    }
}