import React, { FC } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import usePayServices from "DMH/context/payServices/usePayServices";
import services from "DMH/utils/json/services.json";

interface ISearchBarProps {
  placeholder?: string;
}

const SearchService: FC<ISearchBarProps> = ({ placeholder = "Buscar" }) => {
  const { state, dispatch } = usePayServices();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: any
  ) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={services.map((option) => option.name)}
      disableClearable
      inputValue={state.search}
      onInputChange={(_, newInputValue) => {
        dispatch({ type: "SET_SEARCH", payload: newInputValue });
      }}
      sx={{
        height: "100%",
      }}
      // @ts-ignore: Unreachable code error
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              outline: "none",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              borderRadius: "4px",
            },
          }}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchService;
