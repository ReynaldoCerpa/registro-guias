import { headers } from "../../config/headers";

export const registerGuide = async (data) => {

      const response = await fetch(`${process.env.REACT_APP_URL}guides/register`, {
          method: "post",
          headers: headers,
          body: JSON.stringify(data)
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