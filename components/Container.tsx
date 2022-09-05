import { useEffect, useState } from "react";

import Stocks from "./Stocks";
import StockModal from "./StockModal";
import DeleteAllButton from "./DeleteAllButton";
import StockTableHeader from "./StockTableHeader";
import AddNewStockButton from "./AddNewStockButton";

import { headers, stocksArray } from "./Data";
import { addToLocalStorage, getFormattedDate, getFromLocalStorage, getInSortedForm, getTotal } from "../utils/Helper";

const Container = ({}) => {
  let [showDetails, setshowDetails] = useState(false);
  let [tableHeaders, settableHeaders] = useState(headers);
  let [stockDetails, setstockDetails] = useState(stocksArray);
  let [stockBuySellDetails, setstockBuySellDetails] = useState({ date: undefined, time: "", nameOfStock: "", Qty: 0, Buying: 0, Selling: 0 });

  const handleChange = (e: any) => setstockBuySellDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const addDetails = () => {
    if (showDetails) return setshowDetails(false);
    return setshowDetails(true);
  };

  const calculateProfitOrLoss = (buy: number, sell: number) => {
    return {
      isProfit: sell >= buy,
      bgColour: buy > sell ? "text-rose-500" : "text-green-500",
    };
  };

  const addStock = async () => {
    setshowDetails(false);
    let newObject;

    if (!stockBuySellDetails) return;
    if (!(stockBuySellDetails.date in stockDetails)) {
      newObject = { ...stockDetails, [stockBuySellDetails.date]: [{ ...stockBuySellDetails, timeOfBuying: new Date().toLocaleTimeString }] };
      setstockDetails(await newObject);
    } else {
      newObject = { ...stockDetails, [stockBuySellDetails.date]: [...stockDetails[stockBuySellDetails.date], { ...stockBuySellDetails, timeOfBuying: new Date().toLocaleTimeString }] };
      setstockDetails(await newObject);
    }
    addToLocalStorage("stockArray", newObject);
  };

  useEffect(() => {
    setstockDetails(getFromLocalStorage("stockArray") || stocksArray);
  }, []);

  return (
    <div className='w-full bg-zinc-800 py-2 px-2 lg:p-4 h-auto'>
      <div className='flex items-center justify-center flex-col w-full h-auto'>
        <StockTableHeader tableHeaders={tableHeaders} />
        <Stocks getFormattedDate={getFormattedDate} getInSortedForm={getInSortedForm} getTotal={getTotal} calculateProfitOrLoss={calculateProfitOrLoss} stockDetails={stockDetails} setstockDetails={setstockDetails} />
        <StockModal 
        stockBuySellDetails={stockBuySellDetails}
        
        showDetails={showDetails} setshowDetails={setshowDetails} addStock={addStock} handleChange={handleChange} />
        <AddNewStockButton addDetails={addDetails} />
        <DeleteAllButton />
      </div>
    </div>
  );
};

export default Container;
