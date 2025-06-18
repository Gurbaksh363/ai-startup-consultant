import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DataVisualization = ({ analysisData, idea }) => {
  if (!analysisData) return null;

  // Extract market data for visualization
  const extractMarketData = (marketContent) => {
    if (!marketContent) return null;

    // Extract TAM (Total Addressable Market) values
    const tamMatch = marketContent.match(/TAM[^\d]*\$?([\d.]+)\s*(billion|million)/i);
    const cagrMatch = marketContent.match(/CAGR[^\d]*([\d.]+)%/i);
    const yearProjections = marketContent.match(/(\d{4}):\s*\$?([\d.]+)\s*(billion|million)/gi);
    
    let data = {};
    
    if (tamMatch) {
      const value = parseFloat(tamMatch[1]);
      const unit = tamMatch[2].toLowerCase();
      data.tam = unit === 'billion' ? value : value / 1000;
    }
    
    if (cagrMatch) {
      data.cagr = parseFloat(cagrMatch[1]);
    }
    
    if (yearProjections && yearProjections.length > 0) {
      data.projections = yearProjections.map(match => {
        const [year, value, unit] = match.match(/(\d{4}):\s*\$?([\d.]+)\s*(billion|million)/i).slice(1);
        return {
          year: parseInt(year),
          value: unit.toLowerCase() === 'billion' ? parseFloat(value) : parseFloat(value) / 1000
        };
      }).sort((a, b) => a.year - b.year);
    }
    
    return data;
  };

  const marketData = extractMarketData(analysisData.market?.market_analysis);

  // Create market projection chart
  const createMarketProjectionChart = () => {
    if (!marketData?.projections || marketData.projections.length === 0) return null;

    const data = {
      labels: marketData.projections.map(p => p.year.toString()),
      datasets: [
        {
          label: 'Market Size (Billions USD)',
          data: marketData.projections.map(p => p.value),
          backgroundColor: 'rgba(102, 126, 234, 0.6)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 2,
          fill: true,
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Market Size Projections' }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Market Size (Billions USD)' }
        }
      }
    };

    return <Line data={data} options={options} />;
  };

  // Create competitive landscape chart
  const createCompetitiveChart = () => {
    const competitors = ['Direct Competitors', 'Indirect Competitors', 'Potential Market Share'];
    const data = {
      labels: competitors,
      datasets: [
        {
          data: [35, 45, 20], // Sample data - could be extracted from content
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 205, 86, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
          ],
          borderWidth: 2,
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'right' },
        title: { display: true, text: 'Competitive Landscape' }
      }
    };

    return <Doughnut data={data} options={options} />;
  };

  // Create validation score chart
  const createValidationChart = () => {
    const criteria = ['Market Need', 'Feasibility', 'Scalability', 'Competition', 'Revenue Potential'];
    const scores = [8.5, 7.2, 8.8, 6.5, 7.9]; // Sample scores - could be extracted

    const data = {
      labels: criteria,
      datasets: [
        {
          label: 'Validation Score',
          data: scores,
          backgroundColor: 'rgba(67, 233, 123, 0.6)',
          borderColor: 'rgba(67, 233, 123, 1)',
          borderWidth: 2,
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Idea Validation Scores (out of 10)' }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          title: { display: true, text: 'Score' }
        }
      }
    };

    return <Bar data={data} options={options} />;
  };

  return (
    <div className="data-visualization">
      <div className="charts-header">
        <h3>📊 Data Visualization</h3>
        <p>Visual insights from your startup analysis</p>
      </div>
      
      <div className="charts-grid">
        {marketData?.projections && (
          <div className="chart-container">
            <h4>Market Growth Projection</h4>
            {createMarketProjectionChart()}
          </div>
        )}
        
        <div className="chart-container">
          <h4>Competitive Analysis</h4>
          {createCompetitiveChart()}
        </div>
        
        <div className="chart-container">
          <h4>Validation Metrics</h4>
          {createValidationChart()}
        </div>
        
        {marketData?.tam && (
          <div className="metric-card">
            <h4>Key Metrics</h4>
            <div className="metrics-grid">
              <div className="metric">
                <span className="metric-label">Total Addressable Market</span>
                <span className="metric-value">${marketData.tam}B</span>
              </div>
              {marketData.cagr && (
                <div className="metric">
                  <span className="metric-label">CAGR Growth Rate</span>
                  <span className="metric-value">{marketData.cagr}%</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;
