import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

// Auth Pages
import LoginPage from "@/features/auth/pages/login";
import RegisterPage from "@/features/auth/pages/register";

// Dashboard Page
import DashboardPage from "@/features/dashboard/pages/dashboard";

// Employee Pages
import EmployeeListPage from "@/features/employees/pages/EmployeeList";
import EmployeeFormPage from "@/features/employees/pages/EmployeeForm";

// Department Pages
import DepartmentsPage from "@/features/departments/pages/Departments";

// Payroll Pages
import PayrollPage from "@/features/payrolls/pages/PayrollDashboard";

// Reports Pages
import ReportsPage from "@/features/reports/pages/ReportsDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/new" element={<EmployeeFormPage />} />
          <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
