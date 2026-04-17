export interface Product {
  id: string;
  name: string;
  category: string;
  priceStart: number;
  image: string;
  label?: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar?: string;
}
