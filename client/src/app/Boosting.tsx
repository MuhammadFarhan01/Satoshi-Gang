import premium_icon from "../assets/prem.svg";
import { usePointTableQuery } from "../redux/api/UserEndpoint";
import ShowBalance from "../components/ui/ShowBalance";
import BoostDetailsCard from "../components/ui/boost/BoostDetailsCard";

const Boosting = () => {

    const { data: userDetails } = usePointTableQuery(undefined);

    return (
        <div className=" relative p-3">
            <div className="w-full flex justify-center items-center">
                <ShowBalance amount={userDetails?.data?.points?.point} />
            </div>
            <div className="h-40 relative overflow-hidden">
                <img src={premium_icon} alt="prem" className="size-32 mx-auto  pt-8" />
            </div>
            <p>{ }</p>
            <div className="h-full relative p-3">
                <BoostDetailsCard balance={userDetails?.data?.points?.point}/>
            </div>
        </div >
    );
};

export default Boosting;