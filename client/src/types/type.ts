export interface TUser {
    Name: string,
    Username: string,
    TgId: number,
    role: string,
    ReferCode: string,
    referBy?: string,
    createdAt: string,
    updatedAt: string
}

export interface TPoint {
    userId: string,
    point: number,
    createdAt: string,
    updatedAt: string
}

export interface Transaction {
    _id: string;
    userId: string;
    pointId: string;
    point: number;
    title: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IUserId {
    _id: string;
    Name: string;
    Username: string;
    TgId: number;
    ReferCode: string;
    role: string;
    isNew: boolean;
    updatedAt: string; // ISO date string
    createdAt: string; // ISO date string
    __v: number;
}

export interface IUser {
    _id: string;
    userId: IUserId;
    point: number;
    createdAt: string; // ISO date string
    __v: number;
}

export interface ILeaderboardResponse {
    userRank: number;
    User: IUser;
}



