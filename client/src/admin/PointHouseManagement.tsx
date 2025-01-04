import { useState } from "react";
import CreatePointHouse from "../components/modal/CreatePointHouse";
import TablePointHouse from "../components/ui/Point House/TablePointHouse";

const PointHouseManagement = () => {
    const [create, setCreate] = useState(false);

    return (
        <div className="p-3">
            <CreatePointHouse open={create} close={setCreate} />
            <button
                onClick={() => setCreate(true)}
                className="font-poppins text-white bg-white bg-opacity-10 px-3 py-1 rounded-full">Add Power</button>
            <TablePointHouse />

        </div>
    );
};

export default PointHouseManagement;