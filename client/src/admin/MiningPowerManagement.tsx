import { useState } from "react";
import CreateMiningPower from "../components/modal/CreateMiningPower";
import TableMiningPower from "../components/ui/Mining Power/TableMiningPower";

const MiningPowerManagement = () => {
    const [create, setCreate] = useState(false);

    return (
        <div className="p-3">
            <CreateMiningPower open={create} close={setCreate} />
            <button
                onClick={() => setCreate(true)}
                className="font-poppins text-white bg-white bg-opacity-10 px-3 py-1 rounded-full">Add Power</button>
            <TableMiningPower />

        </div>
    );
};

export default MiningPowerManagement;