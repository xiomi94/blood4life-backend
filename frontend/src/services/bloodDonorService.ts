import axios from 'axios';
import {API_URL} from "../config.ts";
import type {BloodDonor} from "../models/BloodDonor.ts";

export const bloodDonorService = {

  getAll: () => {
    return axios.get<BloodDonor[]>(`${API_URL}/bloodDonor`)
  },
  delete: (id: number) => {
    return axios.delete<{status: string}>(`${API_URL}/bloodDonor/${id}`)
  },
  create: (bloodDonor: BloodDonor) => {
    return axios.post<BloodDonor>(`${API_URL}/bloodDonor`, bloodDonor)
  },
  update: (id: number, data: BloodDonor) => {
    return axios.put(`${API_URL}/bloodDonor/${id}`, data);
  }



}