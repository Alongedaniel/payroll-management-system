import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export interface Department {
  id?: string;
  name: string;
  managerId: string;
  budget: number;
  description?: string;
  status: "active" | "inactive";
  createdAt?: Date;
}

const COLLECTION_NAME = "departments";

export const departmentService = {
  async getAllDepartments() {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (Department & { id: string })[];
  },

  async getDepartmentById(id: string) {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const doc = querySnapshot.docs.find((d) => d.id === id);
    if (!doc) return null;
    return {
      id: doc.id,
      ...doc.data(),
    } as Department & { id: string };
  },

  async createDepartment(data: Department) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...data };
  },

  async updateDepartment(id: string, data: Partial<Department>) {
    await updateDoc(doc(db, COLLECTION_NAME, id), data);
    return { id, ...data };
  },

  async deleteDepartment(id: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  },
};
