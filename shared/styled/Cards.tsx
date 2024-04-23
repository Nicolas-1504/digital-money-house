import { Button, Stack, Typography, Box, styled } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

type StyledProps = {
  styles?: object;
};

export const CardListRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "25px 0px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
}));

export const CardListItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "10px",
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  color: "black",
  fontWeight: "700",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#FAD9D8",
  },
}));

export const StackAddCard = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  color: theme.palette.primary.main,
  marginTop: "35px",
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

export const AddCircleOutlineIconStyle = styled(AddCircleOutlineIcon)(
  ({ theme }) => ({
    fontSize: "40px",
    marginRight: "20px",
  })
);

export const ArrowForwardIconStyle = styled(
  ArrowForwardRoundedIcon
)<StyledProps>(({ theme, styles }) => ({
  fontSize: "40px",
  "&:hover": {
    transform: "scale(1.1)",
  },
  ...styles,
}));

export const TitleAddNewCard = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  lineHeight: "22px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

export const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: `2px solid ${theme.palette.primary.main}`,
  width: "80%",
  textAlign: "center",
  padding: "50px",
  borderRadius: "10px",
  fontSize: "1rem",
}));

export const ModalDeleteButton = styled(Button)(({ theme }) => ({
  margin: "10px 20px",
  width: "150px",
  fontWeight: "700",
  backgroundColor: "#FF5050",
  border: `1px solid #FF5050`,
  color: "#FFF",
  "&:hover": {
    color: "red",
    backgroundColor: "#FFF",
  },
}));

export const ModalCancelButton = styled(Button)(({ theme }) => ({
  margin: "10px 20px",
  width: "150px",
  fontWeight: "700",
  backgroundColor: theme.palette.grey[600],
  border: `1px solid ${theme.palette.grey[600]}`,
  color: "#FFF",
  "&:hover": {
    color: theme.palette.grey[600],
    backgroundColor: "#FFF",
  },
}));
