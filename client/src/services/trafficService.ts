import axiosInstance from "../api/axios";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";

export const fetchVisitsTraffic = async (): Promise<VisitsTrafficEntry[]> => {
  const response = await axiosInstance.get("/visits-traffic");
  return response.data.data;
};
