export interface Product {
  id: number;
  title: string;
  creator: string;
  quantity: string | number;
  releaseYear: string;
  category: string;
  gameCategory: string;
  description: string;
  img?: string[];
  images?: string[];
  stock?: boolean;
}

export interface InventoryProduct {
  id: number;
  title: string;
  quantity: number;
  category: string;
  stock?: boolean;
}

export interface AddProductModalProps {
  onCancel: () => void;
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
  images?: string;
  img?: string;
}

export interface Statistics {
  totalProducts: number;
  totalStock: number;
  outOfStockProducts: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface ProductData {
  title: string;
  creator: string;
  quantity: string;
  releaseYear: string;
  category: string;
  gameCategory: string;
  description: string;
  images: string[];
}
