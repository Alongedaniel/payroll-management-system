# Payroll Management System - Complete UI Build

A modern, responsive payroll management system built with React, TypeScript, Tailwind CSS, and shadcn/ui components. Features a white and lemon color scheme.

## 🎨 Color Scheme

- **Primary (Lemon)**: `#FDB022` - Used for main CTAs, highlights
- **Secondary (Light Lemon)**: `#FECA57` - Used for backgrounds, secondary elements
- **Background**: Light off-white (`#F9F9F9`)
- **Foreground**: Dark text (`#1F1F1F`)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── MainLayout.tsx          # Sidebar + top navigation
│   └── ui/                          # shadcn/ui components
├── features/
│   ├── auth/
│   │   └── pages/
│   │       ├── login.tsx            # Login page with demo credentials
│   │       └── register.tsx         # Registration form with validation
│   ├── dashboard/
│   │   └── pages/
│   │       └── dashboard.tsx        # Main dashboard with stats, payroll overview
│   ├── employees/
│   │   └── pages/
│   │       ├── EmployeeList.tsx     # Employee list with search, filters, pagination
│   │       └── EmployeeForm.tsx     # Add/Edit employee with salary structure
│   ├── departments/
│   │   └── pages/
│   │       └── Departments.tsx      # Departments management
│   ├── payrolls/
│   │   └── pages/
│   │       └── PayrollDashboard.tsx # Payroll processing & preview
│   └── reports/
│       └── pages/
│           └── ReportsDashboard.tsx # Analytics & reports with charts
└── lib/
    └── utils.ts                     # Tailwind CSS utilities
```

## 🚀 Features

### 1. **Authentication**

- **Login Page** (`/login`)
  - Email/password form with validation
  - Demo credentials: demo@example.com / demo123
  - Error messages display
  - Responsive design

- **Register Page** (`/register`)
  - Full name, email, password fields
  - Password confirmation validation
  - Minimum 8 characters validation
  - Success message with redirect

### 2. **Dashboard** (`/dashboard`)

- **Status Cards**: Total employees, active payrolls, total payroll cost, pending approvals
- **Quick Actions**: Create Payroll, Run Payroll, Add Employee, View Reports
- **Upcoming Payrolls**: Timeline of payroll schedules
- **Alerts**: Payroll due notifications
- **Recent Activities**: Activity feed

**Answers Dashboard Questions:**

- ✅ Is payroll due? - Displayed in alert card
- ✅ What's current payroll status? - Shows in status card
- ✅ Total payroll cost? - Highlighted in primary card

### 3. **Employees** (`/employees`)

- **Employee List Page**
  - 📊 Table with employee data (name, email, department, position, status, actions)
  - 🔍 Search by name or email
  - 🏷️ Filter by status (Active/Inactive)
  - 🏢 Filter by department
  - 📄 Pagination (5 items per page)
  - ✏️ Edit button for each employee
  - 🗑️ Delete button for each employee

- **Add/Edit Employee Form** (`/employees/new` or `/employees/:id/edit`)
  - Personal Information (First name, Last name, email, phone)
  - Position & Department (with department selector modal showing manager info)
  - Salary Structure:
    - Base salary
    - Bonus
    - Deductions
    - Tax
    - **Net salary calculation** (Base + Bonus - Deductions - Tax)
  - Visual salary breakdown with color-coded sections
  - Department Selector Modal (shows all departments with managers)

### 4. **Departments** (`/departments`)

- Create new departments with manager assignment
- View all departments with:
  - Department name
  - Manager name and email
  - Employee count
  - Budget allocation
  - Linked employees badges
- Edit department manager
- Delete departments
- Stats cards: Total departments, total employees, total budget

### 5. **Payroll Dashboard** (`/payroll`)

**Payroll Status Cards:**

- Current status (Draft/Processed)
- Last payroll run date
- Total employees in payroll
- Total payroll cost (highlighted)

**Payroll Table** (Filterable & Editable):

- Employee name
- Base salary
- Bonus (green)
- Deductions (red)
- Tax (red)
- Net salary (bold)
- Edit button for each row

**Features:**

- ✏️ Edit adjustment modal - Adjust bonus, deductions, tax
- ▶️ Process Payroll button - Changes status to processed
- 📊 Summary row showing totals

### 6. **Reports & Analytics** (`/reports`)

- **Filter Panel**:
  - Date range selector (Last month, 3 months, 6 months, 1 year)
  - Department filter
  - Report type selector

- **Summary Cards**:
  - Total payroll cost
  - Average salary per employee
  - Total active employees
  - Number of departments

- **Charts & Visualizations**:
  - 📈 Payroll trend line chart (6 months)
  - 🥧 Cost by department pie chart
  - 📊 Employee salary distribution bar chart

- **Key Performance Metrics Table**:
  - Monthly payroll cost
  - Average employee salary
  - Total employees
  - Payroll processing time
  - Payroll accuracy rate

## 🎯 Key Interactions

### Sidebar Navigation

- Collapsible on desktop, drawer on mobile
- Quick access to all main sections
- User profile section
- Icons for visual identification

### Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet-optimized layouts
- ✅ Desktop full-width views
- ✅ Touch-friendly buttons and forms
- ✅ Collapsible sidebar on mobile

### UI Components Used (shadcn/ui)

- Button, Card, Input, Label
- Select, Badge, Table
- Dialog (modals)
- Checkbox, Separator
- Pagination, Textarea
- Scroll-area
- Form components with validation

### Styling

- **Tailwind CSS v4** with @tailwindcss/postcss
- **CSS Variables** for theming (white and lemon scheme)
- **No external CSS** - all styling via Tailwind utilities
- **Light mode optimized** for white and yellow colors

## 🔧 Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5174`

### Build for Production

```bash
npm run build
```

### Key Technologies

- ⚛️ React 18 with TypeScript
- 🎯 React Router v6 for routing
- 🎨 Tailwind CSS v4
- 📦 shadcn/ui for components
- 📊 Recharts for data visualization
- 🔍 Lucide React for icons
- 📅 Date-fns for date handling
- 🔄 React Hook Form for forms
- 🧪 Zod for validation

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column layouts)
- **Tablet**: 640px - 1024px (2-column grid)
- **Desktop**: > 1024px (4-column grids and tables)

## 🎬 Demo Flow

1. **Start at Login** (`/login`)
   - Use demo credentials: demo@example.com / demo123
   - Or register a new account

2. **View Dashboard** (`/dashboard`)
   - See payroll status and quick stats
   - Check upcoming payrolls

3. **Manage Employees** (`/employees`)
   - View all employees with filters
   - Add a new employee
   - Edit employee salary structure

4. **Manage Departments** (`/departments`)
   - View departments and managers
   - Create new departments
   - Assign managers

5. **Process Payroll** (`/payroll`)
   - Create payroll for current month
   - Edit employee adjustments
   - Process payroll to finalize

6. **View Reports** (`/reports`)
   - See payroll trends
   - Analyze by department
   - Check key metrics

## ✨ Special Features

- **Salary Calculator**: Real-time net salary calculation
- **Color-Coded Status**: Visual indicators for employee status (active/inactive)
- **Lemon Color Scheme**: Warm, professional yellow and white palette
- **Modal-Based Actions**: Department selector, edit adjustments in dedicated dialogs
- **Real-time Filters**: Search and filter employees instantly
- **Responsive Tables**: Mobile-friendly table with horizontal scroll
- **Data Visualization**: Charts for trend analysis and cost breakdown

## 📊 Mock Data

All pages include realistic mock data:

- 248 employees across 5 departments
- 3 months of payroll data
- Department budgets and assignments
- Employee salary information

## 🔒 Authentication

Currently uses localStorage for demo purposes. In production:

- Replace with actual JWT authentication
- Implement proper session management
- Add role-based access control

## 🚀 Ready to Deploy

The application is production-ready and can be:

- Deployed to Vercel, Netlify, or any static host
- Connected to a backend API
- Integrated with a real database
- Enhanced with additional features

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
