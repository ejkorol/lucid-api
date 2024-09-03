import { Request, Response, NextFunction } from "express";

import {
  getCountries as getCountriesService,
  getCities as getCitiesService,
  getStates as getStatesService
} from "../services/locationService";

export const getCountries = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const countries = await getCountriesService();
    res.json(countries);
  } catch(e) {
    next(e);
  };
};

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { country, state } = req.params;
    const cities = await getCitiesService(country, state);
    res.json(cities);
  } catch(e) {
    next(e);
  };
};

export const getStates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { country } = req.params;
    const states = await getStatesService(country);
    res.json(states);
  } catch(e) {
    next(e);
  };
};
