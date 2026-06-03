import { NestedComp } from "@/components/nestedComp/nestedComp";
import { Outlet } from "react-router-dom";

const NestedMenu1 = () => {
  return (
    <NestedComp level={2} pageTitle="子页面1">
      <Outlet />
    </NestedComp>
  );
};

export default NestedMenu1;
