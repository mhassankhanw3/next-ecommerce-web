import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

export default function categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    axios.get("/api/category").then((res) => {
      setCategories(res.data, "category res");
    });
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    const data = { categoryName, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/category", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/category", data);
    }
    setCategoryName("");
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category?.categoryName);
    setParentCategory(category?.parentCategory?._id);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <label className="block mb-2">
        {editedCategory ? (
          <span>
            Edit category:
            <span className="font-medium text-[22px] ml-2 text-blue-600 ">
              "{editedCategory?.categoryName}"
            </span>
          </span>
        ) : (
          "Create New Category:"
        )}
      </label>
      <form onSubmit={saveCategory} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-0 focus:outline-none focus:border-blue-800"
        />
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="max-w-full sm:w-[600px] border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-800"
        >
          <option value="0" className=" p-4 text-gray-900 ">
            No Parent Category
          </option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option
                className="text-gray-700 px-3 py-3"
                value={category?._id}
                key={category._id}
              >
                {category?.categoryName}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 shadow-lg bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:bg-blue-800"
        >
          Save
        </button>
      </form>
      <div className="mt-4">
        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900">
              <tr>
                <td
                  scope="col"
                  className="w-[70%] px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-300"
                >
                  Category Name
                </td>
                <td
                  scope="col"
                  className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border-r border-gray-300"
                >
                  Parent Category
                </td>
                <td
                  scope="col"
                  className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Actions
                </td>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-300">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td className="w-1/2 px-6 py-4 whitespace-nowrap border-r border-gray-300">
                      <div className="text-sm text-gray-900">
                        {category.categoryName}
                      </div>
                    </td>
                    <td className="w-[30%] px-6 py-4 whitespace-nowrap border-r border-gray-300">
                      <div className="text-sm text-gray-900">
                        {category?.parentCategory
                          ? category?.parentCategory?.categoryName
                          : "Not Found"}
                      </div>
                    </td>
                    <td className="w-1/4 px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => editCategory(category)}
                          className="px-2 py-1 flex items-center gap-1 shadow-md bg-blue-900 hover:bg-blue-950 text-gray-200 rounded-md transition-all focus:outline-none focus:bg-blue-800"
                        >
                          <FiEdit /> edit
                        </button>
                        <button className="px-2 py-1 flex items-center gap-1 shadow-md bg-red-800 hover:bg-red-900 text-gray-200 rounded-md transition-all focus:outline-none focus:bg-red-800">
                          <MdDelete /> delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="w-1/2 px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <div className="text-sm text-gray-500">
                      No categories found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
    // <Layout>
    //   <h1>Categories</h1>
    //   <label>New Category Name</label>
    //   <form
    //     onSubmit={saveCategory}
    //     className="flex items-center justify-between gap-2 "
    //   >
    //     <input
    //       value={categoryName}
    //       onChange={(e) => setCategoryName(e.target.value)}
    //       className="mb-0"
    //       type="text"
    //       placeholder="categories name"
    //     />
    //     <button type="submit" className="btn-primary py-1 mt-0 ">
    //       save
    //     </button>
    //   </form>
    //   <table className="basic mt-4">
    //     <thead>
    //       <tr>
    //         <td>Category Name</td>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {categories.length > 0 &&
    //         categories.map((i) => (
    //           <tr>
    //             <td>{i?.categoryName}</td>
    //           </tr>
    //         ))}
    //     </tbody>
    //   </table>
    // </Layout>
  );
}
