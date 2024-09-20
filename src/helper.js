// form validation helper

export const SELECTION_TYPES = {
  REGION: 'region',
  CITY: 'city',
  AGENT: 'agent',
};

const NUMBERREGEX = /^\d+$/;
const DECIMALREGEX = /^[0-9.,]+$/;
const EMAILREGEX = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
const STARTS_WITH_5_REGEX = /^5[0-9]*$/;

export const validationRules = {
  address: (value) => value.length >= 2,
  name: (value) => value.length >= 2,
  surname: (value) => value.length >= 2,
  email: (value) => EMAILREGEX.test(value),
  phone: (value) => STARTS_WITH_5_REGEX.test(value),
  zip_code: (value) => NUMBERREGEX.test(value),
  description: (value) => value.trim().split(/\s+/).length >= 5,
  bedrooms: (value) => NUMBERREGEX.test(value),
  price: (value) => DECIMALREGEX.test(value),
  area: (value) => DECIMALREGEX.test(value),
  is_rental: (value) => value.length >= 1,
};
