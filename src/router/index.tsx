import { useRoutes, type RouteObject } from "react-router-dom";
import { ROUTES } from "./routes";

export const WebRouter = () => {
  const routes = useRoutes(ROUTES as RouteObject[]);

  return routes;
};
