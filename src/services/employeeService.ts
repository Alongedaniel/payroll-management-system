import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  jobTitle: string;
  departmentId: string;
  managerId?: string;
  employmentType: "full-time" | "part-time" | "contract";
  baseSalary: number;
  bonus: number;
  deductions: number;
  status: "active" | "inactive";
  hireDate?: string;
  createdAt?: Date;
}

const COLLECTION_NAME = "employees";

export const employeeService = {
  async getAllEmployees(filters?: { status?: string; departmentId?: string }) {
    const constraints: QueryConstraint[] = [];

    if (filters?.status) {
      constraints.push(where("status", "==", filters.status));
    }
    if (filters?.departmentId) {
      constraints.push(where("departmentId", "==", filters.departmentId));
    }

    const q = constraints.length > 0 ? query(collection(db, COLLECTION_NAME), ...constraints) : collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Employee & { id: string })[];
  },

  async getEmployeeById(id: string) {
    const docSnap = await getDocs(
      query(collection(db, COLLECTION_NAME), where("id", "==", id))
    );
    if (docSnap.empty) return null;
    const doc = docSnap.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Employee & { id: string };
  },

  async createEmployee(data: Employee) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...data };
  },

  async updateEmployee(id: string, data: Partial<Employee>) {
    await updateDoc(doc(db, COLLECTION_NAME, id), data);
    return { id, ...data };
  },

  async deleteEmployee(id: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  },
};
