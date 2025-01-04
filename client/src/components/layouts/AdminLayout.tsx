import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';
import { useContext, useState } from 'react';
import { CProvider } from '../../utils/ContextProvider';

const AdminLayout = () => {
    const [menu, setMenu] = useState(false);
    const setting = useContext(CProvider);
    return (
        <div className='bg-black min-h-screen grid xl:grid-cols-5 lg:grid-cols-4 lg:gap-5 lg:p-3'>
            <div className="navbar bg-black lg:hidden">
                <div className={`navbar-start bg-black `}>
                    <div className="drawer">
                        <input id="my-drawer" onChange={(e) => setMenu(e.target.checked)} type="checkbox" className="drawer-toggle" />
                        <div className={`drawer-content mr-4 ${menu === true && 'hidden'}`}>
                            <label htmlFor="my-drawer" className=" drawer-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu  text-base-content min-h-full w-80 p-4">
                                <Sidebar/>
                            </ul>
                        </div>
                    </div>
                    <div className="dropdown hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <Link className='font-tektur text-xl text-white text-opacity-60' to={'/auth/0/admin'}>User</Link>
                            <Link className='font-tektur text-xl text-white text-opacity-60' to={'/auth/0/admin/task'}>Task</Link>
                        </ul>
                    </div>
                    <a className={`btn btn-ghost text-xl ${menu === true && 'hidden'}`}>{setting?.Setting?.ProjectName}</a>
                </div>
            </div>
            <div className="sidebar relative max-h-screen col-span-1 hidden lg:block">
                <Sidebar/>
            </div>
            <label className='overflow-hidden xl:col-span-4 md:col-span-3'>
                <div className={` ${menu === true && 'blur-3xl hidden'} min-h-screen`}>
                    <Outlet />
                </div>
            </label>
        </div>
    );
};

export default AdminLayout;