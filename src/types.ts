export interface User {
  uuid: string;
  id: number;
  name: string;
  details: string;
  amount: number;
  created_at?: string | Date;
}
