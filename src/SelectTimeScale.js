import React, { Component } from 'react';


function selectTimeScale (props) {
  return (
    <div className="timescale">
      <button onClick={(event) => props.changeTimeScale("day")}>Day</button>
      <button onClick={(event) => props.changeTimeScale("hour")}>Hour</button>
      <button onClick={(event) => props.changeTimeScale("minute")}>Minute</button>
    </div>
  )
}

export default selectTimeScale
