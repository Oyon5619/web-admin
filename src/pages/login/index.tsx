import { Button, Card, Form, Input } from "antd";
import styles from "./login.module.less";
import { requiredRule } from "@/utils/validate";
import { useLogin } from "@/hooks/useLogin";

interface LoginParams {
  account?: string;
  password?: string;
}

export const LoginPage = () => {
  const [form] = Form.useForm<LoginParams>();
  const { login, loading } = useLogin();

  const handleLogin = async () => {
    const { account, password } = await form.validateFields();
    login({ account: account!, password: password! });
  };

  return (
    <div className={styles.loginContainer}>
      <Card title="登录系统" className={styles.loginCard}>
        <Form<LoginParams> form={form} layout="vertical">
          <Form.Item label="账号" name="account" rules={requiredRule}>
            <Input placeholder="请输入账号" allowClear />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={requiredRule}>
            <Input.Password placeholder="请输入密码" allowClear />
          </Form.Item>
        </Form>
        <Button
          className={styles.loginBtn}
          type="primary"
          onClick={handleLogin}
          loading={loading}
          block
        >
          登录
        </Button>
      </Card>
    </div>
  );
};
