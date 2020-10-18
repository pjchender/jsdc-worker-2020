import React, { useState } from 'react';
import './App.css';
import GaugeChart from 'react-gauge-chart';

function Card(props) {
  const { requestUrl, gaugeChartId, title } = props;
  const [waitCount, setWaitCount] = useState(0);
  const [responseTime, setResponseTime] = useState(0);

  const handleClick = () => {
    if (waitCount >= 20) {
      return;
    }

    setWaitCount((prevCount) => prevCount + 1);

    fetch(requestUrl)
      .then((res) => {
        setWaitCount((prevCount) => prevCount - 1);
        return res.json();
      })
      .then(({ costTime }) => {
        setResponseTime(costTime);
      });
  };

  return (
    <div className="card-wrapper">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <GaugeChart
          id={gaugeChartId}
          percent={(waitCount / 100) * 5}
          nrOfLevels={10}
          textColor="#6886c5"
          formatTextValue={(value) => value / 5}
          animDelay={0}
        />
        <div className="text-center">Number of Waiting Response</div>
        <div className="text-center pt-20">{responseTime} (ms)</div>
      </div>
      <div className="card-footer" onClick={handleClick}>
        Send Request
      </div>
    </div>
  );
}

export default Card;
