import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Users } from "lucide-react";

const mockDepartments = [
  {
    id: 1,
    name: "Engineering",
    manager: "Alice Johnson",
    managerEmail: "alice@example.com",
    employees: ["David Wilson", "Grace Lee"],
    employeeCount: 8,
    budget: 850000,
  },
  {
    id: 2,
    name: "Sales",
    manager: "Bob Smith",
    managerEmail: "bob@example.com",
    employees: ["Henry Taylor"],
    employeeCount: 12,
    budget: 550000,
  },
  {
    id: 3,
    name: "HR",
    manager: "Iris Martinez",
    managerEmail: "iris@example.com",
    employees: ["Carol Davis"],
    employeeCount: 4,
    budget: 250000,
  },
  {
    id: 4,
    name: "Finance",
    manager: "Jack Anderson",
    managerEmail: "jack@example.com",
    employees: ["Emma Brown"],
    employeeCount: 6,
    budget: 450000,
  },
  {
    id: 5,
    name: "Marketing",
    manager: "Grace Lee",
    managerEmail: "grace@example.com",
    employees: ["Frank Miller"],
    employeeCount: 5,
    budget: 300000,
  },
];

const allManagers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Davis" },
  { id: 4, name: "Emma Brown" },
  { id: 5, name: "Grace Lee" },
  { id: 6, name: "Iris Martinez" },
  { id: 7, name: "Jack Anderson" },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    manager: "",
  });

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.manager) {
      const department = {
        id: Math.max(...departments.map((d) => d.id), 0) + 1,
        name: newDepartment.name,
        manager: newDepartment.manager,
        managerEmail: "manager@example.com",
        employees: [],
        employeeCount: 0,
        budget: 0,
      };
      setDepartments([...departments, department]);
      setNewDepartment({ name: "", manager: "" });
      setShowAddDialog(false);
    }
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage departments and their managers
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deptName" className="font-medium">
                  Department Name
                </Label>
                <Input
                  id="deptName"
                  placeholder="e.g., Operations"
                  value={newDepartment.name}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, name: e.target.value })
                  }
                  className="bg-background border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager" className="font-medium">
                  Manager
                </Label>
                <Select
                  value={newDepartment.manager}
                  onValueChange={(value) =>
                    setNewDepartment({ ...newDepartment, manager: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border/50">
                    <SelectValue placeholder="Select a manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {allManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.name}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddDepartment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Create Department
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Total Departments
          </p>
          <p className="text-4xl font-bold text-foreground mt-2">
            {departments.length}
          </p>
        </Card>
        <Card className="p-6 border border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Total Employees
          </p>
          <p className="text-4xl font-bold text-foreground mt-2">
            {departments.reduce((sum, d) => sum + d.employeeCount, 0)}
          </p>
        </Card>
        <Card className="p-6 border border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Total Budget
          </p>
          <p className="text-4xl font-bold text-foreground mt-2">
            $
            {departments.reduce((sum, d) => sum + d.budget, 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="p-6 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">
                  {dept.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {dept.managerEmail}
                </p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        /* Edit department */
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Manager</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-foreground mb-3">
                          {dept.name}
                        </p>
                        <Label
                          htmlFor="newManager"
                          className="font-medium mb-2 block"
                        >
                          Select New Manager
                        </Label>
                        <Select defaultValue={dept.manager}>
                          <SelectTrigger className="bg-background border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {allManagers.map((manager) => (
                              <SelectItem key={manager.id} value={manager.name}>
                                {manager.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Update Manager
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteDepartment(dept.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              {/* Manager Info */}
              <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Manager
                </p>
                <p className="font-semibold text-foreground">{dept.manager}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-blue-700 font-medium">
                      Employees
                    </p>
                  </div>
                  <p className="text-lg font-bold text-blue-700">
                    {dept.employeeCount}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700 font-medium mb-1">
                    Budget
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    ${(dept.budget / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>

              {/* Linked Employees */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Linked Employees
                </p>
                {dept.employees.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {dept.employees.map((emp, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {emp}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No employees linked
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
