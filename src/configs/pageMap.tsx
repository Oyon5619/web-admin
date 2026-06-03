import type { PageName } from "@/types/pageName";
import Dashboard from "@/pages/dashboard";
import { lazy, type ReactNode } from "react";

const Charts = lazy(() => import("@/pages/charts"));
const NestedMenu = lazy(() => import("@/pages/nested"));
const NestedMenu1 = lazy(() => import("@/pages/nested/nested1"));
const NestedMenu1_1 = lazy(() => import("@/pages/nested/nested1/nested1_1"));
const NestedMenu1_2 = lazy(() => import("@/pages/nested/nested1/nested1_2"));
const NestedMenu2 = lazy(() => import("@/pages/nested/nested2"));
const NestedMenu2_1 = lazy(() => import("@/pages/nested/nested2/nested2_1"));
const NestedMenu3 = lazy(() => import("@/pages/nested/nested3"));
const FileZipDemo = lazy(() => import("@/pages/fileZip"));
const RichTextDemo = lazy(() => import("@/pages/richText"));

export const PAGE_MAP: Record<PageName, ReactNode> = {
  dashboard: <Dashboard />,
  charts: <Charts />,
  nestedMenu: <NestedMenu />,
  nestedMenu1: <NestedMenu1 />,
  nestedMenu1_1: <NestedMenu1_1 />,
  nestedMenu1_2: <NestedMenu1_2 />,
  nestedMenu2: <NestedMenu2 />,
  nestedMenu2_1: <NestedMenu2_1 />,
  nestedMenu3: <NestedMenu3 />,
  fileZip: <FileZipDemo />,
  richText: <RichTextDemo />,
};
