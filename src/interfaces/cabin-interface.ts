export interface ICabinForm {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string | File | FileList;
  description: string;
}

export interface ICabin {
  id: string;
  createdAt: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}
