import { headers } from "../../config/headers";

export const dailyReports = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}reports/dailyReports`, {
          method: "get",
          headers: headers,
        }
      );
      const data = await response.json();
      return data[0];
}