import { styled } from "@mui/system"
import { Button as StyledButton } from "@mui/material"
import { FiLogOut } from "react-icons/fi"

export const NavButton = styled(StyledButton, {})({
    height: "2.5rem",
    display: "flex",
    backgroundColor: "#fff",
    color: "#08406e",
    "&:hover":{backgroundColor: "#ebebeb"}
})

export const SignOutButton = styled(StyledButton, {})({
    width:"0.5rem"
})

export const SignOutIcon = styled(FiLogOut, {})({
    color: "#fff",
    fontSize: "1.5rem",
    padding: "0"
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

export const RegisterGuiaButton = styled(StyledButton, {})({
    margin: "1rem",
    height: "2.5rem",
    width: "10rem",
    display: "flex",
    backgroundColor: "#08406e",
    color: "#fff",
    "&:hover":{backgroundColor: "#0c5591"}
})

export const AddHorasButton = styled(StyledButton, {})({
    marginRight: "1rem",
    height: "2rem",
    width: "9rem",
    display: "flex",
    fontSize: "0.8rem",
    backgroundColor: "#08406e",
    color: "#fff",
    "&:hover":{backgroundColor: "#0c5591"}
})

export const ReportButton = styled(StyledButton, {})({
    
    padding: "0.5rem",
    lineHeight: "0.9rem",
    width: "10.5rem",
    display: "flex",
    fontSize: "0.8rem",
    backgroundColor: "#08406e",
    color: "#fff",
    "&:hover":{backgroundColor: "#0c5591"}
})
