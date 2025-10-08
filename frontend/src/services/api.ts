import axios from 'axios';
import { ValidationResponse, PatternInfo, HintResponse, SolutionResponse, GridType } from '../types';

const API_BASE_URL = '/api';

export const api = {
  async validateGrid(grid: GridType): Promise<ValidationResponse> {
    const response = await axios.post<ValidationResponse>(`${API_BASE_URL}/validate`, { grid });
    return response.data;
  },

  async getHint(): Promise<HintResponse> {
    const response = await axios.get<HintResponse>(`${API_BASE_URL}/hint`);
    return response.data;
  },

  async getSolution(): Promise<SolutionResponse> {
    const response = await axios.get<SolutionResponse>(`${API_BASE_URL}/solution`);
    return response.data;
  },

  async getPatternInfo(): Promise<PatternInfo> {
    const response = await axios.get<PatternInfo>(`${API_BASE_URL}/pattern-info`);
    return response.data;
  }
};
