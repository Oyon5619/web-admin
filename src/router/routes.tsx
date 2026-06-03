import { SIDER_MENU } from "@/configs/menuConfig";
import { LayoutPage } from "@/layout";
import { LoginPage } from "@/pages/login";
import { Navigate } from "react-router-dom";
import { transMenuToRoutes } from "@/utils/routeUtils";
import type { RouteItem } from "@/types/routeItem";
import Page404 from "@/pages/error/page404";
import { AuthGuard } from "@/components/authGuard";

const layoutMenuRoutes = transMenuToRoutes(SIDER_MENU);

export const ROUTES: RouteItem[] = [
  {
    path: "/",
    element: <Navigate to="/web/dashboard" />,
  },
  {
    path: "/web",
    element: <Navigate to="/web/dashboard" />,
  },
  {
    path: "/error/page404",
    element: <Page404 />,
  },
  {
    id: "login",
    title: "登录页",
    path: "/login",
    element: <LoginPage />,
  },
  {
    id: "web",
    path: "/web",
    title: "管理台",
    element: (
      <AuthGuard>
        <LayoutPage />
      </AuthGuard>
    ),
    children: layoutMenuRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/error/page404" />,
  },
];
