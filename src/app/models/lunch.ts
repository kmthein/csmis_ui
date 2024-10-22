export interface Lunch {
    id?: number;             // Optional for new lunches
    menu: string[];         // Array of menu items
    price: number;          // Price of the lunch
    companyRate: number;    // Company rating
    date: Date;           // Date in YYYY-MM-DD format
    adminId?: number;       // ID of the admin/user managing the lunch
    restaurantId?: number;  // ID of the associated restaurant
  }