/**
 * Removes undefined values from an object to make it safe for Firestore
 * @param obj - Object to clean
 * @returns Object without undefined values
 */
export function removeUndefinedValues(obj: Record<string, any>): Record<string, any> {
  const cleanObj: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleanObj[key] = value;
    }
  }
  
  return cleanObj;
}
