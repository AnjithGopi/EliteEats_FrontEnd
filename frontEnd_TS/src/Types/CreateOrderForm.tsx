


export interface FormData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  selectedAddress?: string;
  customAddress?: string;
  liveAddress?:string;
  city?: string;
  state?: string;
  zipCode?: string;
  landmark?: string;
  addressType?: "home" | "work" | "other";
  deliveryInstructions?: string;
}
