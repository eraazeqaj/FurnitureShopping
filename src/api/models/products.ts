import {ObjectId} from "mongodb"; 

export interface Product{
 _id?: string | ObjectId;
 name: string;
 description: string;
 pictureUrl: string;
 price: number;
 categoryId?: string;
 }

 export interface User{
  _id?: string | ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  emailVerified?: Date | null;
 }
  export interface Category{
    _id?: string;
   name: string;
   description: string;

}

export interface Order{
  _id?: string;
  userId: string;
  products: {
    productId: string;
    quantity:number;
  }[];
  totalAmount: number;
  status: "pending" | "processing"|"shiped"|"delivered";
  createdAt? :Date;
}

export interface Review{
  _id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt? :Date;
}
export interface CartItem{
  productId: string;
  quantity: number;
}
 export interface AdminLog{
  _id?: string;
  adminId: string;
  action: string;
  timestamp: Date;
 }