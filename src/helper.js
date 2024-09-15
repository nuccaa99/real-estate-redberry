// form validation helper

export const SELECTION_TYPES = {
  REGION: 'region',
  CITY: 'city',
  AGENT: 'agent',
};

const NUMBERREGEX = /^\d+$/;
const DECIMALREGEX = /^[0-9.,]+$/;

export const validationRules = {
  address: (value) => value.length >= 2,
  zip_code: (value) => NUMBERREGEX.test(value),
  description: (value) => value.trim().split(/\s+/).length >= 5,
  bedrooms: (value) => NUMBERREGEX.test(value),
  price: (value) => DECIMALREGEX.test(value),
  area: (value) => DECIMALREGEX.test(value),
};
