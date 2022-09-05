import Moment from "moment";

const getFormattedDate = date => Moment(date).format("DD-MM-YYYY");
const getInSortedForm = largeObject => Object.keys(largeObject).sort((a: any, b: any) => a - b);

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

export { getFormattedDate, getInSortedForm, getTotal };
