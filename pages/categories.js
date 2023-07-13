import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";
import { Spin } from "antd";

function Categories({ swal }) {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const styles = {
    input:
      "border border-gray-300 rounded-lg px-4 py-2 mb-0 focus:outline-none focus:bg-gray-50 focus:border-blue-800",
    delete:
      "px-2 py-1 flex items-center justify-center gap-1 shadow-md bg-red-200 hover:bg-red-300 text-red-700 rounded-md transition-all focus:outline-none focus:bg-red-200 w-full md:w-auto",
    edit: "px-2 py-1 flex items-center justify-center gap-1 shadow-md bg-indigo-200 hover:bg-indigo-300 text-indigo-700 rounded-md transition-all focus:outline-none focus:bg-indigo-200 w-full md:w-auto",
    default_btn:
      "bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 focus:outline-none transition-all px-3 py-2 rounded-lg text-gray-600 mb-1",
    remove:
      "flex items-center justify-center gap-1 text-center bg-red-200 hover:bg-red-300 focus:bg-red-200 transition-all rounded-md px-4 py-2 text-red-700 w-full md:w-auto",
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      categoryName,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      toast.success("Category Edited!", {
        icon: "👏",
        duration: 1200,
      });
      data._id = editedCategory._id;
      await axios.put("/api/category", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/category", data);
    }
    setCategoryName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
    setLoading(false);
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category?.categoryName);
    setParentCategory(category?.parentCategory?._id);
    setProperties(
      category?.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const deleteCategory = async (category) => {
    setLoading(false);
    try {
      const result = await swal.fire({
        title: "Are you sure?",
        html: `Do you really want to delete <b>"${category?.categoryName}" ? </b>`,
        showCancelButton: true,
        confirmButtonColor: "#991b1b",
        cancelButtonColor: "#1f2937",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
        focusConfirm: false,
        focusCancel: false,
      });

      if (result.isConfirmed) {
        toast.success("Category Deleted!", {
          duration: 1200,
        });
        const { _id } = category;
        await axios.delete("/api/category?_id=" + _id);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProperties = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <label className="block mb-2">
        {editedCategory ? (
          <span>
            Edit category:
            <span className="font-medium text-[22px] ml-2 text-blue-600 ">
              &quot;{editedCategory?.categoryName}&quot;
            </span>
          </span>
        ) : (
          "Create New Category:"
        )}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={styles.input}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="max-w-full sm:w-[600px] border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-800 focus:bg-gray-50 "
          >
            <option value="0" className="p-4 text-gray-400 ">
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
        </div>
        <div className="mt-2">
          <label className="block mb-1">Properties:</label>
          <button
            onClick={addProperties}
            type="button"
            className={styles.default_btn}
          >
            Add New properties
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div
                key={index}
                className="flex flex-wrap md:flex-nowrap items-center gap-1 mt-[5px] "
              >
                <input
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  type="text"
                  placeholder="property name (example: color )"
                  className={styles.input}
                />
                <input
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  type="text"
                  placeholder="value name (example: values, comma separated )"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className={styles.remove}
                >
                  remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-1 mt-3">
          <button
            type="submit"
            className="px-6 py-2 shadow-lg transition-all bg-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-300 focus:outline-none focus:bg-indigo-200 w-full md:w-auto"
          >
            Save
          </button>
          {editedCategory && (
            <button
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
                setParentCategory("");
                setProperties([]);
              }}
              type="button"
              className="px-6 py-2 shadow-lg bg-red-200 text-red-600 rounded-lg hover:bg-red-300 focus:outline-none focus:bg-red-200"
            >
              cancel
            </button>
          )}
        </div>
      </form>
      <div className="mt-4">
        <div className="bg-white shadow-lg overflow-hidden rounded-lg">
          {!editedCategory && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-700">
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
                          {category?.categoryName
                            ? category?.categoryName
                            : "No Category Found"}
                        </div>
                      </td>
                      <td className="w-[30%] px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        <div className="text-sm text-gray-900">
                          {category?.parentCategory ? (
                            category?.parentCategory?.categoryName
                          ) : (
                            <div className="whitespace-nowrap ">
                              <div className="text-sm">No categories found</div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="w-1/4 px-6 py-1 whitespace-nowrap">
                        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2">
                          <button
                            onClick={() => editCategory(category)}
                            className={styles.edit}
                          >
                            <FiEdit /> edit
                          </button>
                          <button
                            onClick={() => deleteCategory(category)}
                            className={styles.delete}
                          >
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
                        No category found
                      </div>
                    </td>
                    <td className="w-1/2 px-6 py-4 whitespace-nowrap border-r border-gray-300">
                      <div className="text-sm text-gray-500">
                        No Parent category found
                      </div>
                    </td>
                    <td className="w-1/2 px-6 py-4 whitespace-nowrap border-r border-gray-300">
                      <div className="text-center text-sm text-gray-500">
                        ---
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {loading && (
          <Spin
            size="large"
            className="text-center flex items-center justify-center p-10"
          />
        )}
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
