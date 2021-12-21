import { headers } from "../../../config/headers";

export const guias = async () => {
    try {  
      const response = await fetch(`${process.env.REACT_APP_URL}guides/`, {
          method: "get",
          headers: headers,
        }
      );
      const data = await response.json();
      console.log(data[0]);
      return data;
    } catch (e) {
      console.log(e);
    }
  }