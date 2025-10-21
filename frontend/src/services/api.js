import axios from 'axios';

const API_BASE_URL = '/api';

export const api = {
  async validateGrid(grid) {
    const response = await axios.post(`${API_BASE_URL}/validate`, { grid });
    return response.data;
  },

  async getHint() {
    const response = await axios.get(`${API_BASE_URL}/hint`);
    return response.data;
  },

  async getSolution() {
    const response = await axios.get(`${API_BASE_URL}/solution`);
    return response.data;
  },

};
