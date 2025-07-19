import { Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function AddNewRowButton({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Tooltip title={title}>
        <IconButton onClick={onClick} size="small" color="primary">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
