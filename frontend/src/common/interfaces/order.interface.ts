export interface OrderLine {
  order_line_id: number;
  order_id: number;
  pizza_id: number;
  quantity: number;
  line_total: number;
  pizza: {
    name: string;
    type: "Vegetarian" | "Non-Vegetarian";
    imageUrl: string;
  };
}

export interface Order {
  order_id: number;
  user_id: number;
  delivery_address: string;
  status: string
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    address: string;
  };
  orderLines: OrderLine[];
}

export interface CreateOrder {
  user_id: number;
  delivery_address: string;
  orderLines: {
    pizza_id: number;
    quantity: number;
  }[];
}