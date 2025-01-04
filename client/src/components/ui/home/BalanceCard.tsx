import icon from "../../../assets/icon.svg";
import { Transaction } from "../../../types/type";
import verified from "../../../assets/verified.png";

const BalanceCard = ({ point, ton }: { point: string, ton: Transaction }) => {
    // console.log(ton);

    return (
        <div>
            <img src={icon} alt="stars" className="size-16 mx-auto" />
            <p className="text-4xl flex items-center  justify-center gap-2 font-poppins font-bold text-white text-center my-3">{Number(point).toFixed(2)} {ton?.title && <img src={verified} className="size-7"/>}</p>
        </div>
    );
};

export default BalanceCard;