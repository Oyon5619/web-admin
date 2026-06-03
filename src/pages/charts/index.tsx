import { DisplayChart } from "@/components/displayChart";
import styles from "./charts.module.less";
import { barBasicOption, pieBasicOption, stackAreaOption } from "./options";
import { DisplayBlock } from "@/components/displayBlock/displayBlock";
import { Space } from "antd";

const Charts = () => {
  return (
    <Space className={styles.chartsPage} orientation="vertical" size="medium">
      <DisplayBlock>图表统计，使用Apache EChart进行图表绘制。</DisplayBlock>
      <DisplayBlock>
        <p>柱状图</p>
        <DisplayChart option={barBasicOption} />
      </DisplayBlock>
      <DisplayBlock>
        <p>饼图</p>
        <DisplayChart option={pieBasicOption} />
      </DisplayBlock>
      <DisplayBlock>
        <p>折线图</p>
        <DisplayChart option={stackAreaOption} style={{ height: 400 }} />
      </DisplayBlock>
    </Space>
  );
};

export default Charts;
