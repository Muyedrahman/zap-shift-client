import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/Home/Home/Home";
import Coverage from "../page/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../page/Auth/Login/Login";
import Register from "../page/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../page/SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../page/Dashboard/MyParcels/MyParcels";
import Payment from "../page/Dashboard/Payment/Payment";
import PaymentSuccess from "../page/Dashboard/Payment/PaymentSuccess";
import PaymentCancelles from "../page/Dashboard/Payment/PaymentCancelles";
import PaymentHistory from "../page/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../page/Rider/Rider";
import ApproveRiders from "../page/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../page/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../page/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../page/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../page/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../page/ParcelTrack/ParcelTrack";



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
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: 'parcel-track/:trackingId',
        Component: ParcelTrack,
      }
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
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelles,
      },
      // Rider Only Routes
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>{" "}
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },

      // Admin Only Routes
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            
            <UsersManagement></UsersManagement>{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);
