import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import charts from '../../lib/chart-service';

// Rechart Components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

class IssueTimeline extends Component {
  constructor (props) {
    super(props);
    this.state = {
      barData: []
    };
  }

  componentDidMount = async () => {
    // Call user details API
    await charts.barData().then(
      response => {
        const barData = response.data;
        this.setState({
          barData: barData
        });
      }
    ).catch(error => console.log(error));
  }

  render () {
    const data = [
      {
        name: 'Users', Users: this.state.barData.users
      },
      {
        name: 'Projects', Projects: this.state.barData.projects
      },
      {
        name: 'Issues', Issues: this.state.barData.issues
      },
      {
        name: 'Comments', Comments: this.state.barData.comments
      }
    ];

    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Users" fill="#708090" />
        <Bar dataKey="Projects" fill="#8884d8" />
        <Bar dataKey="Issues" fill="#000080" />
        <Bar dataKey="Comments" fill="#008080" />
      </BarChart>
    );
  };
}

export default withAuth(IssueTimeline);
