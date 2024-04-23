import React, {FC} from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useActivity from "DMH/context/activity/useActivity";

interface IFilterModalProps {
    filterOptions: string[];
    filterType: "OPERATION" | "PERIOD" | "AMOUNT" | "SEARCH" | "DELETE_FILTERS";
  }

export const FilterModal:FC<IFilterModalProps> = ({ filterOptions, filterType }) => {
  const { filterInfo, dispatch } = useActivity();
  const filterTypeString = JSON.stringify(filterType).toLowerCase();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: filterType,
      payload: (event.target as HTMLInputElement).value,
    });
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup
        name="controlled-radio-buttons-group"
        // @ts-ignore: Unreachable code error
        value={filterInfo[filterTypeString]}
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        {filterOptions.map((option: string) => (
          <FormControlLabel
            key={option}
            labelPlacement="start"
            value={option}
            label={option}
            control={<Radio sx={{ color: "grey.200" }} />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginLeft: "0",
              color: "grey.200",
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FilterModal;
