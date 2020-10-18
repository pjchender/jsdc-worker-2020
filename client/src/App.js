import React from 'react';
import './App.css';
import Card from './Card';

function App() {
  return (
    <div className="container">
      <Card
        title="Normal Request"
        requestUrl="http://localhost:5000/without-intensive-job"
        gaugeChartId="without-intensive-job"
      />

      <Card
        title="Intensive Job"
        requestUrl="http://localhost:5000/intensive-job"
        gaugeChartId="without-worker"
      />

      <Card
        title="Intensive Job with God"
        requestUrl="http://localhost:5000/intensive-job-with-worker"
        gaugeChartId="with-worker"
      />
    </div>
  );
}

export default App;
