export interface DietaryPreference {
    userId: number | null; // Update the type to allow null
    isVegan: boolean;
    meatIds: number[];
  }