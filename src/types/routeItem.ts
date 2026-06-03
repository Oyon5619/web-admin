import type { RouteObject } from "react-router-dom";

export interface RouteItem extends Omit<RouteObject, "children"> {
  title?: string;
  children?: RouteItem[];
  parent?: RouteItem;
}
