


export interface Address {
  id: string;
  type: "home" | "work" | "other";
  address: string;
  landmark?: string;
  isDefault: boolean;
}