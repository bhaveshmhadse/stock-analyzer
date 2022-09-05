const DeleteAllButton = () => {
  const handleDelete = () => {
    let ansOne = confirm("Are you sure you want to delete all the data?");
    let ansTwo = confirm("Are you really sure??");

    if (ansOne && ansTwo) localStorage.clear();
    window.location.reload();
  };
  return (
    <div className='fixed bottom-0 left-0 m-8'>
      <button onClick={handleDelete} className='font-bold text-red-500 bg-transparent text-lg lg:text-4xl px-6 lg:px-8 py-1 rounded-lg  animate-pulse'>
        -
      </button>
    </div>
  );
};

export default DeleteAllButton;
