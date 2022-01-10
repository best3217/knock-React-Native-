import * as yup from "yup";
import { EPropertyType } from "../types";

export const addPropertyValidationSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(
      [
        EPropertyType.CONDO,
        EPropertyType.COMMERCIAL,
        EPropertyType.DUPLEX,
        EPropertyType.TOWNHOUSE,
        EPropertyType.SINGLE_FAMILY_HOUSE
      ],
      "Invalid property type"
    )
    .required("Property type is required"),
  parcel_number: yup.string().default(''),
  address1: yup.string().required("Address 1 is required"),
  address2: yup.string().default(""),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip is required"),
  area_lot_sf: yup.number().default(0),
  area_building_sf: yup.number().default(0),
  num_beds: yup.number().default(0),
  num_bath: yup.number().default(0),
  tax_value: yup.number().default(0),
  market_value: yup.number().default(0),
  year_built: yup.number().default(0),
  files:yup.array().default([]),
  lists:yup.array().default([]),
  is_owner: yup.number(),
});

export const editPropertyValidationSchema = yup.object().shape({
  address1: yup.string().required("Address 1 is required"),
  address2: yup.string().default(""),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip is required"),
  area_lot_sf: yup.number().default(0),
  area_building_sf: yup.number().default(0),
  market_value: yup.number().default(0)
});
