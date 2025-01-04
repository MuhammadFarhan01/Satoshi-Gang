export interface TUser {
    _id?: string
    Name: string,
    Username: string,
    TgId: number,
    role: string,
    ReferCode: string,
    referBy?: string,
    MiningRewards?: string,
    isNew: boolean,
    createdAt: string
}