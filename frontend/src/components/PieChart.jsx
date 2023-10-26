import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

const hexColors = [
  '#FF5733',
  '#33FF77',
  '#3366FF',
  '#FF33A3',
  '#66FF33',
  '#33FFA3',
  '#FF3366',
  '#A333FF',
  '#33A3FF',
  '#FF9933'
];

const Chart = ({ data }) => {
  const pieChartData = data.map((item, i) => { return { title: item.username, value: Number(item.duration), color: hexColors[i] } })
 
  return (
    <div className="user-chart">
      <div className="pie-chart"><PieChart data={pieChartData} /> </div>
      <div className="user-list" >
        {pieChartData.map((item, i) => <div key={i}>
          <span className="mark" style={{ backgroundColor: `var(--color${i + 1})` }}>
          </span><span>{item.title}</span></div>
        )}
      </div>
    </div>
  )
}

export default Chart