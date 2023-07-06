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
        className="bg-blue-900 hover:bg-blue-950 transition-all text-gray-100 rounded-md px-3 py-2 "
        href={"/products/new"}
      >
        Add new Products
      </Link>
      <h3 className="mt-1 text-[20px] text-gray-700 ">
        If You are new on our ecommerce go to, Add new products.
      </h3>
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg mt-6 ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-400"
              >
                Products Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-300 ">
            {getProducts.length > 0 ? (
              getProducts.map((i) => (
                <tr key={i?._id} className="">
                  <td className="px-6 py-3 border-r border-gray-400">
                    {i?.title}
                  </td>
                  <td className="ml-2 py-3 flex items-center gap-1 ">
                    <Link
                      className="px-2 py-1 flex items-center gap-1 shadow-md bg-blue-900 hover:bg-blue-950 text-gray-200 rounded-md transition-all focus:outline-none focus:bg-blue-800"
                      href={"/products/edit/" + i._id}
                    >
                      <FiEdit />
                      edit
                    </Link>
                    <Link
                      className="px-2 py-1 flex items-center gap-1 shadow-md bg-red-800 hover:bg-red-900 text-gray-200 rounded-md transition-all focus:outline-none focus:bg-red-800"
                      href={"/products/delete/" + i._id}
                    >
                      <MdDelete className="text-gray-200" />
                      delete
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="w-1/2 px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-500">No category found</div>
                </td>
                <td className="w-1/2 px-6 py-4 whitespace-nowrap  ">
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
