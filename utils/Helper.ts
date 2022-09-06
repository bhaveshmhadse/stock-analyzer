import Moment from "moment";

const getFormattedDate = date => Moment(date).format("DD-MM-YYYY");
const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));
const addToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getInSortedForm = largeObject => Object.keys(largeObject).sort((a: any, b: any) => a - b);
const getArrayOfObjectInSortedForm = (arrayOfObject, sortBasedOnProperty) => arrayOfObject.sort((a, b) => a[sortBasedOnProperty] - b[sortBasedOnProperty]);

const getTotal = (date, stockDetails) => {
  let total = 0;

  for (let stock of stockDetails[date]) {
    let { Buying, Selling, Qty } = stock;
    if (Buying > Selling) {
      total -= Buying * Qty - Selling * Qty;
    } else if (Selling > Buying) {
      total += Selling * Qty - Buying * Qty;
    }
  }

  return total;
};

const convertToRupees = amount => {
  return parseInt(parseInt(amount).toFixed(2)).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

const getBeautifiedJSONString = object => {
  let string = "";

  for (let [key, value] of Object.entries(object)) {
    string = string + key.toUpperCase() + " :   " + value + "\n";
  }
  return string;
};

export { getFormattedDate, getInSortedForm, getTotal, convertToRupees, addToLocalStorage, getFromLocalStorage, getBeautifiedJSONString, getArrayOfObjectInSortedForm };
