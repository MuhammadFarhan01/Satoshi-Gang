import AirdropItem from "../components/ui/Airdrop Quailifer/AirdropItem";
import { useAllAirdropQuery } from "../redux/api/ExtraTaskEndpoint";
import { AirdropItemInterface } from "../types/ExtraTask.interface";

const AllAirdropManagement = () => {
    const { data } = useAllAirdropQuery(undefined);
    console.log(data);

    return (
        <div className="p-3">
            <div className="grid gap-4">
                {
                    data?.data?.map((item: AirdropItemInterface, number: number)=> <AirdropItem item={item} key={number}/>)
                }
            </div>
        </div>
    );
};

export default AllAirdropManagement;