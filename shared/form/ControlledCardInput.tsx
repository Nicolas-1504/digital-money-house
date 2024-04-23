import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  type?: string;
  name: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  passwordAdornment?: boolean;
  onFocus: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

const ControlledCardInput: FC<Props> = ({
  type,
  name,
  label,
  placeholder,
  required,
  passwordAdornment,
  onFocus,
}: Props) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController<Record<string, string>>({
    name: name,
    control,
  });

  const [show, setShow] = useState(true);

  useEffect(() => {
    passwordAdornment && setShow(false);
  }, []);

  return (
    <Box mb={"15px"} width={"100%"}>
      <TextField
        name={name}
        type={type || (show ? "text" : "password")}
        onChange={onChange}
        value={value}
        label={label || ""}
        placeholder={placeholder}
        inputRef={ref}
        fullWidth
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ""}`}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: "10px",
          },
        }}
        required={required || false}
        InputProps={
          passwordAdornment
            ? {
                endAdornment: show ? (
                  <IconButton onClick={() => setShow(false)}>
                    <VisibilityOff />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setShow(true)}>
                    <Visibility />
                  </IconButton>
                ),
              }
            : {}
        }
        onFocus={(
          e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
        ) => onFocus(e)}
      />
    </Box>
  );
};

export default ControlledCardInput;