/* Backend - Express Server */
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Fetch labor market data
app.get('/api/labor-market-data', async (req, res) => {
  try {
    const response = await axios.get('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      params: {
        seriesid: 'YOUR_SERIES_ID',
        registrationkey: 'YOUR_API_KEY'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching labor market data');
  }
});

// Fetch virtual tours
app.get('/api/virtual-tours', (req, res) => {
  const tours = [
    { name: 'Great Oaks Career Campuses', url: 'https://www.greatoaks.com/virtualtours' },
    { name: 'Universal Technical Institute', url: 'https://www.uti.edu/virtual-tours' }
  ];
  res.json(tours);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/* Frontend - React App */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LaborMarketChart } from './components/LaborMarketChart';
import { VirtualTour } from './components/VirtualTour';
import { ROICalculator } from './components/ROICalculator';

function App() {
  const [laborMarketData, setLaborMarketData] = useState([]);
  const [virtualTours, setVirtualTours] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/labor-market-data')
      .then(response => setLaborMarketData(response.data))
      .catch(error => console.error('Error fetching labor market data:', error));

    axios.get('http://localhost:5000/api/virtual-tours')
      .then(response => setVirtualTours(response.data))
      .catch(error => console.error('Error fetching virtual tours:', error));
  }, []);

  return (
    <div>
      <h1>Trade School Explorer</h1>
      <section>
        <h2>Labor Market Data</h2>
        <LaborMarketChart data={laborMarketData} />
      </section>
      <section>
        <h2>Virtual Tours</h2>
        <ul>
          {virtualTours.map(tour => (
            <li key={tour.name}>
              <a href={tour.url} target="_blank" rel="noopener noreferrer">{tour.name}</a>
            </li>
          ))}
        </ul>
      </section>
      <ROICalculator />
    </div>
  );
}

export default App;

/* Chart Component */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const LaborMarketChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(entry => entry.period),
        datasets: [{
          label: 'Unemployment Rate',
          data: data.map(entry => entry.value),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Time Period' } },
          y: { title: { display: true, text: 'Unemployment Rate (%)' } }
        }
      }
    });
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

/* Virtual Tour Component */
import React from 'react';

export const VirtualTour = ({ url }) => (
  <iframe
    src={url}
    width="600"
    height="400"
    allowFullScreen
    title="Virtual Tour"
  ></iframe>
);

/* ROI Calculator Component */
import React, { useState } from 'react';

export const ROICalculator = () => {
  const [tuition, setTuition] = useState('');
  const [salary, setSalary] = useState('');
  const [years, setYears] = useState('');

  const calculateROI = () => {
    const totalEarnings = salary * years;
    return ((totalEarnings - tuition) / tuition) * 100;
  };

  return (
    <div>
      <h2>ROI Calculator</h2>
      <input type="number" placeholder="Tuition Cost" value={tuition} onChange={e => setTuition(e.target.value)} />
      <input type="number" placeholder="Annual Salary" value={salary} onChange={e => setSalary(e.target.value)} />
      <input type="number" placeholder="Years in Career" value={years} onChange={e => setYears(e.target.value)} />
      <button onClick={() => alert(`ROI: ${calculateROI().toFixed(2)}%`)}>Calculate ROI</button>
    </div>
  );
};
