import { headers } from "../../config/headers";

export const logIn = async (username, password) => {
  let token = '';
  const logInRequestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      username: username,
      password: password
    })
  }
  const response = await fetch(`${process.env.REACT_APP_URL}` + 'auth/login', logInRequestOptions);
  const data = await response.json()
  if (data.token != undefined) {
    token = data.token;
    return [true, token]
  } else {
    return [false, data]
  }
};
