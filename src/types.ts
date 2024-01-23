export interface User {
  id: string;
  name: string;
  details: string;
  dish_amount: number;
  wifi_amount: number;
  created_at?: string | Date;
}
export interface Bill {
  id: string;
  user_name: string;
  user_id: string;
  paid: number;
  due: number;
  date: string | Date;
  user?: User;
  created_at?: string | Date;
}

export interface DishBill extends Bill {
  dish_amount: number;
}

export interface WifiBill extends Bill {
  wifi_amount: number;
}
