const StockTableHeader = ({ tableHeaders }) => {
  return (
    <div className='grid w-full grid-cols-8 h-auto bg-zinc-700 p-2 font-black text-gray-400 rounded-lg uppercase '>
      {tableHeaders.map(eachHeader => (
        <div className='flex m-auto overflow-hidden py-4' key={Math.random().toString()}>
          {eachHeader}
        </div>
      ))}
    </div>
  );
};

export default StockTableHeader;
