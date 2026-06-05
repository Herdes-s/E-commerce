export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ItemCart extends Product {
  quantity: number;
}

export interface RouterState {
  product: Product;
}
