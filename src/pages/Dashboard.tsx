import AppHeader from "@/components/Header/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Sample data
const orderData = [
  { day: "01", January: 1000, February: 1200 },
  { day: "05", January: 1500, February: 1800 },
  { day: "10", January: 1400, February: 1900 },
  { day: "15", January: 1600, February: 2000 },
  { day: "20", January: 1700, February: 2500 },
  { day: "25", January: 1200, February: 2100 },
  { day: "30", January: 1300, February: 2200 },
];

const revenueData = [
  { date: "Jan, 01", value: 2000 },
  { date: "Jan, 07", value: 6000 },
  { date: "Jan, 14", value: 12000 },
  { date: "Jan, 21", value: 20000 },
  { date: "Jan, 28", value: 45000 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <AppHeader />
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">10,000</p>
            <p className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" /> +17% /Month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$87,363</p>
            <p className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" /> +11% /Month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Closed Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120</p>
            <p className="flex items-center text-sm text-red-600">
              <TrendingDown className="h-4 w-4 mr-1" /> -15% /Month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Order Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">12,120.00</p>
            <p className="flex items-center text-sm text-green-600 mb-4">
              <TrendingUp className="h-4 w-4 mr-1" /> +15% /Month
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="January" stroke="#8884d8" />
                <Line type="monotone" dataKey="February" stroke="#000" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">$25,843.45</p>
            <p className="flex items-center text-sm text-green-600 mb-4">
              <TrendingUp className="h-4 w-4 mr-1" /> +11% /Month
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="url(#revenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
