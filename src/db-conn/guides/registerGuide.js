import { headers } from "../../config/headers";

export const registerNewGuide = async (id,nombre1, nombre2, apellidoPaterno, 
    apellidoMaterno, prestacion, fechaNacimiento, turno, servicio, horasRealizadas, genero) => {
    const values = {
        idGuia: id,
        nombre1: nombre1,
        nombre2: nombre2,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        prestacion: prestacion,
        fechaNacimiento: fechaNacimiento,
        turno: turno,
        servicio: servicio,
        horasRealizadas: horasRealizadas,
        genero: genero
    }
      const response = await fetch(`${process.env.REACT_APP_URL}guides/register`, {
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