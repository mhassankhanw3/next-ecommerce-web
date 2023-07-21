import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Orders() {
  const [ordersRes, setOrderRes] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrderRes(response.data);
      console.log("response.data", response.data[0].line_items);
    });
  }, []);

  return (
    <Layout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>
        <div className="bg-white shadow-lg overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-700">
              <tr>
                <th
                  scope="col"
                  className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-300"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-300"
                >
                  RECIPIENT
                </th>
                <th
                  scope="col"
                  className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-300"
                >
                  EMAIL
                </th>
                <th
                  scope="col"
                  className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  PRODUCTS
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersRes.length > 0 ? (
                ordersRes.map((order) => (
                  <tr key={order._id}>
                    <td className="border p-2">{order._id}</td>
                    <td className="border p-2">
                      <div className="font-bold text-gray-600">
                        {order.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.country ? order.country + ", " : "---, "}
                        {order.city ? order.city + ", " : "---, "}
                        {order.streetAddress
                          ? order.streetAddress + ", "
                          : "---, "}
                        {order.postalCode ? order.postalCode + ", " : "---, "}
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="text-sm text-blue-600">{order.email}</div>
                    </td>
                    <td className="border p-2">
                      {order?.line_items?.map((l) => (
                        <div key={l._id}>
                          <>
                            {l.price_data?.product_data.name} x {l.quantity}
                          </>
                        </div>
                      ))}
                      {/* <ul className="list-disc list-inside">
                      </ul> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border p-2">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
