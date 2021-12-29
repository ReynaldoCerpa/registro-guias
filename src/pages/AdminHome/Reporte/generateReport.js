import { headers } from "../../../config/headers";

export const reports = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}reports/dailyReports`, {
          method: "post",
          headers: headers,
        }
      );
      const data = await response.json();
      return data[0];
}