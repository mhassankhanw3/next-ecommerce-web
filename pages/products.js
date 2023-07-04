import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

export default function Products() {
  const [getProducts, setGetProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setGetProducts(response.data, "response");
    });
  }, []);
  return (
    <Layout>
      <Link
        className="bg-blue-900 hover:bg-blue-950 transition-all text-gray-100 rounded-md px-3 py-2 "
        href={"/products/new"}
      >
        Add new Products
      </Link>
      <h3 className="mt-1 text-[20px] text-gray-700 ">
        If You are new on our ecommerce go to, Add new products.
      </h3>
      {getProducts.length > 0 && (
        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg mt-6 ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Products Name
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-300 ">
              {getProducts.map((i) => (
                <tr key={i?._id} className="">
                  <td className="px-6 py-3 border-r border-gray-400">
                    {i?.title}
                  </td>
                  <td className="ml-2 py-3 flex items-center gap-1 ">
                    <Link
                      className="flex items-center rounded-md text-gray-200 py-1 px-3 bg-gray-600 hover:bg-gray-700 transition-all "
                      href={"/products/edit/" + i._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      edit
                    </Link>
                    <Link
                      className="flex items-center rounded-md bg-red-800 hover:bg-red-900 transition-all py-1 px-3 text-gray-200 cursor-pointer "
                      href={"/products/delete/" + i._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      delte
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
