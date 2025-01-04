
export interface TExtraTask {
    _id?: string,
    userId: string,
    pointId: string,
    point: number,
    title: string,
    createdAt?: string
    updatedAt?: string,
    walletInfo?: string
}

interface IUser {
    _id: string;
    Name: string;
    Username: string;
    TgId: number;
    ReferCode: string;
    role: string;
    isNew: boolean;
    updatedAt: string;
    createdAt: string;
    __v: number;
}

interface IPoint {
    _id: string;
    userId: string;
    point: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IWalletInfo {
    address: string;
    chain: string;
    walletStateInit: string;
    publicKey: string;
}

export interface AirdropItemInterface {
    _id: string;
    userId: IUser;
    pointId: IPoint;
    point: number;
    title: string;
    category: string;
    walletInfo: string; // Alternatively, you could parse this and use IWalletInfo
    createdAt: string;
    updatedAt: string;
    __v: number;
}

