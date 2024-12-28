import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiSearch, FiHome, FiHeart, FiMessageCircle, FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex flex-col bg-white border-r border-gray-200 h-screen w-48 fixed left-0 top-0 py-4">
        <div className="flex flex-col  space-y-6 ">
          <div className="flex"><FaInstagram className="text-pink-500 text-4xl" /><p className="text-3xl ml-2">Instagram</p></div>
          <div className="flex text-gray-600 cursor-pointer hover:text-gray-800"><FiHome className="text-2xl " /><p className="text-xl ml-2">Home</p></div>
          <div className="flex text-gray-600 cursor-pointer hover:text-gray-800"><FiSearch className="text-2xl " /><p className="text-xl ml-2">Search</p></div>
          <div className="flex text-gray-600 cursor-pointer hover:text-gray-800"><FiMessageCircle className="text-2xl " /><p className="text-xl ml-2">Messages</p></div>
          <div className="flex text-gray-600 cursor-pointer hover:text-gray-800"><FiHeart className="text-2xl " /><p className="text-xl ml-2">Posts</p></div>
          <div className="flex text-gray-600 cursor-pointer hover:text-gray-800"><FiUser className="text-2xl " /><p className="text-xl ml-2">Profile</p></div>
          <footer className="fixed bottom-0 pb-10"><div className="flex text-gray-600 cursor-pointer hover:text-gray-800"><FiLogOut className="text-2xl "/><p className="text-2l ml-2">Logout</p></div></footer>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-between items-center px-4 py-2">
        <FiHome className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
        <FiSearch className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
        <FiHeart className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
        <FiUser className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
      </nav>

      {/* Top Section for Mobile */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 flex justify-between items-center px-4 py-2">
        <FaInstagram className="text-pink-500 text-2xl" />
        <FiMessageCircle className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-20 mt-16 md:mt-0 p-4">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Navbar;
