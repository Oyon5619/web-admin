import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  type RefObject,
} from "react";
import { init as EChartInit, type EChartsOption } from "echarts";

interface DisplayChartProps {
  className?: string;
  style?: React.CSSProperties;
  option: EChartsOption;
}

interface DisplayChartRef {
  getChartRef: () => RefObject<HTMLDivElement | null>;
}

/** 默认大小: 宽度自动占满, 高度280px */
const DEFAULT_SIZE = { width: "100%", height: 280 };

const DEFAULT_GRID_SETTINGS: EChartsOption["grid"] = {
  left: 0,
  right: 0,
  bottom: 0,
  top: 20,
  containLabel: true,
};

export const DisplayChart = forwardRef<DisplayChartRef, DisplayChartProps>(
  (props, ref) => {
    const { option, style, ...rest } = props;
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let instance = null;

      if (chartRef.current) {
        // 初始化图表样例
        instance = EChartInit(chartRef.current);
      }

      if (instance) {
        // 设置图表配置项
        instance.setOption({
          ...option,
          grid: option.grid ?? DEFAULT_GRID_SETTINGS,
        });
      }

      // 窗口大小变化时自适应图表
      const resizeHandler = () => {
        instance?.resize();
      };
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, [option]);

    useImperativeHandle(ref, () => ({
      getChartRef: () => chartRef,
    }));

    return (
      <div {...rest} style={{ ...DEFAULT_SIZE, ...style }} ref={chartRef} />
    );
  },
);
