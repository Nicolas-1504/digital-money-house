import * as yup from "yup";

export const NewCardSchema = yup
  .object({
    number: yup
      .number()
      .typeError("Este campo solo debe incluir números")
      .test(
        "longitud",
        "El número de la tarjeta debe contener entre 14 y 16 digitos",
        (value) =>
          value
            ? value.toString().length > 13 && value.toString().length < 17
            : false
      )
      .required("Número de la tarjeta es un campo obligatorio"),
    cvc: yup
      .number()
      .typeError("Este campo solo debe incluir números")
      .test(
        "longitud",
        "El código de seguridad debe contener entre 3 y 4 digitos",
        (value) =>
          value
            ? value.toString().length > 2 && value.toString().length < 5
            : false
      )
      .required("Código de seguridad es un campo obligatorio"),
    expiry: yup
      .string()
      .matches(
        /^((0[1-9])|(1[0-2]))\/(\d{4})$/,
        "Ingrese la fecha con el siguente formato: MM/AAAA"
      )
      .required("Fecha de vencimiento es un campo obligatorio"),
    name: yup
      .string()
      .max(20, "Como máximo puede ingresar 20 caracteres")
      .required("Nombre y apellido es un campo obligatorio"),
  })
  .required();

export type Focused = "name" | "number" | "expiry" | "cvc";
export type TNewCardSchema = {
  number: string;
  cvc: string;
  expiry: string;
  name: string;
  focus?: Focused | undefined;
};

export type TNewCardSubmit = {
  number_id: string;
  cod: string;
  expiration_date: string;
  first_last_name: string;
};
