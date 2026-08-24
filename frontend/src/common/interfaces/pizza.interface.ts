export interface Pizza {
  pizza_id: number;
  name: string;
  type: "Vegetarian" | "Non-Vegetarian";
  imageUrl?: string;
  description?: string;
  price: number;
  created_at: string;
}

export type UpdatePizza = Omit<Pizza, "pizza_id" | "created_at">;