export interface Hospital {
  id?: number;
  cif: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export type HospitalFormData = Omit<Hospital, 'id'>;