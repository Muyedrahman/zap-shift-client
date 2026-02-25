import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/Home/Home/Home";
import Coverage from "../page/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../page/Auth/Login/Login";
import Register from "../page/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../page/Rider/Rider";
import SendParcel from "../page/SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../page/Dashboard/MyParcels/MyParcels";
import Payment from "../page/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        element:
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
    children:[
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment,
      }
    ]
  }
]);
