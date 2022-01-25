import { headers } from "../../config/headers";
import axios from "axios"

export const checkTime = async (id) => {

  const ip = await axios.get('https://geolocation-db.com/json/')
console.log(ip.data.IPv4);
    const values = {
        idGuia: id,
        ip: ip.data.IPv4
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