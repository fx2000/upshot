import axios from 'axios';

// Chart API
class ChartService {
  constructor() {
    this.chart = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  // Get Priority data for pie charts
  priorityData = () => {
    return this.chart.get('/api/charts/prioritypie').then(
      response => response
    );
  }

  // Get Priority data for pie charts
  barData = () => {
    return this.chart.get('/api/charts/bardata').then(
      response => response
    );
  }
}

const axiosRequestFunctions = new ChartService();
export default axiosRequestFunctions;
