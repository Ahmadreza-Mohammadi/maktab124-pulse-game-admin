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
  price: number;
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

export interface EditModalContentProps {
  formData: {
    title: string;
    creator: string;
    quantity: number;
    releaseYear: string | number;
    category: string;
    gameCategory?: string;
    description: string;
    img: string[];
  };
  errors: {
    title?: string;
    creator?: string;
    quantity?: string;
    releaseYear?: string;
    category?: string;
    gameCategory?: string;
    description?: string;
    img?: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleImageChange: (index: number, value: string) => void;
  addImageField: () => void;
  removeImageField: (index: number) => void;
  editProductHandler: () => void;
  onCancel: () => void;
}


export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userInfo: UserInfo;
  orderDate: string;
  deliveryStatus: string;
  payment: "paid" | "pending";
  totalAmount: number;
  status: "paid" | "pending";
  items: OrderItem[];
}

export interface OrderDetailsModalProps {
  order: {
    id: string;
    userInfo: {
      name: string;
      email: string;
      phone: string;
    };
    orderDate: string;
    payment: "paid" | "pending";
    totalAmount: number;
    status: "paid" | "pending";
  };
  onClose: () => void;
}

export interface ModalContentProps {
  formData: ProductData;
  errors: FormErrors;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleImageChange: (index: number, value: string) => void;
  addImageField: () => void;
  removeImageField: (index: number) => void;
  onCancel: () => void;
  AddProductHandler: () => void;
}