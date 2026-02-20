import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, Filter } from "lucide-react";

const payrollTrendData = [
  { month: "Jan", total: 450000, employees: 248 },
  { month: "Feb", total: 460000, employees: 248 },
  { month: "Mar", total: 475000, employees: 250 },
  { month: "Apr", total: 485000, employees: 252 },
  { month: "May", total: 495000, employees: 255 },
  { month: "Jun", total: 510000, employees: 258 },
];

const departmentCostData = [
  { name: "Engineering", value: 180000 },
  { name: "Sales", value: 125000 },
  { name: "Finance", value: 95000 },
  { name: "HR", value: 65000 },
  { name: "Marketing", value: 80000 },
];

const salaryDistribution = [
  { range: "$0-$30K", count: 45 },
  { range: "$30-$60K", count: 82 },
  { range: "$60-$100K", count: 98 },
  { range: "$100K+", count: 23 },
];

const COLORS = ["#FDB022", "#FECA57", "#FF9FF3", "#54A0FF", "#48DBFB"];

export default function ReportsDashboard() {
  const [dateRange, setDateRange] = useState("3months");
  const [department, setDepartment] = useState("all");
  const [reportType, setReportType] = useState("overview");

  const summaryCards = [
    {
      label: "Total Payroll Cost",
      value: "$2,845,500",
      change: "+5.2% vs last quarter",
      icon: "💰",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Average Salary",
      value: "$62,450",
      change: "+3.1% vs last year",
      icon: "📊",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Total Employees",
      value: "248",
      change: "+8 new hires",
      icon: "👥",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Active Departments",
      value: "5",
      change: "100% staffed",
      icon: "🏢",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Comprehensive payroll and employee insights
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className="p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Filter Options</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateRange" className="font-medium text-foreground">
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="bg-background border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="font-medium text-foreground">
              Department
            </Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="bg-background border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportType" className="font-medium text-foreground">
              Report Type
            </Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="bg-background border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="comparison">Comparison</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index} className={`p-6 border border-border/50`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-foreground mt-3">
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {card.change}
                </p>
              </div>
              <span className="text-3xl">{card.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Trend */}
        <Card className="p-6 border border-border/50">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Payroll Trend (6 Months)
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payrollTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#FDB022"
                  strokeWidth={3}
                  dot={{ fill: "#FDB022", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Total Payroll"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Cost Distribution */}
        <Card className="p-6 border border-border/50">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Cost by Department
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentCostData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: $${(value / 1000).toFixed(0)}K`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentCostData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Salary Distribution */}
        <Card className="p-6 border border-border/50 lg:col-span-2">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Employee Salary Distribution
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#FDB022"
                  radius={[8, 8, 0, 0]}
                  name="Number of Employees"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Key Metrics Table */}
      <Card className="p-6 border border-border/50">
        <h3 className="text-lg font-bold text-foreground mb-6">
          Key Performance Metrics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-bold text-foreground">
                  Metric
                </th>
                <th className="text-right py-3 px-4 font-bold text-foreground">
                  Current
                </th>
                <th className="text-right py-3 px-4 font-bold text-foreground">
                  Previous
                </th>
                <th className="text-right py-3 px-4 font-bold text-foreground">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  metric: "Monthly Payroll Cost",
                  current: "$510,000",
                  previous: "$495,000",
                  change: "+3.0%",
                },
                {
                  metric: "Average Employee Salary",
                  current: "$62,450",
                  previous: "$60,500",
                  change: "+3.2%",
                },
                {
                  metric: "Total Employees",
                  current: "258",
                  previous: "255",
                  change: "+1.2%",
                },
                {
                  metric: "Payroll Processing Time",
                  current: "2.5 days",
                  previous: "3.2 days",
                  change: "-21.9%",
                },
                {
                  metric: "Payroll Accuracy Rate",
                  current: "99.8%",
                  previous: "99.6%",
                  change: "+0.2%",
                },
              ].map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 hover:bg-secondary/20"
                >
                  <td className="py-4 px-4 text-foreground font-medium">
                    {row.metric}
                  </td>
                  <td className="text-right py-4 px-4 text-foreground">
                    {row.current}
                  </td>
                  <td className="text-right py-4 px-4 text-muted-foreground">
                    {row.previous}
                  </td>
                  <td
                    className={`text-right py-4 px-4 font-semibold ${row.change.startsWith("+") && !row.change.includes("-") ? "text-green-600" : "text-green-600"}`}
                  >
                    {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
