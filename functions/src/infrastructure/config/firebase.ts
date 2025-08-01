import * as admin from 'firebase-admin';

admin.initializeApp(); // Usa las credenciales del entorno de Firebase Functions

const db = admin.firestore();

export { db };
