import { Box } from "@mui/material";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  chart: ReactNode;
  table: ReactNode;
}

export default function DashboardLayout({ chart, table }: DashboardLayoutProps) {
  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, sm: 4 },
        pt: 2,
        gap: 2,
        bgcolor: "background.default",
      }}
    >
      {/* Chart Section */}
      <Box
        sx={{
          flex: "0 0 auto",
          minHeight: 200,
          maxHeight: 300,
          width: "100%",
        }}
        mb={10}
      >
        {chart}
      </Box>

      {/* Table Section */}
      <Box
        sx={{
          flex: "1 1 auto",
          overflow: "auto",
          minHeight: 0,
          maxHeight: "50dvh",
          pb: 2,
        }}
      >
        {table}
      </Box>
    </Box>
  );
}
