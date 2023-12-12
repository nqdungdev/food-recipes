import { FaSearch } from "react-icons/fa";

function TopSect() {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 flex items-center justify-between bg-primary h-20 px-10 z-10">
        <div className="flex justify-center items-center">
          <div className="mx-3 w-10 h-10 rounded-full bg-[#555] shadow-xl overflow-hidden">
            {/* <img src="/static/media/user.e51fca9d2823797c58f5.png" alt="user" /> */}
          </div>
          <p className="text-sm text-textColor font-semibold">Welcome👋</p>
        </div>
        <div className="w-[300px] h-11 relative">
          <input
            className="bg-primary/70 rounded-md border-none text-textColor/70 text-base h-full outline-none px-10 w-full"
            type="text"
            placeholder="Search food..."
          />
          <FaSearch className="absolute text-textColor/70 left-4 top-4 text-lg w-4 h-4 text-center text-black focus:outline-none" />
        </div>
      </div>
    </>
  );
}

export default TopSect;
