export type RegisterPayloadType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayloadType = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (payload: LoginPayloadType) => any;
  user: any;
  logout: () => void;
  register: (payload: RegisterPayloadType) => any;
};
