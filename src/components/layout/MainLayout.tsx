import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/employees", label: "Employees", icon: "👥" },
    { href: "/departments", label: "Departments", icon: "🏢" },
    { href: "/payroll", label: "Payroll", icon: "💰" },
    { href: "/reports", label: "Reports", icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-border transition-all duration-300 md:relative fixed md:block inset-y-0 left-0 z-50 md:z-auto",
          sidebarOpen ? "w-64" : "w-0 md:w-20",
          !mobileMenuOpen && "hidden md:block",
        )}
      >
        <div className="h-full flex flex-col p-4 overflow-hidden">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="text-2xl font-bold text-primary flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-3xl">💼</span>
              {sidebarOpen && <span>PayPro</span>}
            </Link>
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 hover:bg-accent rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-secondary hover:text-primary text-foreground",
                  "group relative",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl min-w-fit">{item.icon}</span>
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          {sidebarOpen && (
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">
                    {user?.displayName || user?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.role || "Admin"}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top Bar */}
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="hidden md:flex p-2 hover:bg-accent rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="flex-1 md:flex-none">
              <h1 className="text-2xl font-bold text-foreground text-center md:text-left md:hidden">
                PayPro
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                🔔
              </Button>
              <Button variant="ghost" size="sm">
                ⚙️
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
