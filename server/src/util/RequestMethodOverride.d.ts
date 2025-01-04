interface IUser {
  Name: string;
  Username: string;
  TgId: number;
  ReferCode: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITokenData {
  user: IUser[];
  iat: number;
  exp: number;
}

declare namespace Express {
  export interface Request {
     user?: ITokenData
  }
}