import axios from "../api/axios";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";

export const getVisitsTraffic = async (): Promise<VisitsTrafficEntry[]> => {
  const response = await axios.get("/visits-traffic");
  console.log("Fetched visits traffic data:", response.data);
  return response.data.data;
};
