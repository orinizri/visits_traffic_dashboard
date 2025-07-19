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

interface AxesKeys {
  xAxisKey: string;
  yAxisKey: string;
}

type VisitsChartProps = {
  title: string;
  data: VisitsTrafficEntry[];
  interval: TimeInterval;
  setInterval: (newValue: TimeInterval) => void;
  axesKeys: AxesKeys;
};

export default function Chart({ title, data, interval, setInterval, axesKeys }: VisitsChartProps) {
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
        <Typography variant="h6">{title}</Typography>
        <Toggle value={interval} onChange={setInterval} />
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={axesKeys.xAxisKey}
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
          <Line
            type="monotone"
            stroke="#1976d2"
            dataKey={axesKeys.yAxisKey}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
