import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

// Mock data
const mockEmployees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    department: "Engineering",
    position: "Senior Dev",
    status: "active",
    salary: 95000,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    department: "Sales",
    position: "Manager",
    status: "active",
    salary: 75000,
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    department: "HR",
    position: "Specialist",
    status: "active",
    salary: 55000,
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    department: "Engineering",
    position: "Junior Dev",
    status: "inactive",
    salary: 65000,
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@example.com",
    department: "Finance",
    position: "Accountant",
    status: "active",
    salary: 70000,
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    department: "Marketing",
    position: "Coordinator",
    status: "active",
    salary: 50000,
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace@example.com",
    department: "Engineering",
    position: "DevOps",
    status: "active",
    salary: 88000,
  },
  {
    id: 8,
    name: "Henry Taylor",
    email: "henry@example.com",
    department: "Sales",
    position: "Representative",
    status: "active",
    salary: 60000,
  },
  {
    id: 9,
    name: "Iris Martinez",
    email: "iris@example.com",
    department: "HR",
    position: "Manager",
    status: "active",
    salary: 78000,
  },
  {
    id: 10,
    name: "Jack Anderson",
    email: "jack@example.com",
    department: "Finance",
    position: "Controller",
    status: "active",
    salary: 110000,
  },
];

export default function EmployeeListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get unique departments
  const departments = [
    "all",
    ...new Set(mockEmployees.map((e) => e.department)),
  ];

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || employee.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "all" || employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchTerm, statusFilter, departmentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and view all employees ({filteredEmployees.length} total)
          </p>
        </div>
        <Link to="/employees/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4 border border-border/50">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-background border-border/50"
            />
          </div>

          {/* Status and Department Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="bg-background border-border/50">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={departmentFilter}
              onValueChange={(value) => {
                setDepartmentFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="bg-background border-border/50">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 border-b border-border/50">
                <TableHead className="text-foreground font-bold">
                  Name
                </TableHead>
                <TableHead className="text-foreground font-bold">
                  Email
                </TableHead>
                <TableHead className="text-foreground font-bold">
                  Department
                </TableHead>
                <TableHead className="text-foreground font-bold">
                  Position
                </TableHead>
                <TableHead className="text-foreground font-bold">
                  Status
                </TableHead>
                <TableHead className="text-foreground font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {employee.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {employee.email}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {employee.department}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {employee.position}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "active" ? "default" : "secondary"
                        }
                        className={
                          employee.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }
                      >
                        {employee.status.charAt(0).toUpperCase() +
                          employee.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/employees/${employee.id}/edit`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
