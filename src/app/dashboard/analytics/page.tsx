"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnalyticsData {
  totalRevenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
  salesData: { name: string; sales: number }[];
  visitorData: { name: string; visitors: number }[];
  categoryData: { name: string; value: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs(), dayjs().add(7, "day")]);
  const [frequency, setFrequency] = useState("daily");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange, frequency]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(
        `/api/analytics?from=${dateRange[0]?.toISOString()}&to=${dateRange[1]?.toISOString()}&frequency=${frequency}`
      );
      if (!response.ok) throw new Error("Failed to fetch analytics data");
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const handleExportData = () => {
    console.log("Exporting data...");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Analytics
          </Typography>
          <Button variant="contained" color="primary" onClick={handleExportData}>
            Export Data
          </Button>
        </Box>

        <Box display="flex" gap={2} mb={4}>
          <DatePicker
            value={dateRange[0]}
            onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            label="Start Date"
          />
          <DatePicker
            value={dateRange[1]}
            onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            label="End Date"
          />
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={4} mb={4}>
          {[
            { title: "Total Revenue", value: `$${analyticsData?.totalRevenue.toLocaleString()}` },
            { title: "Orders", value: analyticsData?.orders.toLocaleString() },
            { title: "Customers", value: analyticsData?.customers.toLocaleString() },
            { title: "Conversion Rate", value: `${analyticsData?.conversionRate}%` },
          ].map((stat, idx) => (
            <Grid item xs={12} md={3} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{stat.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    +X% from last period
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Sales Overview" />
          <Tab label="Visitor Analytics" />
          <Tab label="Category Performance" />
        </Tabs>
        {tabValue === 0 && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData?.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {tabValue === 1 && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData?.visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {tabValue === 2 && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData?.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {analyticsData?.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </Box>
    </LocalizationProvider>
  );
}
