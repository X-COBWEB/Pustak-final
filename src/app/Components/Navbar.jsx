"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  // State to toggle the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            पुस्तक
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* <Link href="/login">Login</Link> */}

          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <Link href={"profile/1"}>
              <img
                className="w-8 h-8 rounded-full"
                src="data:image/jpeg;base64,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"
                alt="user photo"
              />
            </Link>
          </button>
          {/* Dropdown menu */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={toggleMenu} // Toggle menu visibility on click
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
