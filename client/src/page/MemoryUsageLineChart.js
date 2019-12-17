import React from 'react';
import echarts from 'echarts';

class MemoryUsageLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.memoryFreeRef = React.createRef();
  }

  render() {
    return (
      <div ref={ this.memoryFreeRef } style={ {width: '500px', height: '300px' }}>
      </div>
    );
  }

  componentDidMount() {
    this.memoryFreeChart = echarts.init(this.memoryFreeRef.current);
    this.memoryFreeChart.setOption({
      title: {
        text: '内存使用率',
      },
      tooltip: {
        trigger: 'axis',
        confine: true,
      },
      xAxis: {
          type: 'time',
      },
      yAxis: {
        type: 'value',
        name: '%',
      },
      series: [
        {
          type: 'line',
          name: '系统内存使用率',
          showSymbol: false,
          data: this.props.sysMemUsage,
          itemStyle: {
            color: 'rgb(48, 216, 242)',
          },
          lineStyle: {
            color: 'rgb(48, 216, 242)',
          }
        },
        {
          type: 'line',
          name: 'V8堆内存使用率',
          showSymbol: false,
          data: this.props.v8HeapMemUsage,
          itemStyle: {
            color: 'rgb(153, 241, 255)',
          },
          lineStyle: {
            color: 'rgb(153, 241, 255)',
          }
        }
      ],
    });
  }

  componentDidUpdate() {
    this.memoryFreeChart.setOption({
      series: [
        {
          data: this.props.sysMemUsage,
        },
        {
          data: this.props.v8HeapMemUsage,
        }
      ],
    });
  }
}

export default MemoryUsageLineChart;