import React, { useEffect } from "react";
import { useLoginBySceretMutation } from "../redux/api/SettingEndpoint";

const AdminProtector = ({ children }: {children: React.ReactNode}) => {
    const [TriggerSecret, { data, status, isLoading }] = useLoginBySceretMutation();
    const secret = sessionStorage.getItem("secret");

    useEffect(() => {
        if (secret) {
            TriggerSecret(secret);
        } else {
            <div>Not have stored screct</div>
            // window.location.href = "/auth/0/admin/login";
        }
    }, [secret, TriggerSecret]);

    // Conditional rendering based on the status
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (status === "fulfilled") {
        if (data?.data?.ping === true) {
            return <>{children}</>;
        } else {
            // window.location.href = "/auth/0/admin/login";
            return <div>Ping: false</div>;
        }
    }

    if (status === "rejected" || !secret) {
        // window.location.href = "/auth/0/admin/login";
        return <div>stats: rejected</div>;
    }

    return <div>out of conditions</div>;
};

export default AdminProtector;
