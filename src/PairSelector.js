import React, { Component } from 'react';

function PairSelector(props) {
  
  return (
    <select 
      className="pair" 
      name="pair" 
      value={props.currentPair} 
      onChange={(event) => props.updatePair(event.target.value)}>
      {props.pairList.map((pair, index) => <option key={index} value={pair}>{pair}</option> )}
    </select>

  )
}

export default PairSelector
