import { useEffect, useState } from "react";

import Stocks from "./Stocks";
import StockModal from "./StockModal";
import StockTableHeader from "./StockTableHeader";
import AddNewStockButton from "./AddNewStockButton";

import { headers, stocksArray } from "./Data";
import { getFormattedDate, getInSortedForm, getTotal } from "../utils/Helper";
import DeleteAllButton from "./DeleteAllButton";

const Container = ({}) => {
  let [showDetails, setshowDetails] = useState(false);
  let [tableHeaders, settableHeaders] = useState(headers);
  let [stockDetails, setstockDetails] = useState(stocksArray);
  let [stockBuySellDetails, setstockBuySellDetails] = useState({ date: "", time: "", nameOfStock: "", Qty: 0, Buying: 0, Selling: 0 });

  const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));
  const addToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
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
      newObject = { ...stockDetails, [stockBuySellDetails.date]: [stockBuySellDetails] };
      setstockDetails(await newObject);
    } else {
      newObject = { ...stockDetails, [stockBuySellDetails.date]: [...stockDetails[stockBuySellDetails.date], stockBuySellDetails] };
      setstockDetails(await newObject);
    }
    // addToLocalStorage("stockArray", stockDetails);

    addToLocalStorage("stockArray", newObject);
  };

  useEffect(() => {
    setstockDetails(getFromLocalStorage("stockArray") || stocksArray);
  }, []);

  return (
    <div className='w-full bg-zinc-800 p-4 h-auto'>
      <div className='flex items-center justify-center flex-col w-full h-auto'>
        <StockTableHeader tableHeaders={tableHeaders} />
        <Stocks getFormattedDate={getFormattedDate} getInSortedForm={getInSortedForm} getTotal={getTotal} calculateProfitOrLoss={calculateProfitOrLoss} stockDetails={stockDetails} />
        <StockModal showDetails={showDetails} setshowDetails={setshowDetails} addStock={addStock} handleChange={handleChange} />
        <AddNewStockButton addDetails={addDetails} />
        <DeleteAllButton/>
      </div>
    </div>
  );
};

export default Container;
