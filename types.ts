export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  image: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}