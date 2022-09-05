const AddNewStockButton = ({addDetails}) => {
  return (
    <div className='fixed bottom-0 right-0 m-8'>
      <button onClick={addDetails} className='bg-teal-500 font-bold lg:text-4xl text-lg px-8 lg:px-10 py-1 rounded-lg shadow-lg animate-bounce'>
        +
      </button>
    </div>
  );
};

export default AddNewStockButton;
