import { BiBroadcast } from "react-icons/bi";
import { FaBroadcastTower, FaTasks, FaUser } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { GiLightningDissipation } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

interface Troute {
    name: string,
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
}
const Sidebar = () => {
    const route = [
        {
            name: "User",
            path: '/auth/0/admin/user',
            icon: <FaUser />
        },
        {
            name: "Task",
            path: '/auth/0/admin/task',
            icon: <FaTasks />
        },
        // {
        //     name: "Mining Power",
        //     path: '/auth/0/admin/mining-power',
        //     icon: <AiOutlineThunderbolt />
        // },
        // {
        //     name: "Point House",
        //     path: '/auth/0/admin/point-house',
        //     icon: <FaCoins />
        // },
        {
            name: "Airdrop Qualifier",
            path: '/auth/0/admin/all-airdrop',
            icon: <GiLightningDissipation />
        },
        {
            name: "Broadcast",
            path: '/auth/0/admin/broadcast',
            icon: <BiBroadcast />
        },
        {
            name: "Broadcast Million",
            path: '/auth/0/admin/broadcast-million',
            icon: <FaBroadcastTower />
        },
        {
            name: "Setting",
            path: '/auth/0/admin/setting',
            icon: <FcSettings />
        },
    ]

    const path = useLocation().pathname;

    return (
        <div className="w-full absolute top-0 left-0 bg-white bg-opacity-10 rounded-2xl border-white border border-opacity-10">
            <div className={`absolute z-50 right-4 top-4 bg-white rounded-full text-black lg:hidden`}>
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                    <IoClose className="text-2xl" />
                </label>
            </div>
            <p className="text-yellow-500 text-5xl text-center mt-5 font-genos font-bold">Admin</p>
            <p className="font-tektur text-white text-center">The control center</p>

            <div className="flex flex-col gap-3 mx-3 relative my-5">
                {
                    route.map((item: Troute, index) => (
                        <Link key={index} to={item?.path} className="bg-white p-3 w-full bg-opacity-10 rounded-2xl border-white border border-opacity-10">
                            <p className={`flex items-center gap-3 text-xl font-poppins ${path === item?.path ? 'text-white' : 'text-white opacity-40'}`}>{item?.icon} {item?.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;