import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Spin } from "antd";

export default function Products() {
  const [getProducts, setGetProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/products").then((response) => {
      setGetProducts(response.data, "response");
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <Link
        className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all text-gray-200 rounded-md px-3 py-2"
        href={"/products/new"}
      >
        Add new Products
      </Link>
      <h3 className="mt-2 text-[16px] text-gray-600 md:text-xl">
        If you are new to our ecommerce site, go to &quot;Add new
        products&quot;.
      </h3>
      <div className="bg-white shadow-lg overflow-hidden rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-300">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-300">
            {getProducts.length > 0 ? (
              getProducts.map((i) => (
                <tr key={i?._id} className="">
                  <td className="px-6 py-3 border-r border-gray-300">
                    {i?.title}
                  </td>
                  <td className="px-2 py-3 flex flex-wrap md:flex-nowrap md:justify-normal justify-center items-center gap-1">
                    <Link
                      className="px-2 py-1 flex items-center justify-center gap-1 shadow-md bg-indigo-200 hover:bg-indigo-300 text-indigo-600 rounded-md transition-all focus:outline-none focus:bg-indigo-200 w-full md:w-auto"
                      href={"/products/edit/" + i._id}
                    >
                      <FiEdit />
                      Edit
                    </Link>
                    <Link
                      className="px-2 py-1 flex items-center justify-center gap-1 shadow-md bg-red-200 hover:bg-red-300 text-red-700 rounded-md transition-all focus:outline-none focus:bg-red-200 w-full md:w-auto"
                      href={"/products/delete/" + i._id}
                    >
                      <MdDelete className="text-red-500" />
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="w-1/2 px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-500">No category found</div>
                </td>
                <td className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">---</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {loading && (
        <Spin
          size="large"
          className="text-center flex items-center justify-center p-10"
        />
      )}
    </Layout>
  );
}
