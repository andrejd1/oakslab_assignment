import { Paper, styled } from "@mui/material";
import { CustomStyledComponentProps } from "../../types/common";

const CustomPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "2rem",
  },
  padding: "3rem",
}));

const StyledPaper = ({ children }: CustomStyledComponentProps) => {
  return <CustomPaper>{children}</CustomPaper>;
};

export default StyledPaper;
