import React, { Component } from 'react';
import ReactChartkick, { LineChart, PieChart, BarChart, Timeline } from 'react-chartkick'
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
    return(
      <div className="chart">
          <LineChart data={this.props.chartData} />
      </div>
    )
  }
}

export default Charts