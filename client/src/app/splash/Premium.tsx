import { Link } from "react-router-dom";
import premium from "../../assets/strikers/premium_user.gif";
import PageState from "../../components/ui/PageState";
import WebApp from "@twa-dev/sdk";
const Premium = () => {
    const isPremium = WebApp.initDataUnsafe.user?.is_premium;

    return (
        <div className="max-h-screen min-h-screen bg-black p-3 relative">
            <PageState serial={1} />
            <img src={premium} className="mx-auto" />
            {
                isPremium === true ?
                    <p className="font-montserrat text-white text-2xl font-bold text-center my-5">Yeah, you're a premium user.</p> :
                    <p className="font-montserrat text-red-600 text-2xl font-bold text-center my-5">Ah! You’re not a premium user.</p>
            }
            <Link to={'/new-comer/age'}>
                <div className="font-montserrat text-2xl font-bold text-white bg-blue-500  p-2 text-center rounded-lg absolute bottom-10 w-[90vw] left-[50%] -translate-x-[50%]">Next</div>
            </Link>
        </div>
    );
};

export default Premium;