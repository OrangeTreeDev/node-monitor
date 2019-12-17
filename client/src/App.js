import React from 'react';
import io from 'socket.io-client';
import MemoryUsageLineChart from './page/MemoryUsageLineChart';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sysMemUsage: this.getMemoryUsageInitialData(),
      v8HeapMemUsage: this.getMemoryUsageInitialData(), 
    };
  }

  render() {
    return (
      <div className="App">
        <MemoryUsageLineChart sysMemUsage={this.state.sysMemUsage} v8HeapMemUsage={this.state.v8HeapMemUsage}>
        </MemoryUsageLineChart>
      </div>
    );
  }

  componentDidMount() {
    this.socket = io('http://localhost:3002');    
    this.addMemoryUsageListener();
  }

  getMemoryUsageInitialData() {
    const currentTime = Date.now();
    const xAxisGap = 500;
    let data = new Array(xAxisGap);
    for (let i = 0; i < xAxisGap; i++) {
      data[i] = [currentTime - (xAxisGap - 1 - i) * 1000, undefined];
    }
    return data;

  }
  addMemoryUsageListener() {
    this.socket.on('indicator:sys_mem_usage_rate', (val) => {
      this.setState(state => {
        const itemData = [ val[0], (val[1] * 100).toFixed(2) ];
        const sysMemUsage = state.sysMemUsage.slice();
        sysMemUsage.unshift();
        sysMemUsage.push(itemData);
        return {
          sysMemUsage
        };
      });
    });

    this.socket.on('indicator:v8_heap_usage_rate', (val) => {
      this.setState(state => {
        const itemData = [ val[0], (val[1] * 100).toFixed(2) ];
        const v8HeapMemUsage = state.v8HeapMemUsage.slice();
        v8HeapMemUsage.unshift();
        v8HeapMemUsage.push(itemData);
        return {
          v8HeapMemUsage
        };
      });
    });
  }
}

export default App;
