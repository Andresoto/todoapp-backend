import { db } from "../config/firebase";
import { User } from "../../domain/entities/user";
import { UserDataSource } from "./user.datasource";
import { toDateSafe } from "../../shared/helpers/date.helper";
import { removeUndefinedValues } from "../../shared/helpers/firestore.helper";

export class FirebaseUserDataSource implements UserDataSource {
  
  async findByEmail(email: string): Promise<User | null> {
    try {
      const userSnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const userData = userSnapshot.docs[0].data();
      return {
        id: userSnapshot.docs[0].id,
        email: userData.email,
        createdAt: toDateSafe(userData.createdAt),
        updatedAt: toDateSafe(userData.updatedAt),
      };
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Failed to fetch user");
    }
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      const userRef = db.collection("users").doc();
      
      // Prepare user data and clean undefined values
      const rawUserData = {
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      
      const userData = removeUndefinedValues(rawUserData);
      
      await userRef.set(userData);
      
      return {
        id: userRef.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const userDoc = await db.collection("users").doc(id).get();
      
      if (!userDoc.exists) {
        return null;
      }

      const userData = userDoc.data()!;
      return {
        id: userDoc.id,
        email: userData.email,
        createdAt: toDateSafe(userData.createdAt),
        updatedAt: toDateSafe(userData.updatedAt),
      };
    } catch (error) {
      console.error("Error fetching user by id:", error);
      throw new Error("Failed to fetch user");
    }
  }
}
