import { headers } from "../../config/headers";

export const logIn = async ( username, password ) => {
  let token = '';
  const logInRequestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username: username, 
                           password: password})
  }
  const response = await fetch(`${process.env.REACT_APP_URL}`+'auth/login', logInRequestOptions)
                              .then(response => response.json())
                              .then(data => token = data.token)
  if(token.includes("No")){
    return "No hay usuario con estos datos"
  }
  return token
};
