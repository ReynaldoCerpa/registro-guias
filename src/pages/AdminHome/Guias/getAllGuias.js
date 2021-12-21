import { headers } from "../../../config/headers";

export const guias = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}guides/`, {
          method: "get",
          headers: headers,
        }
      );
      const data = await response.json();
      return data[0];
  }