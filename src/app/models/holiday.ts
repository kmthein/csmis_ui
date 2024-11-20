export class Holiday {
    id: number;
    name: string;
    date: string;  // or Date type
    description: string;
  
    constructor(id: number, name: string, date: string, description: string) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.description = description;
    }
  }
  