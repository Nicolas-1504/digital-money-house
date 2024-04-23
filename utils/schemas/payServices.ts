import { number, object } from "yup";

export const payServicesSchema = object().shape({
  accountNumber: number()
    .typeError("Solo se puede incluir números")
    .test("longitud", "Tu numero de cuenta debe contener 11 numeros", (value) =>
      value ? value.toString().length == 11 : false
    )
    .required("Debes colocar el numero de cuenta"),
});
