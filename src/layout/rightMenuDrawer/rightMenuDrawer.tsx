import { Drawer, ColorPicker, Space, Button, Form, Divider } from "antd";
import { useThemeStore } from "@/stores/useThemeStore";

interface RightMenuDrawerProps {
  showMode?: string;
  open?: boolean;
  onClose?: () => void;
}

const TITLE_MAP: Record<string, string> = {
  profile: "个人档案",
  settings: "系统设置",
};

const PRESET_COLORS = [
  "#1677ff",
  "#52c41a",
  "#faad14",
  "#f5222d",
  "#722ed1",
  "#eb2f96",
  "#13c2c2",
  "#fa8c16",
  "#a0d911",
  "#2f54eb",
];

export const RightMenuDrawer = ({
  showMode = "settings",
  open,
  onClose,
}: RightMenuDrawerProps) => {
  const { themeConfig, setPrimaryColor, resetTheme } = useThemeStore();

  const contentRender = () => {
    if (showMode === "settings") {
      return (
        <Form layout="vertical">
          <Divider>主题设置</Divider>
          <Form.Item label="主题色">
            <Space direction="vertical" style={{ width: "100%" }}>
              <ColorPicker
                value={themeConfig.token?.colorPrimary}
                onChange={(color) => setPrimaryColor(color.toHexString())}
                showText
                size="large"
                style={{ width: "100%" }}
              />
              <div style={{ fontSize: 12, color: "#999" }}>预设颜色：</div>
              <Space wrap>
                {PRESET_COLORS.map((color) => (
                  <div
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: color,
                      cursor: "pointer",
                      border:
                        themeConfig.token?.colorPrimary === color
                          ? "2px solid #000"
                          : "1px solid #d9d9d9",
                    }}
                  />
                ))}
              </Space>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button onClick={resetTheme} block>
              恢复默认
            </Button>
          </Form.Item>
        </Form>
      );
    }

    return <>profile</>;
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={TITLE_MAP[showMode] || "设置"}
      width={400}
    >
      {contentRender()}
    </Drawer>
  );
};
