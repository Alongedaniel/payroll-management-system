import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Employees",
      value: "248",
      change: "+12 this month",
      icon: "👥",
      color: "text-blue-600",
    },
    {
      label: "Active Payrolls",
      value: "3",
      change: "1 due in 2 days",
      icon: "💰",
      color: "text-green-600",
    },
    {
      label: "Total Payroll Cost",
      value: "$450,250",
      change: "This month",
      icon: "💵",
      color: "text-amber-600",
    },
    {
      label: "Pending Approvals",
      value: "5",
      change: "3 urgent",
      icon: "⏳",
      color: "text-red-600",
    },
  ];

  const upcomingPayrolls = [
    {
      month: "February 2026",
      dueDate: "Feb 28, 2026",
      status: "Due in 8 days",
      employees: 248,
    },
    {
      month: "March 2026",
      dueDate: "Mar 31, 2026",
      status: "Not started",
      employees: 248,
    },
    {
      month: "April 2026",
      dueDate: "Apr 30, 2026",
      status: "Not started",
      employees: 248,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your payroll overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stat.value}
                </p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="p-6 border border-border/50">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12">
                🧾 Create Payroll
              </Button>
              <Button
                variant="outline"
                className="border-border/50 hover:bg-secondary h-12"
              >
                📊 Run Payroll
              </Button>
              <Button
                variant="outline"
                className="border-border/50 hover:bg-secondary h-12"
              >
                👤 Add Employee
              </Button>
              <Button
                variant="outline"
                className="border-border/50 hover:bg-secondary h-12"
              >
                📈 View Reports
              </Button>
            </div>
          </Card>

          {/* Upcoming Payrolls */}
          <Card className="p-6 border border-border/50">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Upcoming Payrolls
            </h2>
            <div className="space-y-3">
              {upcomingPayrolls.map((payroll, index) => (
                <div
                  key={index}
                  className="p-4 bg-background rounded-lg border border-border/50 flex items-start justify-between hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {payroll.month}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {payroll.dueDate}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {payroll.employees} employees
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-semibold ${index === 0 ? "text-red-600" : "text-muted-foreground"}`}
                    >
                      {payroll.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payroll Due Alert */}
          <Card className="p-6 border border-amber-200 bg-amber-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Payroll Due Soon
                </h3>
                <p className="text-sm text-amber-800">
                  February payroll is due in 8 days. Start processing now to
                  avoid delays.
                </p>
                <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white h-9 text-sm">
                  Process Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6 border border-border/50">
            <h3 className="font-bold text-foreground mb-4">
              Recent Activities
            </h3>
            <div className="space-y-3">
              {[
                { icon: "📋", text: "Payroll created", time: "2 hours ago" },
                {
                  icon: "✅",
                  text: "January payroll processed",
                  time: "1 day ago",
                },
                { icon: "👤", text: "New employee added", time: "3 days ago" },
                { icon: "📊", text: "Report generated", time: "1 week ago" },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0"
                >
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
