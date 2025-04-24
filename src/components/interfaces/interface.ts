export interface Product {
  id: number;
  title: string;
  creator: string;
  quantity: string;
  releaseYear: string;
  category: string;
  gameCategory: string;
  description: string;
  img: string;
  stock?: boolean;
}

export interface InventoryProduct {
  id: number;
  title: string;
  quantity: number;
  category: string;
  stock?: boolean;
}

export interface EditProductModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  product: Product;
}

export interface EditInventoryModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  product: InventoryProduct;
}

export interface FormErrors {
  title?: string;
  creator?: string;
  quantity?: string;
  releaseYear?: string;
  category?: string;
  gameCategory?: string;
  description?: string;
  img?: string;
}
