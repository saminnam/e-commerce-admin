import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuUsersRound } from "react-icons/lu";
import { IoIosLaptop } from "react-icons/io";
import { GoDot } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";

const navItems = [
  {
    icon: <IoIosLaptop className="text-2xl text-gray-600 dark:text-gray-400" />,
    label: "Dashboard",
    children: [],
    link: "/dashboard",
  },
      {
    icon: (
      <LuUsersRound className="text-2xl text-gray-600 dark:text-gray-400" />
    ),
    label: "Orders",
    children: [
      { label: "Manage Orders", link: "/order-list" },
    ],
  },
  {
    icon: (
      <LuUsersRound className="text-2xl text-gray-600 dark:text-gray-400" />
    ),
    label: "Products",
    children: [
      { label: "Add Products", link: "/add-product" },
      { label: "Manage Products", link: "/product-list" },
    ],
  },
  {
    icon: (
      <LuUsersRound className="text-2xl text-gray-600 dark:text-gray-400" />
    ),
    label: "Blogs",
    children: [
      { label: "Add Blogs", link: "/add-blog" },
      { label: "Manage Blogs", link: "/blog-list" },
    ],
  },
  {
    icon: (
      <LuUsersRound className="text-2xl text-gray-600 dark:text-gray-400" />
    ),
    label: "Sellers",
    children: [
      { label: "Manage Sellers", link: "/manage-sellers" },
    ],
  },
  {
    icon: (
      <LuUsersRound className="text-2xl text-gray-600 dark:text-gray-400" />
    ),
    label: "Contacts",
    children: [
      { label: "Add Contact", link: "/add-contact" },
      { label: "Manage Enquires", link: "/manage-enquires" },
    ],
  },
  {
    icon: (
      <LuUsersRound className="text-2xl text-gray-600 dark:text-gray-400" />
    ),
    label: "System Users",
    children: [
      { label: "Add Users", link: "/add-user" },
      { label: "Manage Users", link: "/user-list" },
    ],
  },
];

const Sidebar = ({ sidebarExpanded, hoveringSidebar, setHoveringSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSiderBar, setMobileSidebar] = useState(false);

  const handleDropdownToggle = (label) => {
    if (sidebarExpanded || hoveringSidebar) {
      setOpenDropdown(openDropdown === label ? null : label);
    }
  };

  const setSidebarClose = () => {
    if (window.innerWidth <= 580) {
      setMobileSidebar(true);
    } else {
      setMobileSidebar(false);
    }
  };

  useEffect(() => {
    setSidebarClose();
    window.addEventListener("resize", setSidebarClose);
    return () => {
      window.removeEventListener("resize", setSidebarClose);
    };
  }, []);

  return (
    <div className="flex">
      <aside
        id="sidebar"
        className={`${
          sidebarExpanded || hoveringSidebar ? "w-72" : "w-16"
        } fixed top-0 left-0 h-screen z-40 transition-all duration-300 bg-white shadow border-r-2 border-[#F8F9FB] dark:bg-gray-800 dark:border-gray-700`}
        onMouseEnter={() => !sidebarExpanded && setHoveringSidebar(true)}
        onMouseLeave={() => setHoveringSidebar(false)}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
              }
              alt="Logo-Gold"
              className="h-6"
            />
            {(sidebarExpanded || hoveringSidebar) && (
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                Invoice System
              </span>
            )}
          </div>
        </div>
        <nav className="mt-5 px-2 text-[14px]">
          <ul className="flex flex-col gap-2 max-w-[280px] mx-auto">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.link}
                  className="flex items-center justify-between gap-2 rounded transition-all duration-300 hover:bg-amber-100 dark:hover:bg-white p-2 font-medium hover:cursor-pointer dark:hover:text-gray-800 text-gray-700 dark:text-gray-200"
                  onClick={() => handleDropdownToggle(item.label)}
                >
                  <span className="flex gap-3 items-center">
                    {item.icon}
                    {(sidebarExpanded || hoveringSidebar) && (
                      <span className="whitespace-nowrap">{item.label}</span>
                    )}
                  </span>
                  {item.children.length > 0 &&
                    (sidebarExpanded || hoveringSidebar) && (
                      <MdKeyboardArrowRight
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                          openDropdown === item.label ? "rotate-90" : ""
                        }`}
                      />
                    )}
                </Link>
                <ul
                  className={`flex flex-col pl-6 pr-2 my-1 overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      openDropdown === item.label &&
                      (sidebarExpanded || hoveringSidebar)
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                >
                  {item.children.map((child) => (
                    <li
                      key={child.label}
                      className="flex font-semibold items-center p-2 gap-2 rounded transition-all duration-300 hover:bg-amber-100 dark:hover:bg-white text-gray-700 dark:hover:text-gray-800 dark:text-gray-200"
                    >
                      <GoDot className="text-sm text-gray-500 dark:text-gray-400" />
                      <Link
                        to={child.link}
                        className="whitespace-nowrap w-full"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
