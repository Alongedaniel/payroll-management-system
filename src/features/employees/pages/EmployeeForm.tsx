import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building2 } from "lucide-react";

const departments = [
  { id: 1, name: "Engineering", manager: "Alice Johnson" },
  { id: 2, name: "Sales", manager: "Bob Smith" },
  { id: 3, name: "HR", manager: "Iris Martinez" },
  { id: 4, name: "Finance", manager: "Jack Anderson" },
  { id: 5, name: "Marketing", manager: "Grace Lee" },
];

export default function EmployeeFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    status: "active",
    baseSalary: "",
    bonus: "",
    deductions: "",
    tax: "",
  });

  const [selectedDepartment, setSelectedDepartment] = useState<
    (typeof departments)[0] | null
  >(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    navigate("/employees");
  };

  // Calculate net salary
  const netSalary =
    (parseInt(formData.baseSalary) || 0) +
    (parseInt(formData.bonus) || 0) -
    (parseInt(formData.deductions) || 0) -
    (parseInt(formData.tax) || 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/employees")}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Employee" : "Add New Employee"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isEditing
              ? "Update employee information"
              : "Fill in the details to add a new employee"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="p-6 border border-border/50">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="font-medium text-foreground"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-medium text-foreground">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium text-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="bg-background border-border/50"
              />
            </div>
          </div>
        </Card>

        {/* Department & Position */}
        <Card className="p-6 border border-border/50">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Position & Department
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-medium text-foreground">Department</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-border/50 bg-background"
                  >
                    <span>
                      {selectedDepartment
                        ? selectedDepartment.name
                        : "Select Department"}
                    </span>
                    <Building2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Department</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => {
                          setSelectedDepartment(dept);
                          handleSelectChange("department", dept.name);
                        }}
                        className="w-full text-left p-4 rounded-lg border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-colors"
                      >
                        <p className="font-semibold text-foreground">
                          {dept.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Manager: {dept.manager}
                        </p>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="font-medium text-foreground">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g., Senior Developer"
                value={formData.position}
                onChange={handleChange}
                className="bg-background border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="font-medium text-foreground">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Salary Structure */}
        <Card className="p-6 border border-border/50">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Salary Structure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="baseSalary"
                className="font-medium text-foreground"
              >
                Base Salary
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="baseSalary"
                  name="baseSalary"
                  type="number"
                  placeholder="0"
                  value={formData.baseSalary}
                  onChange={handleChange}
                  className="pl-8 bg-background border-border/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus" className="font-medium text-foreground">
                Bonus
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="bonus"
                  name="bonus"
                  type="number"
                  placeholder="0"
                  value={formData.bonus}
                  onChange={handleChange}
                  className="pl-8 bg-background border-border/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="deductions"
                className="font-medium text-foreground"
              >
                Deductions
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="deductions"
                  name="deductions"
                  type="number"
                  placeholder="0"
                  value={formData.deductions}
                  onChange={handleChange}
                  className="pl-8 bg-background border-border/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax" className="font-medium text-foreground">
                Tax
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="tax"
                  name="tax"
                  type="number"
                  placeholder="0"
                  value={formData.tax}
                  onChange={handleChange}
                  className="pl-8 bg-background border-border/50"
                />
              </div>
            </div>
          </div>

          {/* Net Salary Summary */}
          <Separator className="my-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground font-medium">
                Base Salary
              </p>
              <p className="text-xl font-bold text-foreground">
                ${formData.baseSalary || 0}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium">Bonus</p>
              <p className="text-xl font-bold text-green-700">
                +${formData.bonus || 0}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-red-700 font-medium">
                Total Deductions
              </p>
              <p className="text-xl font-bold text-red-700">
                -$
                {(parseInt(formData.deductions) || 0) +
                  (parseInt(formData.tax) || 0)}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-xs text-primary font-medium">Net Salary</p>
              <p className="text-2xl font-bold text-primary">${netSalary}</p>
            </div>
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-border/50 h-11"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
