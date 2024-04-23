import { Stack, Typography } from "@mui/material";
import useActivity from "DMH/context/activity/useActivity";
import { FilterTag } from "DMH/components/activity/FilterTag";
import CancelIcon from "@mui/icons-material/Cancel";

const FilterTagList = () => {
  const { filterInfo, dispatch } = useActivity();
  const handleClick = (
    filterType: "OPERATION" | "PERIOD" | "AMOUNT" | "SEARCH" | "DELETE_FILTERS"
  ) => {
    dispatch({
      type: filterType,
      payload: "",
    });
  };
  return (
    <Stack direction="row" alignItems="center" sx={{ pb: "8px", pt: "4px" }}>
      <Typography component="h6" variant="h6">
        Filtros aplicados:
      </Typography>
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        {filterInfo.search && (
          <FilterTag onClick={() => handleClick("SEARCH")}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ gap: "8px" }}
            >
              {filterInfo.search}
              <CancelIcon fontSize="small" />
            </Stack>
          </FilterTag>
        )}
        {filterInfo.operation && (
          <FilterTag onClick={() => handleClick("OPERATION")}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ gap: "8px" }}
            >
              {filterInfo.operation}
              <CancelIcon fontSize="small" />
            </Stack>
          </FilterTag>
        )}
        {filterInfo.period && (
          <FilterTag onClick={() => handleClick("PERIOD")}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ gap: "8px" }}
            >
              {filterInfo.period}
              <CancelIcon fontSize="small" />
            </Stack>
          </FilterTag>
        )}
        {filterInfo.amount && (
          <FilterTag onClick={() => handleClick("AMOUNT")}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ gap: "8px" }}
            >
              {filterInfo.amount}
              <CancelIcon fontSize="small" />
            </Stack>
          </FilterTag>
        )}
      </Stack>
    </Stack>
  );
};

export default FilterTagList;
