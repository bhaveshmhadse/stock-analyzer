const StockTableHeader = ({ tableHeaders }) => {
  return (
    <div className='grid w-full grid-cols-8 h-auto bg-zinc-700 lg:p-2 p-1 font-black text-gray-300 lg:rounded-lg rounded-md uppercase '>
      {tableHeaders.map(eachHeader => (
        <div  className='font flex m-auto overflow-hidden lg:py-2 p-0' key={Math.random().toString()}>
          {eachHeader}
        </div>
      ))}
    </div>
  );
};

export default StockTableHeader;
