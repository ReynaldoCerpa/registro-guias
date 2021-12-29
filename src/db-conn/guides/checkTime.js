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
      if(response.ok){
        const data = await response.json();
        return [response.ok,data];
      } else {
        const data = await response.json();
        return [response.ok,data];
      }
      
}