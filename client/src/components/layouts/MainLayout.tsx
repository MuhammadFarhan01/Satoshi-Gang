
import { Outlet } from "react-router-dom";
import BottomNavigation from "../shared/BottomNavigation";
import WebApp from "@twa-dev/sdk";

const MainLayout = () => {
    WebApp.setHeaderColor("#000");
    return (
        <div className="bg-[#000000] min-h-screen relative">
            <div className=" relative mb-16">
                <Outlet />
            </div>
     
            <BottomNavigation />
        </div>
    );
};

export default MainLayout;