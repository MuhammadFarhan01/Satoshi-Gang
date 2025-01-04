import { usePointTrackingQuery } from "../redux/api/ExtraTaskEndpoint";
import AirdropSheed from "../components/ui/wallet-connect/AirdropSheed";
import ConnectWallet from "../components/ui/wallet-connect/ConnectWallet";


const WalletConnect = () => {
    const { data } = usePointTrackingQuery(undefined);
    return (
        <div className="bg-black">
            <ConnectWallet />
            <AirdropSheed data={data?.data} />
        </div>
    );
};

export default WalletConnect;