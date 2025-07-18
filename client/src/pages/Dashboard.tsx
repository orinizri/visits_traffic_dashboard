import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorAlert from "../components/ui/ErrorAlert";
import { useVisitsTraffic } from "../hooks/useVisitsTraffic";
import { aggregateByDate } from "../utils/aggregate";
import { VisitsTrafficEntry } from "../types/visitsTraffic.types";
import { TimeInterval } from "../types/enum.types";
import VisitsTrafficChart from "../components/charts/visitsTrafficChart";
import Toggle from "../components/ui/Toggle";
import { useState } from "react";
import VisitsTrafficTableContainer from "../components/containers/VisitTrafficContainer";
import DashboardLayout from "../components/layouts/Dashboard";

export default function DashboardPage() {
  const { data, error, isLoading } = useVisitsTraffic();
  const [interval, setInterval] = useState<TimeInterval>(TimeInterval.week);

  if (isLoading) return <LoadingSpinner message="Loading visits..." />;
  if (error) return <ErrorAlert message={error.message} />;
  if (!data || !data.length) return <div>No data available</div>;

  const chartData = aggregateByDate<VisitsTrafficEntry>(data, interval, true, "date");

  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   <VisitsChart data={chartData} interval={interval} />
    //   <VisitsTrafficTableContainer data={data} />
    // </div>
    <DashboardLayout
      chart={<VisitsTrafficChart data={chartData} interval={interval} setInterval={setInterval} />}
      table={
        <VisitsTrafficTableContainer
          data={data}
          // filters={filters}
          // updateFilter={updateFilter}
          // sort={sort}
          // updateSort={updateSort}
        />
      }
    />
  );
}
