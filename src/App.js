import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Charts  from './LineChart'
import PairSelector from './PairSelector'
import SpotPrice from './SpotPrice'

const axios = require('axios');
const moment = require('moment');
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      pricingData: [],
      chartData: [],
      currentPair: "AUD/BTC",
      topCoins: ["BTC", "ETH", "XRP", "BCH", "EOS"],
      fiatCurrency: ["AUD", "USD", "EUR", "NZD"],
      pairList: [],
      spotPrice: null
    }
  }

 

  makePairOptions = () => {
    let pair = this.state.pairlst 
    return `<option value=${pair}>${pair}</option>`
  }

  generatePairs = () => {
    for (let i = 0; i < this.state.topCoins.length -1 ; i++) {
      for (let n = 0; n < this.state.fiatCurrency.length; n++) {
        this.state.pairList.push(`${this.state.topCoins[n]}/${this.state.fiatCurrency[n]}`);
        this.state.pairList.push(`${this.state.fiatCurrency[n]}/${this.state.topCoins[n]}`);
      }
      for (let j = i + 1; j < this.state.topCoins.length; j++) {
        this.state.pairList.push(`${this.state.topCoins[i]}/${this.state.topCoins[j]}`);
        this.state.pairList.push(`${this.state.topCoins[j]}/${this.state.topCoins[i]}`)
      }
    }
  }

  getSpotPrice() {
    const url =  "https://min-api.cryptocompare.com/data/"
    let split = this.state.currentPair.split("/")
    let FirstSymbol = split[0]
    let LastSymbol = split[1]
    axios.get(`${url}price?fsym=${FirstSymbol}&tsyms=${LastSymbol}`)
      .then((res) => {
        let price = res.data
        this.setState({spotPrice : price[LastSymbol]})
      })
  }

  componentDidMount(){
    this.generatePairs()
    this.getChartPricingData()
    this.getSpotPrice()
    this.interval = setInterval(() => {
      this.getSpotPrice();
    }, 60000);
  }
  
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.chartData !== this.state.chartData) {
      this.getChartPricingData()
    }
  }


  getChartPricingData = () => {
    const url =  "https://min-api.cryptocompare.com/data/"
    let split = this.state.currentPair.split("/")
    let FirstSymbol = split[0]
    let LastSymbol = split[1]
    axios.get(`${url}histoday?fsym=${FirstSymbol}&tsym=${LastSymbol}`)
      .then((res) => {
        let pricingData = res.data.Data
        let newChartData = {}
        pricingData.map((day, index) => {
          newChartData[moment.unix(day.time).format("YYYY-MM-DD HH:mm a")] = day.close
      })
      this.setState({pricingData, chartData: newChartData})
    })
  }


  updatePair = (pair) => {
    this.setState({currentPair : pair})
  }

  // handleChange = () => {

    // console.log(this.state.updatePair);
    
    // this.state.updatePair(event.target.value)
    // this.state.getChartPricingData()
    // this.setState({currentPair: event.target.value})
  // }

  render() {
    return (
      <div className="App">
        <PairSelector 
          updatePair={this.updatePair} 
          // makePairOptions={this.makePairOptions} 
          pairList={this.state.pairList} 
          // currentPair={this.state.currentPair}
        />
        <SpotPrice currentPair={this.state.currentPair} spotPrice={this.state.spotPrice}/>
        <Charts chartData={this.state.chartData} getChartPricingData={this.getChartPricingData}/>
      </div>
    );
  }
}

export default App;
