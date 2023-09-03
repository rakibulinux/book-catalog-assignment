export type IOrderFilterRequest = {
  searchTerm?: string | undefined;
};
export type IOrderUserRequest = {
  userId: string;
  emailId: string;
  role: string;
  password: string;
  iat: number;
  exp: number;
};
