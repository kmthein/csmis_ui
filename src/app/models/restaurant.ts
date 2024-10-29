export class Restaurant {
    id: number;
    name: string;
    address: string; 
    contact: string;
    email: string
  
    constructor(id: number, name: string, address: string, contact: string, email: string) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.contact = contact;
      this.email = email
    }
}