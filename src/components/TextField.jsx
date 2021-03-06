import {styled} from "@mui/system"
import { TextField as StyledTextField} from "@mui/material"

export const TextField = styled(StyledTextField, {})({
    margin: "0.5rem",
    width: "100%",
    maxWidth: "15rem",
    position: "relative"
});

export const RegisterTextField = styled(StyledTextField, {})({
    margin: "0.5rem",
    width: "100%",
    maxWidth: "20rem",
});
