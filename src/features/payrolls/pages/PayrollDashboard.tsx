import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { AlertCircle, Edit3, Play } from "lucide-react";

const payrollData = [
  {
    id: 1,
    employee: "Alice Johnson",
    base: 8000,
    bonus: 1000,
    deductions: 500,
    tax: 1200,
    net: 7300,
    status: "pending",
  },
  {
    id: 2,
    employee: "Bob Smith",
    base: 6000,
    bonus: 500,
    deductions: 300,
    tax: 900,
    net: 5300,
    status: "pending",
  },
  {
    id: 3,
    employee: "Carol Davis",
    base: 4500,
    bonus: 300,
    deductions: 200,
    tax: 675,
    net: 3925,
    status: "pending",
  },
  {
    id: 4,
    employee: "Emma Brown",
    base: 5500,
    bonus: 400,
    deductions: 250,
    tax: 825,
    net: 4825,
    status: "pending",
  },
  {
    id: 5,
    employee: "Grace Lee",
    base: 7000,
    bonus: 800,
    deductions: 400,
    tax: 1050,
    net: 6350,
    status: "pending",
  },
];

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState(payrollData);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState<
    (typeof payrollData)[0] | null
  >(null);
  const [newPayroll, setNewPayroll] = useState({
    month: "February 2026",
    status: "draft",
  });

  const totalNetSalary = payrolls.reduce((sum, p) => sum + p.net, 0);
  const totalBase = payrolls.reduce((sum, p) => sum + p.base, 0);
  const totalBonus = payrolls.reduce((sum, p) => sum + p.bonus, 0);

  const handleEditPayroll = (payroll: (typeof payrollData)[0]) => {
    setEditingPayroll(payroll);
    setShowPreviewDialog(true);
  };

  const handleUpdatePayroll = () => {
    if (editingPayroll) {
      setPayrolls(
        payrolls.map((p) => (p.id === editingPayroll.id ? editingPayroll : p)),
      );
      setEditingPayroll(null);
      setShowPreviewDialog(false);
    }
  };

  const handleProcessPayroll = () => {
    setPayrolls(payrolls.map((p) => ({ ...p, status: "processed" })));
    setShowPreviewDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Payroll Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">February 2026</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto h-11">
              ➕ Create Payroll
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Payroll</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="month" className="font-medium">
                  Payroll Month
                </Label>
                <Select
                  value={newPayroll.month}
                  onValueChange={(value) =>
                    setNewPayroll({ ...newPayroll, month: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January 2026">January 2026</SelectItem>
                    <SelectItem value="February 2026">February 2026</SelectItem>
                    <SelectItem value="March 2026">March 2026</SelectItem>
                    <SelectItem value="April 2026">April 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => {
                  setShowCreateDialog(false);
                  setShowPreviewDialog(true);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Create Payroll
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Current Status
          </p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-2xl font-bold text-foreground">Draft</p>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
              Draft
            </Badge>
          </div>
        </Card>

        <Card className="p-6 border border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Last Payroll Run
          </p>
          <p className="text-2xl font-bold text-foreground mt-3">
            Jan 31, 2026
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Successfully processed
          </p>
        </Card>

        <Card className="p-6 border border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Total Employees
          </p>
          <p className="text-2xl font-bold text-foreground mt-3">
            {payrolls.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">In payroll</p>
        </Card>

        <Card className="p-6 border border-primary/30 bg-primary/5">
          <p className="text-sm text-primary font-medium">Total Payroll Cost</p>
          <p className="text-2xl font-bold text-primary mt-3">
            ${totalNetSalary.toLocaleString()}
          </p>
          <p className="text-xs text-primary/70 mt-1">This payroll</p>
        </Card>
      </div>

      {/* Alert */}
      {payrolls.some((p) => p.status === "pending") && (
        <Card className="p-4 border border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">
                Payroll not processed yet
              </p>
              <p className="text-sm text-amber-800 mt-1">
                Review and adjust employee salaries before processing. Changes
                can be made to individual records.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Payroll Table */}
      <Card className="border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 border-b border-border/50">
                <TableHead className="text-foreground font-bold">
                  Employee
                </TableHead>
                <TableHead className="text-right text-foreground font-bold">
                  Base
                </TableHead>
                <TableHead className="text-right text-foreground font-bold">
                  Bonus
                </TableHead>
                <TableHead className="text-right text-foreground font-bold">
                  Deductions
                </TableHead>
                <TableHead className="text-right text-foreground font-bold">
                  Tax
                </TableHead>
                <TableHead className="text-right text-foreground font-bold">
                  Net Salary
                </TableHead>
                <TableHead className="text-center text-foreground font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls.map((payroll) => (
                <TableRow
                  key={payroll.id}
                  className="border-b border-border/50 hover:bg-secondary/20"
                >
                  <TableCell className="font-medium text-foreground">
                    {payroll.employee}
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    ${payroll.base.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-green-600 font-medium">
                    +${payroll.bonus.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    -${payroll.deductions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    -${payroll.tax.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-bold text-foreground">
                    ${payroll.net.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditPayroll(payroll)}
                    >
                      <Edit3 className="w-4 h-4 text-primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="p-6 border-t border-border/50 bg-secondary/20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Total Base
              </p>
              <p className="text-lg font-bold text-foreground mt-1">
                ${totalBase.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Total Bonus
              </p>
              <p className="text-lg font-bold text-green-600 mt-1">
                +${totalBonus.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Total Deductions
              </p>
              <p className="text-lg font-bold text-red-600 mt-1">
                -$
                {payrolls
                  .reduce((s, p) => s + p.deductions, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Total Tax
              </p>
              <p className="text-lg font-bold text-red-600 mt-1">
                -${payrolls.reduce((s, p) => s + p.tax, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-xs text-primary font-bold">Total Net Salary</p>
              <p className="text-2xl font-bold text-primary mt-1">
                ${totalNetSalary.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      {payrolls.some((p) => p.status === "pending") && (
        <div className="flex gap-3">
          <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-border/50 h-11 font-semibold"
              >
                👁️ Preview Payroll
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="flex items-center justify-between w-full pr-4">
                  <DialogTitle>Edit Adjustment</DialogTitle>
                </div>
              </DialogHeader>
              {editingPayroll && (
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                    <p className="font-semibold text-foreground">
                      {editingPayroll.employee}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="bonus"
                        className="font-medium text-foreground"
                      >
                        Bonus
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="bonus"
                          type="number"
                          value={editingPayroll.bonus}
                          onChange={(e) =>
                            setEditingPayroll({
                              ...editingPayroll,
                              bonus: parseInt(e.target.value) || 0,
                              net:
                                editingPayroll.base +
                                  parseInt(e.target.value) ||
                                0 -
                                  editingPayroll.deductions -
                                  editingPayroll.tax,
                            })
                          }
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
                          type="number"
                          value={editingPayroll.deductions}
                          onChange={(e) =>
                            setEditingPayroll({
                              ...editingPayroll,
                              deductions: parseInt(e.target.value) || 0,
                              net:
                                editingPayroll.base +
                                editingPayroll.bonus -
                                (parseInt(e.target.value) || 0) -
                                editingPayroll.tax,
                            })
                          }
                          className="pl-8 bg-background border-border/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="tax"
                        className="font-medium text-foreground"
                      >
                        Tax
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="tax"
                          type="number"
                          value={editingPayroll.tax}
                          onChange={(e) =>
                            setEditingPayroll({
                              ...editingPayroll,
                              tax: parseInt(e.target.value) || 0,
                              net:
                                editingPayroll.base +
                                editingPayroll.bonus -
                                editingPayroll.deductions -
                                (parseInt(e.target.value) || 0),
                            })
                          }
                          className="pl-8 bg-background border-border/50"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-primary font-medium">
                          Net Salary
                        </p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          ${editingPayroll.net.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleUpdatePayroll}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-border/50"
                      onClick={() => setShowPreviewDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleProcessPayroll}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold h-11"
          >
            <Play className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      )}
    </div>
  );
}
