import { headers } from "../../config/headers";

export const checkTime = async (id) => {
    const values = {
        idGuia: id
    }
      const response = await fetch(`${process.env.REACT_APP_URL}guides/checkTime`, {
          method: "post",
          headers: headers,
          body: JSON.stringify(values)
        }
      );
      const data = await response.json();
      return data[0];
}