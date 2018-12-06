import React, { Component } from 'react';
import ReactChartkick, { AreaChart, LineChart, PieChart, BarChart, Timeline } from 'react-chartkick'
import Chart from 'chart.js'
const axios = require('axios');

ReactChartkick.addAdapter(Chart)

class Charts extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }
  
  render(){
    let arr = Object.values(this.props.chartData);
      let min = Math.min(...arr);
      let max = Math.max(...arr);
    return(
      <div className="chart">
          <LineChart 
          data={this.props.chartData} 
          min={min}
          max={max}
          curve={false} 
          
          />
      </div>
    )
  }
}

export default Charts