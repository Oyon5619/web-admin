import { NestedComp } from "@/components/nestedComp/nestedComp";
import { Outlet } from "react-router-dom";

const NestedMenu = () => {
  return (
    <NestedComp level={1} pageTitle="嵌套菜单">
      <Outlet />
    </NestedComp>
  );
};

export default NestedMenu;
