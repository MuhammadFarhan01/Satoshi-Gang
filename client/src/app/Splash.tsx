import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNewUserMutation } from '../redux/api/UserEndpoint';
import { useNavigate } from "react-router-dom";

const Splash = () => {
    const [triggerNewAccount, { data, isLoading, isSuccess, status }] = useNewUserMutation();
    const navigate = useNavigate();
    WebApp.setHeaderColor("#000");

    if (data?.data?.token) {
        sessionStorage.setItem('token', data?.data?.token)
    }

    useEffect(() => {
        const Payload = {
            "Name": WebApp.initDataUnsafe.user?.first_name + " " + WebApp.initDataUnsafe.user?.last_name,
            "Username": WebApp.initDataUnsafe.user?.username,
            "TgId": WebApp.initDataUnsafe.user?.id,
            "role": "user",
            "referBy": WebApp.initDataUnsafe.start_param,
            "init": WebApp.initData
        };

        // Trigger account creation only once on mount
        triggerNewAccount(Payload);
    }, []);


    useEffect(() => {
        if (data?.data?.token) {
            sessionStorage.setItem('token', data.data.token);

            const token = sessionStorage.getItem("token");
            console.log(data);

            if (!isLoading && token && isSuccess) {
                if (data?.data?.user?.isNew) {
                    navigate('/', { replace: true });
                }else{
                    navigate('/new-comer', { replace: true });
                }
            }

        }
    },[status])
    return (
        <div className="bg-black min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default Splash;