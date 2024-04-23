import { object, string } from "yup";

export const userSchema = object().shape({
  name: string()
    .min(2, "Debes ingresar un mínimo de 2 caracteres")
    .required(""),
  password: string()
    .required("")
    .matches(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).{6,20}$/,
      "Debes cumplir con las condiciones requeridas para la contraseña: Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter especial, una mayúscula y un número)"
    ),
  phone: string()
    .matches(/^[0-9]+$/, "Tu teléfono solo debe incluir números")
    .min(7, "Debes ingresar un mínimo de 7 dígitos")
    .max(15, "Debes ingresar un máximo de 15 digitos")
    .required(""),
});
