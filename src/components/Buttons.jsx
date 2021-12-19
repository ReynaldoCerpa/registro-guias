import { styled } from "@mui/system"
import { Button as StyledButton } from "@mui/material"

export const NavButton = styled(StyledButton, {})({
    height: "2.5rem",
    width: "8rem",
    display: "flex",
    backgroundColor: "#fff",
    color: "#08406e",
    "&:hover":{backgroundColor: "#ebebeb"}
})

export const LoginButton = styled(StyledButton, {})({
    margin: "1rem",
    height: "2.5rem",
    width: "10rem",
    display: "flex",
    backgroundColor: "#08406e",
    color: "#fff",
    "&:hover":{backgroundColor: "#0c5591"}
})