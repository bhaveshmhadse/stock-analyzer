import { addToLocalStorage, convertToRupees } from "../utils/Helper";

const Stocks = ({ getInSortedForm, stockDetails, setstockDetails, calculateProfitOrLoss, getTotal, getFormattedDate }) => {
  return (
    <div className='flex bg-zinc-800 text-gray-400 flex-col w-full'>
      {getInSortedForm(stockDetails).map(eachStock => {
        return (
          <div className='flex flex-col w-full py-4' key={Math.random().toString()}>
            {stockDetails[eachStock] && stockDetails[eachStock].map((individualStock, index) => getStockComponent(stockDetails, eachStock, index, individualStock, calculateProfitOrLoss, getTotal, getFormattedDate, setstockDetails))}
          </div>
        );
      })}
    </div>
  );
};

const decideColour = (stockArray, stockDate, index) => {
  let [date, details, total] = ["", "", ""];

  if (stockArray[stockDate].length == 1 && index == 0) return ["", "", ""];
  if (stockArray[stockDate].length - 1 != index) total = "text-transparent";
  if (Math.round((stockArray[stockDate].length - 1) / 2) != index) date = "text-transparent";

  return [date, details, total];
};

const removeAStock = (stockArray, setStockArray, stockDate, buyingPrice, sellingPrice, quantity, nameOfStock, timeOfBuying) => {
  const newArr = stockArray[stockDate].filter(eachObj => eachObj.timeOfBuying != timeOfBuying && eachObj.Buying != buyingPrice && eachObj.Selling != sellingPrice);
  const answer = confirm(`Do you want to delete this stock?\n\n${getString({ nameOfStock, buyingPrice, sellingPrice, quantity })}`);
  if (answer) {
    setStockArray(prev => ({ ...prev, [stockDate]: newArr }));
  }
};

const getString = object => {
  let string = "";

  for (let [key, value] of Object.entries(object)) {
    string = string + key.toUpperCase() + " :   " + value + "\n";
  }
  return string;
};

const getStockComponent = (stockArray, stockDate, index, individualStock, calculateProfitOrLoss, getTotal, getFormattedDate, setstockArray) => {
  let [dateDetail, otherDetail, totalDetail] = decideColour(stockArray, stockDate, index);

  const { date, nameOfStock, Qty, Buying, Selling, timeOfBuying } = individualStock;

  return (
    <div className='py-3 px-0 font-black grid w-full grid-cols-8 h-auto text-center' key={Math.random().toString()}>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap text-left ${dateDetail}`} key={Math.random().toString()}>
        {getFormattedDate(date)}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden  ${otherDetail}`} key={Math.random().toString()}>
        {nameOfStock}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {Qty}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {Buying}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {Selling}
      </div>
      <div onClick={() => removeAStock(stockArray, setstockArray, stockDate, Buying, Selling, Qty, nameOfStock, timeOfBuying)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap  ${calculateProfitOrLoss(Buying, Selling).bgColour} ${otherDetail}`} key={Math.random().toString()}>
        {calculateProfitOrLoss(Buying, Selling).isProfit ? convertToRupees((Qty * Selling - Qty * Buying).toFixed(2)) : "-"}
      </div>
      <div onClick={() => removeAStock(stockArray, setstockArray, stockDate, Buying, Selling, Qty, nameOfStock, timeOfBuying)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${calculateProfitOrLoss(Buying, Selling).bgColour} ${otherDetail}`} key={Math.random().toString()}>
        {calculateProfitOrLoss(Buying, Selling).isProfit ? "-" : convertToRupees((Qty * Selling - Qty * Buying).toFixed(2))}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${getTotal(stockDate, stockArray) >= 0 ? "text-green-500" : "text-rose-500"} ${totalDetail}`} key={Math.random().toString()}>
        {convertToRupees(getTotal(stockDate, stockArray))}
      </div>
    </div>
  );
};

export default Stocks;
