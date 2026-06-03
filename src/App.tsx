import { BrowserRouter, HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { WebRouter } from "./router";
import { useCommonStore } from "./stores/useCommonStore";
import { useThemeStore } from "./stores/useThemeStore";

export const App = () => {
  const isHashRoute = useCommonStore((state) => state.isHashRoute);
  const themeConfig = useThemeStore((state) => state.themeConfig);

  const AppRouter = isHashRoute ? HashRouter : BrowserRouter;

  return (
    <ConfigProvider theme={themeConfig}>
      <AppRouter>
        <WebRouter />
      </AppRouter>
    </ConfigProvider>
  );
};

export default App;