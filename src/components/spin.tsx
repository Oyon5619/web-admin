import { LoadingOutlined } from "@ant-design/icons";
import { Spin as AntdSpin } from "antd";

export const Spin = () => {
  return <AntdSpin indicator={<LoadingOutlined />} />;
};
