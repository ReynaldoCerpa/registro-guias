import { headers } from "../../config/headers";

export const deleteGuides = async (data) => {

      const response = await fetch(`${process.env.REACT_APP_URL}guides/deleteGuides`, {
          method: "put",
          headers: headers,
          body: JSON.stringify(data)
        }
      );
      if(response.ok){
        return [response.ok];
      } else {
        return [response.ok];
      }
      
}