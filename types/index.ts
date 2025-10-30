export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthUser extends User {
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon?: string;
  createdAt: string;
}

export interface Part {
  partId: string;
  partName: string;
  price: number;
}

export interface Build {
  _id: string;
  userId: string;
  carModel: string;
  color: string;
  selectedParts: Part[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CustomizerContextType {
  selectedCar: string;
  selectedColor: string;
  selectedParts: Part[];
  totalPrice: number;
  updateCar: (model: string) => void;
  updateColor: (color: string) => void;
  togglePart: (part: Part) => void;
  resetBuild: () => void;
  saveBuild: () => Promise<void>;
}