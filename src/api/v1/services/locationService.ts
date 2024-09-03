import { errorHandler } from "@/utils/errors";
import { Country, City, State } from "country-state-city";

export const getCountries = async () => {
  try {
    const countries = Country.getAllCountries();
    const data = countries.map((country) => ({
      value: country.isoCode,
      displayValue: country.name
    }));
    return data;
  } catch(e) {
    throw errorHandler(e);
  };
};

export const getCities = async (country: string, state: string) => {
  try {
    const cities = City.getCitiesOfState(country, state)
    const data = cities.map((city) => ({
      value: city.name,
      displayValue: city.name
    }));
    return data
  } catch(e) {
    throw errorHandler(e);
  };
};

export const getStates = async (country: string) => {
  try {
    const states = State.getStatesOfCountry(country);
    const data = states.map((state) => ({
      value: state.isoCode,
      displayValue: state.name
    }));
    return data;
  } catch(e) {
    throw errorHandler(e);
  };
};
