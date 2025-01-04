import React, { createContext } from "react";
import { useGetSettingAdminQuery } from "../redux/api/SettingEndpoint";

export interface ISetting {
    SecretCode: number;
    ReferComission: string;
    ReferReward: string;
    RefererReward: string;
    TonTranPoint: string;
    Mining_Time: string;
    Mining_Rewards: string;
    TelegramChannel: string;
    BotToken: string;
    StatusMedia: string;
    MiniAppLink: string;
    BotLink: string;
    Symbol: string;
    ProjectName: string;
    TonAddress: string;
    TransectionRewards: string;
    WelcomeMessage: string;
    WelcomeBanner: string;
    TonTransectionTonAmount: string,
    isExsit: string; // Should be unique, default: "true"
    Maintaince: string; // default: "no"
}

interface TValue {
    Setting: ISetting
}

export const CProvider = createContext<TValue | null>(null);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data } = useGetSettingAdminQuery(undefined);
    const components: TValue = {
        Setting: data?.data as ISetting
    };
    return (
        <CProvider.Provider value={components}>
            {children}
        </CProvider.Provider>
    );
};

export default ContextProvider;