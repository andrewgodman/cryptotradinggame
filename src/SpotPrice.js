import React, { Component } from 'react';

class SpotPrice extends Component {
  constructor(props){
    super(props)
    this.state = {

    }  
  }

  render(){
    return (
      <div>
        {this.props.spotPrice && <h1>{this.props.currentPair} Price: {this.props.spotPrice}</h1>}
      </div>
    )
  }
}

export default SpotPrice