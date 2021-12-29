import { headers } from "../../config/headers";

export const reports = async (duration) => {
  const values = {
    duration: duration
  }
  const response = await fetch(`${process.env.REACT_APP_URL}reports/getReport`, {
      method: "post",
      headers: headers,
      body: JSON.stringify(values)
    }
  );
  const data = await response.json();
  return [data[0][0]];
}