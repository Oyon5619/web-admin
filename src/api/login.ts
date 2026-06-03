import { baseRequest } from "./baseRequest";

export const loginApi = async (account?: string, password?: string) => {
  const { data } = await baseRequest({
    url: "/api/login",
    method: "POST",
    data: { account, password },
  });

  return data;
};
