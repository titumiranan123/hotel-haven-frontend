import Payment from "../pages/payment";
import Dashboard from "../pages/dashboard";
import ProfileDashboard from "../pages/dashboard/profile-dashboard";
import Settings from "../pages/settings";
import PrivateProtector from "./PrivateProtector";

const routes = [
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/payment/:_id",
    element: <Payment />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <ProfileDashboard />,
      },
      {
        path: "gust",
        element: <h2>Customer Gust</h2>,
      },
    ],
  },
];

const PrivateRoutes = routes.map((route) => ({
  ...route,
  element: <PrivateProtector>{route.element}</PrivateProtector>,
}));

export default PrivateRoutes;
