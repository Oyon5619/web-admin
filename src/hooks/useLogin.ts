import { useRequest } from "ahooks";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/login";
import { useUserStore } from "@/stores/useUserStore";

interface LoginParams {
  account: string;
  password: string;
}

interface LoginResult {
  code: string;
  message: string;
  data?: {
    token: string;
    userInfo: {
      id: number;
      name: string;
      avatar: string;
      roles: string[];
    };
  };
}

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const { run, loading, error } = useRequest(
    async (params: LoginParams) => {
      const result = (await loginApi(
        params.account,
        params.password
      )) as LoginResult;
      return result;
    },
    {
      manual: true,
      onSuccess: (result) => {
        if (result.code === "200" && result.data) {
          login(result.data.token, result.data.userInfo);
          message.success("登录成功");
          navigate("/");
        } else {
          message.error(result.message || "登录失败");
        }
      },
      onError: () => {
        message.error("登录请求失败，请重试");
      },
    }
  );

  return {
    login: run,
    loading,
    error,
  };
};
