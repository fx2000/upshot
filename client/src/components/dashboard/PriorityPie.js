import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import charts from '../../lib/chart-service';

// Rechart Components
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';

class PriorityPie extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pieData: ''
    };
  }

  componentDidMount = async () => {
    // Call user details API
    await charts.priorityData().then(
      response => {
        const pieData = response.data;
        this.setState({
          pieData: pieData
        });
      }
    ).catch(error => console.log(error));
  }

  render () {
    const data = [
      { name: 'Low', value: this.state.pieData.low },
      { name: 'Medium', value: this.state.pieData.medium },
      { name: 'High', value: this.state.pieData.high },
      { name: 'Critical', value: this.state.pieData.critical }
    ];

    const COLORS = ['#66A103', '#FADA5E', '#FF9900', '#D92121'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  };
}

export default withAuth(PriorityPie);
