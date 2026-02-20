# Payroll Management System - Complete Routes Reference

## 🗺️ Available Routes

### Authentication Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/login` | LoginPage | User login with demo credentials |
| `/register` | RegisterPage | New user registration |
| `/` | Redirect | Redirects to `/login` by default |

### Protected Routes (with Sidebar)

#### Dashboard
| Route | Component | Purpose |
|-------|-----------|---------|
| `/dashboard` | DashboardPage | Main dashboard with stats and payroll overview |

#### Employees Management
| Route | Component | Purpose |
|-------|-----------|---------|
| `/employees` | EmployeeListPage | View all employees with search, filter, pagination |
| `/employees/new` | EmployeeFormPage | Add new employee form |
| `/employees/:id/edit` | EmployeeFormPage | Edit existing employee |

#### Departments Management
| Route | Component | Purpose |
|-------|-----------|---------|
| `/departments` | DepartmentsPage | View, create, edit, delete departments |

#### Payroll Processing
| Route | Component | Purpose |
|-------|-----------|---------|
| `/payroll` | PayrollPage | Payroll preview, editing, and processing |

#### Reports & Analytics
| Route | Component | Purpose |
|-------|-----------|---------|
| `/reports` | ReportsPage | Analytics dashboard with charts and metrics |

---

## 🎯 Default Navigation Flow

```
Entry Point
    ↓
/login (or /register)
    ↓
   Login/Register
    ↓
/dashboard
    ↓
Sidebar Navigation:
├── 📊 Dashboard → /dashboard
├── 👥 Employees → /employees
├── 🏢 Departments → /departments
├── 💰 Payroll → /payroll
└── 📈 Reports → /reports
```

---

## 📝 Route Details

### Authentication

#### `/login`
- **Credentials**: demo@example.com / demo123
- **Components**: Form inputs, error display, demo info box
- **Actions**: Login (saves to localStorage), Navigate to dashboard

#### `/register`
- **Fields**: Full name, email, password, confirm password
- **Validation**: Min 8 chars, password match, required fields
- **Actions**: Register (creates user), Redirect to login on success

### Dashboard (`/dashboard`)
- **Status Cards**: Employees, payrolls, cost, approvals
- **Quick Actions**: Buttons for common tasks
- **Payroll Timeline**: Upcoming payroll schedules
- **Alerts**: Payroll due notifications
- **Activity Feed**: Recent actions

### Employees (`/employees`)
- **Search**: Real-time search by name/email
- **Filters**: Status dropdown, Department dropdown
- **Pagination**: 5 items per page
- **Table Actions**: Edit, Delete, View buttons
- **Add Button**: Navigate to `/employees/new`

### Employee Form (`/employees/new` or `/employees/:id/edit`)
- **Section 1**: Personal information (4 fields)
- **Section 2**: Position & department
  - Department selector modal
  - Position input
  - Status select
- **Section 3**: Salary structure
  - Base salary, bonus, deductions, tax
  - Real-time net salary calculation
  - Color-coded visualization

### Departments (`/departments`)
- **Create Button**: Opens modal for new department
- **Department Cards**: Grid layout showing:
  - Name and manager
  - Employee count
  - Budget
  - Linked employees
- **Edit/Delete Buttons**: Per department actions
- **Manager Assignment Modal**: Change manager

### Payroll (`/payroll`)
- **Status Cards**: Current status, last run, employee count, cost
- **Create Button**: Opens payroll creation modal
- **Preview Table**: Editable employee salaries
  - Edit button opens adjustment modal
  - Summary row with totals
- **Action Buttons**: Preview, Process Payroll, Cancel

### Reports (`/reports`)
- **Filter Section**: Date range, department, report type
- **Summary Cards**: Key metrics
- **Charts**: Trend line, pie chart, bar chart
- **Metrics Table**: Key performance indicators
- **Export Button**: Download report

---

## 🔐 Authentication Flow

1. **Initial State**: User not logged in, redirected to `/login`
2. **Login**: Enter credentials → Validated → Stored in localStorage
3. **Access**: User can now access all protected routes
4. **Navigation**: Sidebar shows all available sections
5. **Logout**: Clears localStorage (not implemented in UI, for demo)

---

## 🎨 Styling by Route

All routes use:
- ✅ Tailwind CSS with lemon color scheme
- ✅ shadcn/ui components
- ✅ Consistent spacing and typography
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ No external CSS files

---

## 🚀 Quick Navigation

**From Login:**
```
/login → Click "Register" → /register → Click "Sign in here" → /login
/login → Enter credentials → /dashboard
```

**From Dashboard:**
```
/dashboard → Click "Employees" → /employees
/dashboard → Click "Departments" → /departments
/dashboard → Click "Payroll" → /payroll
/dashboard → Click "Reports" → /reports
```

**From Employees:**
```
/employees → Click "Add Employee" → /employees/new
/employees → Click Edit icon → /employees/:id/edit
/employees/:id/edit → Click "Cancel" → /employees
```

---

## 📱 Mobile Navigation

- Hamburger menu opens sidebar drawer
- All routes remain the same
- Touch-friendly button sizes
- Responsive table with horizontal scroll
- Stack forms vertically

---

## 🔗 Link Structure

**Navigation Links:**
- Logo → `/dashboard` (from sidebar)
- Nav items → Respective routes
- Breadcrumbs → Current page (no backtrack)
- Internal links → Use React Router `<Link>`

**External Links:**
- None currently implemented

---

## ⚠️ 404 Handling

Any unrecognized route redirects to `/login`

---

## 📦 Route Configuration

Located in: `src/App.tsx`

```typescript
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  
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
  
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
```

---

## 🎯 Usage Tips

1. **Bookmarking**: Users can bookmark any protected route
2. **Direct Access**: Type any route in the URL bar
3. **Mobile**: Sidebar drawer closes after navigation
4. **State**: Mock data persists during session

---

*For more details, see FEATURES.md and QUICKSTART.md*
