import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({pageName}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <Link to={'/dashboard'}>
          <div className="flex items-center">
            {/* <span className="mx-2.5 text-gray-800 ">/</span> */}
            <div
              className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2"
            >
              Dashboard
            </div>
          </div>
        </Link>
        <Link aria-current="page" to= {`/${pageName}`}>
          <div className="flex items-center">
            <span className="text-gray-800 ">/</span>
            <span className="ml-1 capitalize text-sm font-medium text-gray-800 hover:underline md:ml-2">
              {pageName}
            </span>
          </div>
        </Link>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
