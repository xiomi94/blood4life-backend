import axios from 'axios';
import type { Hospital, HospitalFormData } from '../models/Hospital';
import { API_URL } from '../config';

export const hospitalService = {
  async getHospitales(): Promise<Hospital[]> {
    try {
      const response = await axios.get(`${API_URL}/hospital`);

      const data = response.data;

      // Asegurarse de devolver siempre un array
      if (Array.isArray(data)) {
        return data;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error('Formato inesperado de respuesta:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener hospitales:', error);
      return [];
    }
  },

  async createHospital(hospital: HospitalFormData): Promise<Hospital> {
    const response = await axios.post(`${API_URL}/hospital`, hospital);
    return response.data;
  },

  async updateHospital(hospital: Hospital): Promise<Hospital | { message: string }> {
    const response = await axios.put(`${API_URL}/hospital`, hospital);
    return response.data;
  },

  async deleteHospital(id: number): Promise<{ status: string }> {
    const response = await axios.delete(`${API_URL}/hospital/${id}`);
    return response.data;
  },
};
