import type { TagInfo } from "@/types/tagInfo";
import { findRouteByUrl } from "@/utils/routeUtils";
import { create } from "zustand";

interface TagListState {
  activeKey?: string;
  tagList: TagInfo[];
}

interface TagListActions {
  setActiveKey: (value?: string) => void;
  addTagInfo: (urlPath?: string) => void;
  removeTagInfo: (
    urlPath?: string,
    callback?: (activeKey?: string) => void,
  ) => void;
}

export const useTagListStore = create<TagListState & TagListActions>(
  (set, get) => {
    const setActiveKey: TagListActions["setActiveKey"] = (value) => {
      set({ activeKey: value });
    };

    const addTagInfo: TagListActions["addTagInfo"] = (urlPath) => {
      const isExist = get().tagList.some(({ path }) => path === urlPath);
      if (isExist) {
        setActiveKey(urlPath);
        return;
      }

      const routeInfo = findRouteByUrl(urlPath);
      if (!routeInfo) {
        return;
      }

      const { title = "", path } = routeInfo;
      set((state) => ({
        tagList: [...state.tagList, { title, path }],
        activeKey: path,
      }));
    };

    const removeTagInfo: TagListActions["removeTagInfo"] = (
      urlPath,
      callback,
    ) => {
      const { tagList: oldList, activeKey: currentActive } = get();
      const index = oldList.findIndex(({ path }) => path === urlPath);
      if (index === -1) {
        return;
      }

      if (currentActive === urlPath) {
        const newActiveKey =
          index === oldList.length - 1
            ? oldList[index - 1]?.path
            : oldList[index + 1]?.path;
        setActiveKey(newActiveKey);
        callback?.(newActiveKey);
      }

      set((state) => ({
        tagList: state.tagList.filter(({ path }) => path !== urlPath),
      }));
    };

    return {
      tagList: [],
      setActiveKey,
      addTagInfo,
      removeTagInfo,
    };
  },
);
