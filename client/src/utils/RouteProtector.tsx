import React, { useEffect } from "react";
import { usePointTableQuery } from "../redux/api/UserEndpoint";

const RouteProtector = ({ children }: { children: React.ReactNode }) => {
    const { data, status, isLoading } = usePointTableQuery(undefined);
    useEffect(() => {
        if (status === "fulfilled") {
            if (!data?.data?.userId) {
                window.location.href = "/splash"
            }
        } else if (status === "rejected") {
            window.location.href = "/splash"
        }
    }, [status, data]);
    if (isLoading) {
        return <div className="bg-black min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default RouteProtector;