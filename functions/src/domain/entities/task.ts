import { FieldValue } from "firebase-admin/firestore";

export interface Task {
    id?: string;
    userId: string;
    title: string;
    description: string;
    state: boolean;
    completed: boolean;
    createdAt?: FieldValue;
    updatedAt?: FieldValue;
}