import { useRequest } from "ahooks";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const { run, loading } = useRequest(
    async () => {
      // 可在此处调用登出 API
      // await logoutApi();
      logout();
      message.success("已退出登录");
      navigate("/login");
    },
    {
      manual: true,
    }
  );

  return {
    logout: run,
    loading,
  };
};
