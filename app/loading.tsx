

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen text-2xl font-bold text-white bg-black bg-opacity-90">
      Loading...
      <div className=" bottom-10 z-10">
        <div className="w-5 h-5 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
export default loading