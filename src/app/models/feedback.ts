export class Feedback {
  id?: number; // Optional, as the ID may be generated by the backend
  comment: string;
  response: string;
  userId: number | null;
  date: Date;
  lunchId: number;
  

  constructor(
    id: number = 0,
    comment: string = '',
    response: string = '',
    userId: number = 0,
    date: Date = new Date(),
    lunchId: number = 0
  ) {
    this.id = id;
    this.comment = comment;
    this.response = response;
    this.userId = userId;
    this.date = date;
    this.lunchId = lunchId;
  }
}
