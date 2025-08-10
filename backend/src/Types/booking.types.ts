interface ICreateBookingReq {
  showId: string; // MongoDB ObjectId as string
  movie: string; // MongoDB ObjectId as string
  cinema: string; // MongoDB ObjectId as string
  screen: string; // MongoDB ObjectId as string
  seatCategory: string; // e.g., "Premium", "Gold", "Silver"
  seats: string[]; // Array of seat numbers like ["A1", "A2"]
  totalPrice: number; // Total price in currency units
  user: string; // MongoDB ObjectId of the user as string
}

export { ICreateBookingReq };
