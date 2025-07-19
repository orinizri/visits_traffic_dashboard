import { Box, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function AddNewRowButton({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Tooltip title={title}>
        <Button onClick={onClick} size="small" color="primary">
          <AddIcon />
          {title}
        </Button>
      </Tooltip>
    </Box>
  );
}
