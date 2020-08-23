//Reservation component
export const convertMomentToDate = (date) => {
  return date.toDate();
};

export const convertMomentToDateAndPlusTwoHours = (date) => {
  return new Date(date.toDate().setHours(date.toDate().getHours() + 2));
};

export const convertDateToISO = (date) => {
  return date.toISOString();
}
