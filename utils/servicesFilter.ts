import { TService } from "DMH/utils/types/service.types";
import { IPayServicesState } from "DMH/utils/types/payServicesContext";

interface IApplyFilter {
  services: TService[] | [];
  state: IPayServicesState;
}

export const servicesFilter = ({ services, state }: IApplyFilter) => {
  let servicesFiltered = services;
  if (state.search !== "" && state.search !== null) {
    servicesFiltered = servicesFiltered.filter((element) => {
      return element.name.toLowerCase().includes(state.search.toLowerCase());
    });
  }
  return servicesFiltered;
};
