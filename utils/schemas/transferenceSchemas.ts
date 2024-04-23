import * as yup from "yup";

export const originSchema = yup.object({
  origin: yup
    .string()
    .required("Este es un campo obligatorio")
    .typeError("Este campo solo debe incluir números")
    .test("Numbers only", "Este campo solo debe incluir números", (value) =>
      value ? /^\d+$/.test(value) : false
    )
    .test("length", "El número de cvu debe contener 22 dígitos", (value) => {
      return value ? value.toString().length === 22 : false;
    }),
});

export const amountSchema = yup.object({
  amount: yup
    .number()
    .typeError("Este campo solo debe incluir números")
    .required("Este es un campo obligatorio"),
});
