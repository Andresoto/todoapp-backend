import { db } from '../config/firebase';

export class AuthService {

    // implementar patron singleton
    private static instance: AuthService;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string) {
        try {
            const userSnapshot = await db.collection('users').where('email', '==', email).get();
            if (userSnapshot.empty) {
                return null; // User not found
            }
            const userData = userSnapshot.docs[0].data();
            return { 
                id: userSnapshot.docs[0].id, 
                ...userData 
            }; // Return user data with ID
        } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error("Failed to fetch user");
        }
    }

    async registerUser(email: string) {
        try {
            const userRef = db.collection('users').doc();
            await userRef.set({ email });
            return { id: userRef.id, email }; // Return new user data with ID
        } catch (error) {
            console.error("Error registering user:", error);
            throw new Error("Failed to register user");
        }
    }
}