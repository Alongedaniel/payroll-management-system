import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export interface Payroll {
  id?: string;
  periodStart: string;
  periodEnd: string;
  employeeId: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  tax: number;
  netSalary: number;
  status: "draft" | "processing" | "completed";
  processedBy?: string;
  processedAt?: Date;
  createdAt?: Date;
}

const COLLECTION_NAME = "payrolls";

export const payrollService = {
  async getAllPayrolls(filters?: { status?: string; employeeId?: string }) {
    let q = query(collection(db, COLLECTION_NAME));

    if (filters?.status) {
      q = query(collection(db, COLLECTION_NAME), where("status", "==", filters.status));
    }
    if (filters?.employeeId) {
      q = query(collection(db, COLLECTION_NAME), where("employeeId", "==", filters.employeeId));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Payroll & { id: string })[];
  },

  async getPayrollById(id: string) {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const doc = querySnapshot.docs.find((d) => d.id === id);
    if (!doc) return null;
    return {
      id: doc.id,
      ...doc.data(),
    } as Payroll & { id: string };
  },

  async createPayroll(data: Payroll) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...data };
  },

  async updatePayroll(id: string, data: Partial<Payroll>) {
    await updateDoc(doc(db, COLLECTION_NAME, id), data);
    return { id, ...data };
  },

  async deletePayroll(id: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  },

  calculateTax(baseSalary: number, bonus: number, deductions: number) {
    return (baseSalary + bonus - deductions) * 0.18;
  },

  calculateNetSalary(baseSalary: number, bonus: number, deductions: number, tax: number) {
    return baseSalary + bonus - deductions - tax;
  },
};
