export interface IUser {
  id: number;
  name: string;
  lname: string;
  email: string;
  phone: string;
  password: string;  
  frn_user_roleid: number;    
}

export type ISignupBody = Pick<
  IUser,
  "name" | "email" | "password" | "phone" 
> & {
  role: EUserRole;
};

export type ILoginBody = Pick<IUser, "email" | "password">;

export enum EUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum EUserRoleID {
  ADMIN = '1',
  USER = '2',
  SUPPORT = '3',
}