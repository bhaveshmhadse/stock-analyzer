import { addToLocalStorage, convertToRupees, getBeautifiedJSONString } from "../utils/Helper";

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

const removeAStock = (stockArray, setStockArray, stockDate, buyingPrice, sellingPrice, timeOfBuying) => {
  const newArr = stockArray[stockDate].filter(eachObj => eachObj.timeOfBuying != timeOfBuying && eachObj.Buying != buyingPrice && eachObj.Selling != sellingPrice);
  const objectToDelete = stockArray[stockDate].find(eachObj => eachObj.timeOfBuying == timeOfBuying);
  const answer = confirm(`Do you want to delete this stock?\n\n${getBeautifiedJSONString(objectToDelete)}`);

  let newObj = { ...stockArray, [stockDate]: newArr };
  if (answer) {
    setStockArray(newObj);
    addToLocalStorage("stockArray", newObj);
  }
};

const handleValueChange = (stockArray, setStockArray, stockDate, buyingPrice, sellingPrice, timeOfBuying, valueToUpdate) => {
  const newArr = stockArray[stockDate].filter(eachObj => eachObj.timeOfBuying != timeOfBuying && eachObj.Buying != buyingPrice && eachObj.Selling != sellingPrice);
  const objectToUpdate = stockArray[stockDate].find(eachObj => eachObj.timeOfBuying == timeOfBuying && eachObj.Buying == buyingPrice && eachObj.Selling == sellingPrice);

  let value = prompt("Enter the value");

  if (!value) return;

  if (valueToUpdate == 1) objectToUpdate.Qty = parseFloat(value);
  if (valueToUpdate == 2) objectToUpdate.Buying = parseFloat(value);
  if (valueToUpdate == 3) objectToUpdate.Selling = parseFloat(value);

  let newObject = { ...stockArray, [stockDate]: [...newArr, objectToUpdate] };

  setStockArray(newObject);
  addToLocalStorage("stockArray", newObject);
};

const getStockComponent = (stockArray, stockDate, index, individualStock, calculateProfitOrLoss, getTotal, getFormattedDate, setstockArray) => {
  const { date, nameOfStock, Qty, Buying, Selling, timeOfBuying } = individualStock;
  const [dateDetail, otherDetail, totalDetail] = decideColour(stockArray, stockDate, index);

  return (
    <div className='py-3 px-0 font-black grid w-full grid-cols-8 h-auto text-center' key={Math.random().toString()}>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap text-left ${dateDetail}`} key={Math.random().toString()}>
        {getFormattedDate(date)}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden  ${otherDetail} select-text`} key={Math.random().toString()}>
        {nameOfStock}
      </div>
      <div onClick={() => handleValueChange(stockArray, setstockArray, stockDate, Buying, Selling, timeOfBuying, 1)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {parseInt(Qty)}
      </div>
      <div onClick={() => handleValueChange(stockArray, setstockArray, stockDate, Buying, Selling, timeOfBuying, 2)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {parseFloat(Buying).toFixed(2)}
      </div>
      <div onClick={() => handleValueChange(stockArray, setstockArray, stockDate, Buying, Selling, timeOfBuying, 3)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {parseFloat(Selling).toFixed(2)}
      </div>
      <div onClick={() => removeAStock(stockArray, setstockArray, stockDate, Buying, Selling, timeOfBuying)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap  ${calculateProfitOrLoss(Buying, Selling).bgColour} ${otherDetail}`} key={Math.random().toString()}>
        {calculateProfitOrLoss(Buying, Selling).isProfit ? convertToRupees((Qty * Selling - Qty * Buying).toFixed(2)) : "-"}
      </div>
      <div onClick={() => removeAStock(stockArray, setstockArray, stockDate, Buying, Selling, timeOfBuying)} className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${calculateProfitOrLoss(Buying, Selling).bgColour} ${otherDetail}`} key={Math.random().toString()}>
        {calculateProfitOrLoss(Buying, Selling).isProfit ? "-" : convertToRupees((Qty * Selling - Qty * Buying).toFixed(2))}
      </div>
      <div className={`flex fontSmaller m-auto overflow-hidden whitespace-nowrap ${getTotal(stockDate, stockArray) >= 0 ? "text-green-500" : "text-rose-500"} ${totalDetail}`} key={Math.random().toString()}>
        {convertToRupees(getTotal(stockDate, stockArray))}
      </div>
    </div>
  );
};

export default Stocks;
