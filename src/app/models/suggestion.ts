export class Suggestion {
    id?: number;       // Optional, as the ID may be generated by the backend
    content: string;
    userId: number | null
    date: Date;
    name: string;

    constructor(
        id: number = 0,
        content: string = "",
        userId: number = 0,
        date: Date = new Date(),
        name: string = "",
    ) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.date = date;
        this.name = name;
      }
  }
  