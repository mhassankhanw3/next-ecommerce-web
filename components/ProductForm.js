import React, { useState } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Spin } from "antd";
import Spinner from "./Spinner";
import Image from "next/image";

export default function ProductForm({
  _id,
  title: existingTitle,
  desc: existingDesc,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [desc, setDesc] = useState(existingDesc || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  console.log({ _id });
  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, desc, price, images };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };
  if (goToProducts) {
    router.push("/products");
  }

  const uploadImages = async (event) => {
    const files = event.target?.files;
    if (files && files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
      console.log(res.data, "res for upload imgaes");
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-4 flex flex-wrap gap-2 items-center ">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <Image
                src={link}
                alt=""
                className="rounded-lg img border border-gray-300 border-dashed "
              />
            </div>
          ))}
        {isUploading && <Spinner />}
        <label className="w-24 h-24 rounded-md bg-gray-50 text-black font-normal text-[16px] hover:bg-gray-100 transition-all flex items-center justify-center gap-1 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Uplaod
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
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
      <div className="flex items-center gap-2 ">
        <button type="submit" className="btn-primary">
          save
        </button>
        <Link
          href={"/products"}
          className="mt-2 bg-red-800 text-gray-200 rounded-md px-4 py-[4px] flex items-center justify-center w-[80px] text-center text-[16px] hover:bg-red-900 transition-all"
        >
          cancel
        </Link>
      </div>
    </form>
  );
}
