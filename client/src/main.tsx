import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.tsx'
import { Provider } from 'react-redux'
import ReduxStore from './redux/store.tsx'
import Splash from './app/Splash.tsx'
import Error from './app/Error.tsx'
import Refer from './app/Refer.tsx'
import { Toaster } from 'react-hot-toast'
import Login from './admin/Login.tsx'
import AdminLayout from './components/layouts/AdminLayout.tsx'
import AdminProtector from './utils/AdminProtector.tsx'
import UserManagement from './admin/UserManagement.tsx'
import TaskManagement from './admin/TaskManagement.tsx'
import RouteProtector from './utils/RouteProtector.tsx'
import Mine from './app/Mine.tsx'
import Home from './app/Home.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import WalletConnect from './app/WalletConnect.tsx'
import Boosting from './app/Boosting.tsx'
import Setting from './admin/Setting.tsx'
import ContextProvider from './utils/ContextProvider.tsx'
import MiningPowerManagement from './admin/MiningPowerManagement.tsx'
import SplashLayout from './components/layouts/SplashLayout.tsx'
import Premium from './app/splash/Premium.tsx'
import Age from './app/splash/Age.tsx'
import Username from './app/splash/Username.tsx'
import ChannelJoined from './app/splash/ChannelJoined.tsx'
import Leaderboard from './app/Leaderboard.tsx'
import PointHouseManagement from './admin/PointHouseManagement.tsx'
import AllAirdropManagement from './admin/AirdropManagement.tsx'
import Broadcast from './admin/Broadcast.tsx'
import BroadcastOneMillion from './admin/BroadcastOneMillion.tsx'
import Earn from './app/Earn.tsx'


const route = createBrowserRouter([
  {
    path: '/splash',
    element: <Splash />,
    errorElement: <Error />
  }, {
    path: '/auth/0/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      }, {
        path: "user",
        element: <AdminProtector><UserManagement /></AdminProtector>
      },
      {
        path: 'task',
        element: <AdminProtector><TaskManagement /></AdminProtector>
      },
      {
        path: 'setting',
        element: <AdminProtector><Setting /></AdminProtector>
      },
      {
        path: 'mining-power',
        element: <AdminProtector><MiningPowerManagement /></AdminProtector>
      },
      {
        path: 'point-house',
        element: <AdminProtector><PointHouseManagement /></AdminProtector>
      },
      {
        path: 'all-airdrop',
        element: <AdminProtector><AllAirdropManagement /></AdminProtector>
      },
      {
        path: 'broadcast',
        element: <AdminProtector><Broadcast /></AdminProtector>
      },
      {
        path: 'broadcast-million',
        element: <AdminProtector><BroadcastOneMillion /></AdminProtector>
      },
      {
        index: true,
        element: <AdminProtector><UserManagement /></AdminProtector>
      },
    ]
  },
  {
    path: '/new-comer',
    element: <SplashLayout />,
    children: [
      {
        index: true,
        element: <Premium />
      },
      {
        path: 'age',
        element: <Age />
      },
      {
        path: 'username',
        element: <Username />
      },
      {
        path: 'channel-joined',
        element: <ChannelJoined />
      }
    ]
  },
  {
    path: '/',
    errorElement: <Error />,
    element: <RouteProtector><MainLayout /></RouteProtector>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        index: true,
        element: <Home />
      },
      {
        path: 'mine',
        element: <Mine />,
      },
      {
        path: 'refer',
        element: <Refer />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      },
      {
        path: '/wallet-connect',
        element: <WalletConnect />
      },
      {
        path: '/boosting',
        element: <Boosting />
      },
      {
        path: '/earn',
        element: <Earn />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="" data-theme="dark">
      <Provider store={ReduxStore}>
        <TonConnectUIProvider manifestUrl={import.meta.env.VITE_MANIFEST}>
          <ContextProvider>
            <RouterProvider router={route} />
          </ContextProvider>
          <Toaster />
        </TonConnectUIProvider>
      </Provider>
    </div>
  </React.StrictMode>,
)
