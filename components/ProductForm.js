import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Spin } from "antd";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function ProductForm({
  _id,
  title: existingTitle,
  desc: existingDesc,
  price: existingPrice,
  images: existingImages,
  selectCategory: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [desc, setDesc] = useState(existingDesc || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectCategory, setSelectCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategoriesData(res.data);
    });
  }, []);

  // const saveProduct = async (e) => {
  //   e.preventDefault();
  //   const data = { title, desc, price, images };
  //   if (_id) {
  //     // update
  //     await axios.put("/api/products", { ...data, _id });
  //   } else {
  //     // create
  //     await axios.post("/api/products", data);
  //   }
  //   setGoToProducts(true);
  // };

  const saveProduct = (e) => {
    e.preventDefault();
    const data = {
      title,
      desc,
      price,
      images,
      selectCategory,
      properties: productProperties,
    };

    const savePromise = _id
      ? axios.put("/api/products", { ...data, _id })
      : axios.post("/api/products", data);

    setGoToProducts(true);

    toast
      .promise(
        savePromise,
        {
          success: "Product saved successfully!",
          error: "Failed to save product.",
        },
        { position: "top-center", duration: 1000 }
      )
      .then(() => {
        if (goToProducts) {
          router.push("/products");
        }
      })
      .catch(() => {
        // Handle error if necessary
      });
  };

  if (goToProducts) {
    router.push("/products");
  }

  // const uploadImages = async (event) => {
  //   const files = event.target?.files;
  //   if (files && files?.length > 0) {
  //     setIsUploading(true);
  //     const data = new FormData();
  //     for (const file of files) {
  //       data.append("file", file);
  //     }
  //     const res = await axios.post("/api/upload", data);
  //     setImages((oldImages) => {
  //       return [...oldImages, ...res.data.links];
  //     });
  //     setIsUploading(false);
  //     console.log(res.data, "res for upload imgaes");
  //     toast.success("Uploaded");
  //   }
  // };

  const uploadImages = async (event) => {
    const files = event.target?.files;
    if (files && files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const uploadPromise = axios.post("/api/upload", data);

      try {
        toast.promise(uploadPromise, {
          loading: "Uploading...",
          success: "Image uploaded successfully!",
          error: "Failed to upload image.",
        });

        const res = await uploadPromise;
        setImages((oldImages) => [...oldImages, ...res.data.links]);
        setIsUploading(false);
      } catch (error) {
        console.log(error, "image uploading error");
        setIsUploading(false);
        setTimeout(() => {
          toast("Something went wrong with your image!", {
            icon: "❌",
            duration: 4000,
          });
        }, 4000);
      }
    }
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProp = { ...prev };
      newProductProp[propName] = value;
      return newProductProp;
    });
  };

  const propertiesToFill = [];
  if (categoriesData.length > 0 && selectCategory) {
    let cateInfo = categoriesData.find(({ _id }) => _id === selectCategory);
    propertiesToFill.push(...cateInfo.properties);
    while (cateInfo?.parentCategory?._id) {
      let parentCate = categoriesData.find(
        ({ _id }) => _id === cateInfo?.parentCategory?._id
      );
      propertiesToFill.push(...parentCate.properties);
      cateInfo = parentCate;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <Toaster />
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-col mb-4 ">
        <label>Category</label>
        <select
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
          className="max-w-md mt-1 py-2 px-2 rounded-lg bg-gray-100 border border-gray-300 focus:bg-gray-50 focus:outline-none focus:border-blue-900 "
        >
          <option value="">Uncategorized</option>
          {categoriesData.length > 0 &&
            categoriesData.map((category) => (
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

      <div className="flex items-center gap-4">
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((v) => {
            console.log(v, "v");
            return (
              <div key={v?.name}>
                <span className="font-medium block text-gray-600">
                  {v?.name[0]?.toUpperCase() + v?.name.substring(1)}:
                </span>
                <select
                  value={productProperties[v?.name]}
                  onChange={(e) => setProductProp(v?.name, e.target.value)}
                  className="max-w-full w-[300px] py-2 px-2 rounded-lg bg-gray-100 border border-gray-300 focus:bg-gray-50 focus:outline-none focus:border-blue-900 "
                >
                  {v.values.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
      </div>

      <label>Photos</label>
      <div
        className={`flex flex-wrap items-center ${
          images.length > 0 ? `gap-2` : `gap-0`
        }`}
      >
        <ReactSortable
          className="flex flex-wrap items-center gap-2"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 shadow-sm  border border-gray-300 rounded-lg p-2 bg-white hover:shadow-lg transition-all focus:outline-none "
              >
                <img src={link} alt="" className="rounded-lg " />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="px-2">
            {" "}
            <Spinner />
          </div>
        )}
        <label className="label w-24 h-24 rounded-md hover:rounded-lg bg-gray-50 text-indigo-800 font-normal text-[16px] hover:bg-gray-50 border border-indigo-800 gap-1 transition-all flex items-center justify-center cursor-pointer ">
          <span>
            {" "}
            <AiOutlineCloudUpload className="text-[20px] text-indigo-800 " />
          </span>
          Uplaod
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <div className="font-medium mb-4">
        {!images?.length && <div>No photos in this product</div>}
      </div>
      <label>Product Description</label>
      <textarea
        placeholder="product description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <label>Product Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {(!title || !selectCategory || !desc || !price) && (
        <p className="text-red-600">All Fields are required!</p>
      )}
      <div className="flex items-center gap-2 mt-2 ">
        <button
          disabled={!title || !selectCategory || !desc || !price}
          style={{
            backgroundColor:
              !title || !selectCategory || !desc || !price ? "#9ca3af" : "",
          }}
          type="submit"
          className="bg-indigo-700 text-gray-200 rounded-md px-4 py-1 text-center text-[16px] hover:bg-indigo-800 transition-all"
        >
          save
        </button>
        <Link
          href={"/products"}
          className=" bg-red-800 text-gray-200 rounded-md px-4 py-[4px] flex items-center justify-center w-[80px] text-center text-[16px] hover:bg-red-900 transition-all"
        >
          cancel
        </Link>
      </div>
    </form>
  );
}
