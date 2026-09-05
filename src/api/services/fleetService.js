import apiClient from '@api/client/apiClient';

export const fleetService = {
  async getVehicles() {
    return apiClient.get('/api/vehicles');
  },

  async getVehicleById(id) {
    return apiClient.get(`/api/vehicles/${id}`);
  },

  async getVehiclesByStatus(status) {
    return apiClient.get(`/api/vehicles/status/${status}`);
  },

  async getStatistics() {
    return apiClient.get('/api/statistics');
  },
};

export default fleetService;
