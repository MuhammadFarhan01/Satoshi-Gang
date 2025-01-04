interface UserId {
    _id: string;
    Name: string;
    Username: string;
    TgId: number;
    ReferCode: string;
    role: string;
    isNew: boolean;
    updatedAt: string;
    __v: number;
    createdAt: string;
}

export interface UserLeaderboard {
    _id: string;
    userId: UserId;
    point: number;
    createdAt: string;
    __v: number;
}

export interface UserRank {
    userRank: number;
    User: UserLeaderboard;
}
