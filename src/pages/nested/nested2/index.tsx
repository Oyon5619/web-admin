import { NestedComp } from "@/components/nestedComp/nestedComp";
import { Outlet } from "react-router-dom";

const NestedMenu2 = () => {
  return (
    <NestedComp level={2} pageTitle="子页面2">
      <Outlet />
    </NestedComp>
  );
};

export default NestedMenu2;
