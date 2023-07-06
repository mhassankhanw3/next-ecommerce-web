import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/products?id=" + id).then((res) => {
        setProductInfo(res.data, "res");
      });
    }
    console.log(id, "delete product id");
  }, [id]);
  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
    toast.success("Product Deleted!", {
      duration: 1000,
    });
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &quot;
        <span className="font-bold text-red-800 ">{productInfo?.title}</span>
        &quot;?
      </h1>
      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="bg-red-700 hover:bg-red-800 transition-all rounded-md px-4 py-1 text-[18px] text-gray-200"
        >
          Yes
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 transition-all rounded-md px-4 py-1 text-[18px] text-gray-200"
          onClick={goBack}
        >
          NO
        </button>
      </div>
    </Layout>
  );
}
