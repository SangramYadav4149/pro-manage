const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
export const getCurrentDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = dd + `th ${months[parseInt(mm)]}, ` + yyyy;
  return today;
};
export const getMonth = (date) => {
  return months[`${date}`];
};
