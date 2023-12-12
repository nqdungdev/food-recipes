import "../styles/sidebar.css";
// import logo from "../img/prime-logo.png";
import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp, IoRestaurant } from "react-icons/io5";
import { IoIosHelpCircle, IoMdInformationCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

const SideBar = () => {
  return (
    <header className="fixed w-24 h-full flex flex-col items-center top-0 left-0 bg-primary/70 z-10">
      {/* <img src={logo} alt="logo" /> */}
      <div className="top-menu">
        <div className="side-icon">
          <Link href="/">
            <MdDashboard title="Order" />
          </Link>
        </div>
        <div className="side-icon">
          <Link href="/chat">
            <IoChatbubbleEllipsesSharp title="Chat with sales rep" />
          </Link>
        </div>
        <div className="side-icon">
          <Link href="/comingsoon">
            <IoRestaurant title="Book a seat" />
          </Link>
        </div>
        <div className="side-icon">
          <Link href="/help">
            <IoIosHelpCircle title="FAQs" />
          </Link>
        </div>
        <div className="side-icon">
          <Link href="/about">
            <IoMdInformationCircle title="About" />
          </Link>
        </div>
        <div className="side-icon">
          <Link href="/profile">
            <FaUser title="Your Profile" />
          </Link>
        </div>
        <div className="side-icon">
          <Link href="/settings">
            <FaCog title="Settings" />
          </Link>
        </div>
      </div>

      <div className="bottom-menu">
        <Link href="/">
          <FaSignOutAlt title="Logout" />
        </Link>
      </div>
    </header>
  );
};

export default SideBar;
