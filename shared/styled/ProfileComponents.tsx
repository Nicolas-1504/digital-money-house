import { styled } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CreateIcon from '@mui/icons-material/Create';

export const CopyIconStyle = styled(ContentCopyIcon)(({ theme }) => ({
  color: "#c1fd35",
  fontSize: "26px",
  cursor: 'pointer',
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export const PencilIconStyle = styled(CreateIcon)(({ theme }) => ({
  color: "#CECECE",
  fontSize: "26px",
  cursor: 'pointer',
  "&:hover": {
    transform: "scale(1.1)",
  },
}));
