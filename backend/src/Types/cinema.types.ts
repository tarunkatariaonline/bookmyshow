interface ICinemaCreateReq {
  name: string;
  location: {
    city: string;
    address: string;
    pincode: number;
  };
  managers: string[];
  security: string[];
}

export { ICinemaCreateReq };
