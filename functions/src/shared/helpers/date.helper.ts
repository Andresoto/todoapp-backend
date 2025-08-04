/**
 * Safely converts a Firebase Timestamp to a JavaScript Date
 * @param timestamp - Firebase Timestamp, Date, or any other value
 * @returns Date object or undefined if conversion is not possible
 */
export function toDateSafe(timestamp: any): Date | undefined {
  if (!timestamp) {
    return undefined;
  }

  // If it's already a Date
  if (timestamp instanceof Date) {
    return timestamp;
  }

  // If it's a Firebase Timestamp
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }

  // If it's a Firestore server timestamp
  if (timestamp && timestamp._seconds !== undefined) {
    return new Date(timestamp._seconds * 1000);
  }

  return undefined;
}
