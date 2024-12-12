export interface Register {
  name: string,
  email: string
  telephone: string,
  password: string,
  password_confirmation?: string,
  role_id?: number,
}

export interface Login {
  email: string
  password: string,
}
