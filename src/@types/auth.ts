export interface Auth {
  displayName: string;
  email: string;
  id: string;
  token: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
