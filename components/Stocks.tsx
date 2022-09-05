const Stocks = ({ getInSortedForm, stockDetails, calculateProfitOrLoss, getTotal, getFormattedDate }) => {
  return (
    <div className='flex bg-zinc-800 text-gray-200 flex-col w-full'>
      {getInSortedForm(stockDetails).map(eachStock => {
        console.log("Details inside stocks component ", stockDetails, eachStock, stockDetails[eachStock]);
        return (
          <div className='flex flex-col w-full py-4' key={Math.random().toString()}>
            {stockDetails[eachStock] && stockDetails[eachStock].map((individualStock, index) => getStockComponent(stockDetails, eachStock, index, individualStock, calculateProfitOrLoss, getTotal, getFormattedDate))}
          </div>
        );
      })}
    </div>
  );
};

const decideColour = (stockArray, stockDate, index) => {
  let date = "",
    details = "",
    total = "";

  if (stockArray[stockDate].length == 1 && index == 0) return ["", "", ""];

  if (stockArray[stockDate].length - 1 != index) total = "text-transparent";

  if (Math.round((stockArray[stockDate].length - 1) / 2) != index) {
    date = "text-transparent";
  }

  return [date, details, total];

  if (stockArray[stockDate].length == 1 && index == 0) return ["", ""];
  else if (stockArray[stockDate].length - 1 == index) return ["", ""];
  else return ["", "text-transparent"];
};

const getStockComponent = (stockArray, stockDate, index, individualStock, calculateProfitOrLoss, getTotal, getFormattedDate) => {
  let [dateDetail, otherDetail, totalDetail] = decideColour(stockArray, stockDate, index);

  const { date, nameOfStock, Qty, Buying, Selling, time } = individualStock;

  return (
    <div className='p-3 font-black grid w-full grid-cols-8 h-auto' key={Math.random().toString()}>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${dateDetail}`} key={Math.random().toString()}>
        {getFormattedDate(date)}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {nameOfStock}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {Qty}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {Buying}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${otherDetail}`} key={Math.random().toString()}>
        {Selling}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap  ${calculateProfitOrLoss(Buying, Selling).bgColour} ${otherDetail}`} key={Math.random().toString()}>
        {calculateProfitOrLoss(Buying, Selling).isProfit ? (Qty * Selling - Qty * Buying).toFixed(2) : "-"}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${calculateProfitOrLoss(Buying, Selling).bgColour} ${otherDetail}`} key={Math.random().toString()}>
        {calculateProfitOrLoss(Buying, Selling).isProfit ? "-" : (Buying * Qty - Selling * Qty).toFixed(2)}
      </div>
      <div className={`flex m-auto overflow-hidden whitespace-nowrap ${getTotal(stockDate, stockArray) >= 0 ? "text-green-500" : "text-rose-500"} ${totalDetail}`} key={Math.random().toString()}>
        {getTotal(stockDate, stockArray)}
      </div>
    </div>
  );
};

export default Stocks;
