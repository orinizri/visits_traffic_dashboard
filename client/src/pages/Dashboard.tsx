import { useState, useMemo } from "react";
import { aggregateByDate } from "../utils/aggregate";
import { TimeInterval } from "../types/enum.types";
import { useVisitsTrafficData } from "../hooks/useVisitsTrafficData";
import { useVisitsTableManager } from "../hooks/useVisitsTableManager";
import DashboardLayout from "../components/layouts/Dashboard";
import Chart from "../components/charts/Chart";
import TableContainer from "../components/containers/TableContainer";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorAlert from "../components/ui/ErrorAlert";

export default function DashboardPage() {
  // Fetch data
  const { data, isLoading, error } = useVisitsTrafficData();
  // CRUD manager
  const tableManager = useVisitsTableManager(data || []);

  // Time Interval for toggling time interval in chart
  const [interval, setInterval] = useState<TimeInterval>(TimeInterval.week);

  const chartData = useMemo(() => {
    if (!data || !data?.length) return [];
    return aggregateByDate(data, interval, true, "date");
  }, [data, interval]);

  if (isLoading) return <LoadingSpinner message="Loading visits..." />;
  if (error) return <ErrorAlert message={error.message} />;
  if (!data || !data.length) return <div>No data available</div>;

  return (
    <DashboardLayout
      chart={
        <Chart
          data={chartData}
          interval={interval}
          setInterval={setInterval}
          title="Visits Over Time"
          axesKeys={{
            xAxisKey: "date",
            yAxisKey: "visits",
          }}
        />
      }
      table={<TableContainer {...tableManager} title="Visits Traffic" />}
    />
  );
}
