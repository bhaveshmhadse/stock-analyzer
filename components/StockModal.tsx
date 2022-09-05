const StockModal = ({ showDetails, setshowDetails, addStock, handleChange }) => {
  return (
    <div>
      {showDetails && (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-zinc-800/80 w-full h-full flex items-center justify-center z-10'>
          <div className='flex flex-col bg-zinc-700 rounded-lg p-4 lg:w-2/4 w-5/6 z-30'>
            <input onChange={handleChange} name={"date"} className='font flex p-2 rounded-md my-1 bg-zinc-600 text-gray-400 font-bold w-full' type='date'value="2022-08-05" placeholder='Date' alt='Baray' />
            <input onChange={handleChange} name={"nameOfStock"} className='font flex p-2 rounded-md my-1 bg-zinc-600 text-gray-400 font-bold' type='text' placeholder='Name Of Options' />
            <div className='flex w-full my-1'>
              <input onChange={handleChange} name={"Qty"} className='font w-2/4 mr-3 flex p-2 rounded-md bg-zinc-600 text-gray-400 font-bold' type='text' placeholder='Qty' />
              <input onChange={handleChange} name={"Buying"} className='font w-full flex p-2 rounded-md  bg-zinc-600 text-gray-400 font-bold' type='text' placeholder='Buying Price' />
            </div>
            <input onChange={handleChange} name={"Selling"} className='font flex p-2 rounded-md my-1 bg-zinc-600 text-gray-400 font-bold' type='text' placeholder='Selling Price' />
            <div className='w-full flex '>
              <button onClick={() => setshowDetails(false)} className='font w-full mt-2 text-red-400 rounded-lg py-2 font-extrabold lg:text-lg text-base uppercase left-0'>
                Cancel
              </button>
              <button className='w-full mt-2 text-green-400 rounded-lg py-2 font-extrabold lg:text-lg text-base uppercase ml-auto' onClick={addStock}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockModal;
