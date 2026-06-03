import { Spin } from "@/components/spin";
import { PAGE_MAP } from "@/configs/pageMap";
import { SLASH } from "@/constants/commonStrings";
import Page404 from "@/pages/error/page404";
import { ROUTES } from "@/router/routes";
import type { MenuItem } from "@/types/menuItem";
import type { RouteItem } from "@/types/routeItem";
import type { BreadcrumbProps } from "antd";
import { cloneDeep, compact, isEmpty } from "lodash";
import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const findRouteByPropertyInner = (
  property: keyof RouteItem,
  value?: unknown,
  currentRoutes?: RouteItem[],
): RouteItem | undefined => {
  if (!currentRoutes) {
    return;
  }

  for (const route of currentRoutes) {
    const { children } = route;
    const itemValue = route[property];
    if (itemValue === value) {
      return cloneDeep(route);
    }

    if (children?.length) {
      const foundInChildren = findRouteByPropertyInner(
        property,
        value,
        children,
      );
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
};

/** 侧边菜单栏转路由数组 */
export const transMenuToRoutes = (
  menuItems?: MenuItem[],
  parent?: RouteItem,
): RouteItem[] | undefined => {
  return menuItems?.map((item) => {
    const { key, label, comp, children: currentChildren } = item;
    const [id] = key?.toString()?.split(SLASH).reverse() ?? [];

    const result: RouteItem = {
      id,
      path: key as RouteObject["path"],
      title: label,
      element: (
        <Suspense fallback={<Spin />}>
          {comp ? PAGE_MAP[comp] : <Page404 />}
        </Suspense>
      ),
      parent,
    };
    if (currentChildren?.length) {
      result.children = transMenuToRoutes(currentChildren, result);
    }

    return result;
  });
};

/** 根据id递归查找路由对象 */
export const findRouteById = (targetId?: string) => {
  return findRouteByPropertyInner("id", targetId, ROUTES);
};

/** 根据URL查找页面路由信息 */
export const findRouteByUrl = (targetUrl?: string) => {
  return findRouteByPropertyInner("path", targetUrl, ROUTES);
};

/** 根据URL路径获取对应的面包屑路由栈 */
export const getBreadCrumbItemsByUrlPath = (
  menuPath?: string,
  isHashRoute?: boolean,
): BreadcrumbProps["items"] | undefined => {
  if (!menuPath) {
    return;
  }

  const menuIds = compact(menuPath.split(SLASH));
  const result: BreadcrumbProps["items"] = menuIds.map((id) => {
    const { title, children } = findRouteById(id) ?? {};

    if (isHashRoute) {
      return {
        path: `${SLASH}${id}`,
        title,
        menu: children?.length
          ? {
              items: children.map((child) => ({
                path: `${SLASH}${child.id}`,
                title: child.title,
              })),
            }
          : undefined,
      };
    }

    return {
      path: `${SLASH}${id}`,
      title,
      children: children?.map((child) => ({
        path: `${SLASH}${child.id}`,
        title: child.title,
      })),
    };
  });
  return result;
};

/** 侧边菜单栏默认展开的SubMenu菜单项 */
export const getDefaultOpenSubMenuKeys = (urlPath?: string) => {
  const menuId = urlPath?.split(SLASH)?.at(-1);
  if (!menuId) {
    return [];
  }

  const result: string[] = [];
  let p = findRouteById(menuId);
  while (!isEmpty(p)) {
    result.push(p.path ?? "");
    p = p?.parent;
  }

  return result;
};
