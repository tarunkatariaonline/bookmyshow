interface ICreateCouponReq {
  title: string;
  description: string;
  code: string;
  discountType: string; // or string if you want it more flexible
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount: number;
  startDate: Date | string; // use Date if you’ll store as Date object
  endDate: Date | string;
  usageLimit: number;
  isActive: boolean;
}

export { ICreateCouponReq };
