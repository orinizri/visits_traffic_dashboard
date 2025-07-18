import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { VisitsTrafficEntry } from "../../types/visitsTraffic.types"; // adjust path as needed
import { Typography, Box } from "@mui/material";
import Toggle from "../ui/Toggle";
import { TimeInterval } from "../../types/enum.types";

type VisitsChartProps = {
  data: VisitsTrafficEntry[];
  interval: TimeInterval;
  setInterval: (newValue: TimeInterval) => void;
};

export default function VisitsTrafficChart({ data, interval, setInterval }: VisitsChartProps) {
  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="body1" color="text.secondary">
          No data to display for selected range.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">Visits Over Time</Typography>
        <Toggle value={interval} onChange={setInterval} />
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={date =>
              new Date(date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })
            }
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            labelFormatter={date =>
              new Date(date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            }
          />
          <Line type="monotone" dataKey="visits" stroke="#1976d2" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
