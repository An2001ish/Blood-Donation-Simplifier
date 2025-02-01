import React, { useState, useEffect } from 'react';
import api from '../../services/API';
import { showToast } from '../../utils/toast';
import "../../styles/AdminDashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Layout from '../Layout/Layout';

const DonationStatistics = () => {
  const [statistics, setStatistics] = useState({
    bloodGroupStats: [],
    monthlyTrends: [],
    organizationStats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  useEffect(() => {
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }, []);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchStatistics();
    }
  }, [dateRange]);

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/donation-statistics', {
        params: dateRange
      });
      setStatistics(response.data.statistics);
    } catch (error) {
      showToast.error('Failed to fetch donation statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMonthlyTrends = () => {
    return statistics.monthlyTrends.map(trend => ({
      date: `${trend._id.year}-${String(trend._id.month).padStart(2, '0')}`,
      donations: trend.totalDonations,
      quantity: trend.totalQuantity
    }));
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <Layout>
      <div className="donation-statistics">
        <h2>Donation Statistics</h2>
        
        <div className="date-range-selector">
          <div className="filter-group">
            <label>Date Range:</label>
            <div className="date-inputs">
              <input
                type="date"
                value={dateRange.startDate}
                max={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
              <span>to</span>
              <input
                type="date"
                value={dateRange.endDate}
                min={dateRange.startDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="statistics-grid">
          {/* Blood Group Distribution */}
          <div className="chart-container">
            <h3>Blood Group Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statistics.bloodGroupStats}
                  dataKey="totalQuantity"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ _id, percent }) => `${_id} (${(percent * 100).toFixed(0)}%)`}
                >
                  {statistics.bloodGroupStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} ml`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div className="chart-container">
            <h3>Monthly Donation Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formatMonthlyTrends()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="donations"
                  name="Number of Donations"
                  stroke="#8884d8"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="quantity"
                  name="Total Quantity (ml)"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Organization Statistics */}
          <div className="chart-container">
            <h3>Top Organizations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.organizationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalDonations" name="Number of Donations" fill="#8884d8" />
                <Bar dataKey="totalQuantity" name="Total Quantity (ml)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationStatistics;
