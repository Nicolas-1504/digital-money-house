import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Button, Stack } from "@mui/material";
import FilterModal from "DMH/components/activity/FilterModal";
import useActivity from "DMH/context/activity/useActivity";

interface IVerticalTabsProps {
  setModal: (value: boolean) => void;
}

export default function VerticalTabs({ setModal }: IVerticalTabsProps) {
  const [value, setValue] = React.useState(0);
  const { dispatch } = useActivity();
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteFilters = () => {
    dispatch({ type: "DELETE_FILTERS" });
    setModal(false);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "grey.600",
          display: "flex",
          width: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChangeTabs}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "grey.400", width: "60%" }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Operación"
            {...a11yProps(0)}
            sx={{
              width: "100%",
              alignItems: "flex-start",
              fontWeight: "600",
              color: "grey.200",
            }}
          />
          <Tab
            label="Período"
            {...a11yProps(1)}
            sx={{
              width: "100%",
              alignItems: "flex-start",
              fontWeight: "600",
              color: "grey.200",
            }}
          />
          <Tab
            label="Monto"
            {...a11yProps(2)}
            sx={{
              width: "100%",
              alignItems: "flex-start",
              fontWeight: "600",
              color: "grey.200",
            }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FilterModal
            filterOptions={operationOptions}
            filterType="OPERATION"
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FilterModal filterOptions={periodOptions} filterType="PERIOD" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FilterModal filterOptions={amountOptions} filterType="AMOUNT" />
        </TabPanel>
      </Box>
      <Stack direction="row" spacing={3} sx={{ marginTop: "32px" }}>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          onClick={handleDeleteFilters}
        >
          Borrar filtros
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setModal(false);
          }}
        >
          Aplicar filtros
        </Button>
      </Stack>
    </>
  );
}

const operationOptions = ["Ingresos", "Egresos"];

const periodOptions = [
  "Hoy",
  "Ayer",
  "Última semana",
  "Últimos 15 días",
  "Último mes",
  "Último año",
];

const amountOptions = [
  "$0 a $999",
  "$1000 a $4999",
  "$5000 a $19999",
  "$20000 a $99999",
  "$100000 o superior",
];
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ paddingLeft: 3, width: "100%" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
