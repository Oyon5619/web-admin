import { create } from "zustand";

interface CommonState {
  /** 是否Hash路由模式 */
  isHashRoute: boolean;
  /** 当前选中的菜单 */
  activeMenu: string;
  /** 侧边菜单栏是否折叠 */
  isMenuCollapsed: boolean;
}

interface CommonActions {
  setActiveMenu: (value: string) => void;
  setIsHashRoute: (value: boolean) => void;
  setIsMenuCollapsed: (value: boolean) => void;
}

export const useCommonStore = create<CommonState & CommonActions>((set) => {
  const setActiveMenu = (value: string) => {
    set({ activeMenu: value });
  };

  const setIsHashRoute = (value: boolean) => {
    set({ isHashRoute: value });
  };

  const setIsMenuCollapsed = (value: boolean) => {
    set({ isMenuCollapsed: value });
  };

  return {
    activeMenu: "",
    isHashRoute: true,
    isMenuCollapsed: false,
    setActiveMenu,
    setIsHashRoute,
    setIsMenuCollapsed,
  };
});
