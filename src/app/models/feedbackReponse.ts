export class FeedbackResponse {
    id: number;
    userId: number | null;
    response: string;
   
    constructor(id: number = 0, userId: number = 0, response: string = '') {
      this.id = id;
      this.userId = userId;
      this.response = response;
     
    }
  }