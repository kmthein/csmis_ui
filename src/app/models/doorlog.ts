import { format } from "date-fns";
import { DateTimezoneSetter } from "date-fns/parse/_lib/Setter";

export class DoorLog {
    id: number;
    name: string;
    doorLogNo: string;
    location: string;
    dateTime: string;

    constructor(id: number, name: string, doorLogNo: string, location: string,dateTime: Date) {
        this.id = id;
        this.name = name;
        this.doorLogNo = doorLogNo;
        this.location = location;
        this.dateTime = format(dateTime, 'yyyy-MM-dd HH:mm:ss');;
    }
}