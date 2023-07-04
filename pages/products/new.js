import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "../../components/ProductForm";

export default function NewProduct() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
