export interface Cart {
  cart_id: number;
  user_id: number;
  pizza_id: number;
  quantity: number;
  pizza: {
    name: string;
    type: string;
    imageUrl: string;
    price: string;
  };
}