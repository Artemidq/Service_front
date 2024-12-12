export interface User {
  id: number,
  name: string,
  email: string,
  telephone: string,
  api_token: string,
  created_at: string,
  updated_at: string,
  role: Role
}

export interface Role {
  id: number,
  name: string,
  code: string,
  created_at: string,
  updated_at: string,
}