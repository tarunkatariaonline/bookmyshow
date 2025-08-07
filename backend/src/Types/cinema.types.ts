interface ICinemaCreateReq {
  name: string;
  location: {
    city: string;
    address: string;
    pincode: number;
  };
}

export { ICinemaCreateReq };
