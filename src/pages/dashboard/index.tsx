import { Carousel, Space } from "antd";
import {
  BellOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "./dashboard.module.less";
import CountUp from "react-countup";
import { DisplayBlock } from "@/components/displayBlock/displayBlock";
import type { EChartsOption } from "echarts";
import { DisplayChart } from "@/components/displayChart";

const iconStyle = {
  color: "white",
  fontSize: "3.5em",
};

const DATA_OVERVIEW_LIST = [
  {
    key: "visitors",
    title: "本周访客",
    color: "#1890ff",
    icon: <TeamOutlined style={iconStyle} />,
    value: 96,
  },
  {
    key: "income",
    title: "本周收入",
    color: "#52c41a",
    icon: <DollarOutlined style={iconStyle} />,
    value: 19131,
  },
  {
    key: "orders",
    title: "本周订单",
    color: "#faad14",
    icon: <ShoppingCartOutlined style={iconStyle} />,
    value: 1120,
  },
  {
    key: "notifications",
    title: "消息通知",
    color: "#fa5414",
    icon: <BellOutlined style={iconStyle} />,
    value: 129,
  },
];

const DataOverview = () => {
  return (
    <div className={styles.dataOverview}>
      {DATA_OVERVIEW_LIST.map((item) => {
        const { key, title, value, icon, color } = item;

        return (
          <DisplayBlock key={key} className={styles.dataBox}>
            <div className={styles.dataIcon} style={{ background: color }}>
              {icon}
            </div>
            <Space
              orientation="vertical"
              size="small"
              className={styles.dataDesc}
            >
              <div className={styles.dataTitle}>{title}</div>
              <CountUp end={value} className={styles.dataValue} />
            </Space>
          </DisplayBlock>
        );
      })}
    </div>
  );
};

const LineChartView = () => {
  const option: EChartsOption = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      padding: [5, 10],
    },
    yAxis: { type: "value" },
    legend: {
      data: ["本周访客", "本周收入", "本周订单", "消息通知"],
    },
    series: [
      {
        name: "本周访客",
        data: [12, 155, 23, 233, 123, 91, 31],
        smooth: true,
        type: "line",
        color: "#1890ff",
      },
      {
        name: "本周收入",
        data: [312, 22, 123, 83, 353, 11, 131],
        smooth: true,
        type: "line",
        color: "#52c41a",
      },
      {
        name: "本周订单",
        data: [412, 212, 123, 183, 99, 211, 21],
        smooth: true,
        type: "line",
        color: "#faad14",
      },
    ],
  };
  return (
    <DisplayBlock>
      <DisplayChart style={{ height: 350 }} option={option} />
    </DisplayBlock>
  );
};

const CarouselView = () => {
  return (
    <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={3000}>
      {DATA_OVERVIEW_LIST.map((item) => {
        const { key, title, color } = item;

        return (
          <div key={key}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 260,
                color: "#fff",
                background: `linear-gradient(135deg, ${color}, ${color}6a)`,
                fontSize: "3.5rem",
                fontWeight: "bold",
              }}
            >
              {key.toUpperCase()} -- {title}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

const Dashboard = () => {
  return (
    <Space orientation="vertical" style={{ width: "100%", gap: "1rem" }}>
      <CarouselView />
      <DataOverview />
      <LineChartView />
    </Space>
  );
};

export default Dashboard;
