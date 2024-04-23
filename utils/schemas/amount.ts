import { number, object } from "yup";

export const amountSchema = object().shape({
  amount: number()
    .typeError("Solo se puede incluir números")
    .required("Debes colocar el monto a cargar"),
});
