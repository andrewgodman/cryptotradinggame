import React, { Component } from 'react';
const axios = require('axios');

function PairSelector(props) {
  
  return (
    <select 
      className="pair" 
      name="pair" 
      value={props.currentPair} 
      onChange={(event) => props.updatePair(event.target.value)}>
      {props.pairList.map((pair) => <option value={pair}>{pair}</option> )}
    </select>

  )
}

export default PairSelector
