import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorAlert from "../components/ui/ErrorAlert";
import { useVisitsTrafficData } from "../hooks/useVisitsTrafficData";
import { aggregateByDate } from "../utils/aggregate";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { TimeInterval } from "../types/enum.types";
import VisitsTrafficChart from "../components/charts/visitsTrafficChart";
import { useState } from "react";
import VisitsTrafficTableContainer from "../components/containers/VisitTrafficContainer";
import DashboardLayout from "../components/layouts/Dashboard";

export default function DashboardPage() {
  const { data, error, isLoading } = useVisitsTrafficData();
  const [interval, setInterval] = useState<TimeInterval>(TimeInterval.week);

  if (isLoading) return <LoadingSpinner message="Loading visits..." />;
  if (error) return <ErrorAlert message={error.message} />;
  if (!data || !data.length) return <div>No data available</div>;

  const chartData = aggregateByDate<VisitsTrafficEntry>(data, interval, true, "date");

  return (
    <DashboardLayout
      chart={<VisitsTrafficChart data={chartData} interval={interval} setInterval={setInterval} />}
      table={<VisitsTrafficTableContainer data={data} />}
    />
  );
}
