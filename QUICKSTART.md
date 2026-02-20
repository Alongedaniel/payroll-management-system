# 🚀 Quick Start Guide - Payroll Management System

## Getting Started

### 1. Start the Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5174`

### 2. Login with Demo Credentials
- **Email**: demo@example.com
- **Password**: demo123

### 3. Explore the Features

## 📍 Navigation Map

```
Login/Register (/login, /register)
    ↓
Dashboard (/dashboard)
├── Employees (/employees)
│   ├── Employee List
│   └── Add/Edit Employee (/employees/new, /employees/:id/edit)
├── Departments (/departments)
├── Payroll (/payroll)
└── Reports (/reports)
```

## 🎯 Key Features to Try

### 1. **Employee Management**
- Go to `/employees`
- Search for employees by name
- Filter by status and department
- Try pagination
- Click "Add Employee" to see the form
- Edit employee salary structure

### 2. **Department Management**
- Go to `/departments`
- Create new department
- Assign managers
- View department details

### 3. **Payroll Processing**
- Go to `/payroll`
- View payroll preview table
- Edit individual salary adjustments
- Process payroll

### 4. **Analytics**
- Go to `/reports`
- View payroll trends chart
- See cost distribution by department
- Check employee salary ranges

## 💡 Tips

- **Mobile Responsive**: Try resizing the browser to see mobile layout
- **Sidebar**: Click the menu icon to collapse/expand sidebar
- **Real-time Calculations**: Edit employee salary and see net salary update
- **Filters Reset**: When you search, pagination resets to page 1
- **Color Scheme**: All buttons and highlights use the lemon color (#FDB022)

## 📦 Build for Production

```bash
npm run build
```
Output will be in the `dist/` folder

## 🔧 File Structure at a Glance

- **Pages**: `src/features/*/pages/*.tsx`
- **Layout**: `src/components/layout/MainLayout.tsx`
- **UI Components**: `src/components/ui/`
- **Styles**: `src/index.css` (Tailwind CSS)
- **Routing**: `src/App.tsx`

## 🎨 Customizing Colors

To change the color scheme, edit `src/index.css`:

```css
:root {
  --primary: 45 93% 47%;           /* Lemon yellow */
  --secondary: 45 80% 60%;         /* Light lemon */
  --background: 60 40% 97%;        /* Off-white */
  --foreground: 48 9% 15%;         /* Dark text */
}
```

## 🐛 Troubleshooting

**CSS not loading?**
- Make sure dev server is running
- Clear browser cache (Ctrl+Shift+Del)
- Restart dev server (stop and `npm run dev` again)

**Port already in use?**
- The app will automatically try ports 5173, 5174, 5175, etc.
- Check the terminal for the actual port

**Components not rendering?**
- Check browser console for errors (F12)
- Ensure all imports are correct in the file

## 📚 Learn More

- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Recharts Docs](https://recharts.org/)

---

**Happy coding! 🎉**
