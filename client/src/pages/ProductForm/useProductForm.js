import React, { useState } from "react";
import useProducts from "../../components/hooks/useProducts";
import useStates from "../../components/hooks/useStates";
import { useEffect } from "react";
const useProductForm = () => {
  const { createNewProduct, productData, addProductData, updateProduct } =
    useProducts();
  const { userProducts } = useStates();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    if (productData.imageUrl) {
      const imageUrl = productData.imageUrl;

      const fetchImage = async () => {
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            const blob = await response.blob();
            const fileName = "image.jpg"; // You can set the desired file name
            const file = new File([blob], fileName, { type: "image/jpeg" });

            setUploadedImage(file);
          } else {
            console.error(
              "Failed to fetch image:",
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching and converting image:", error);
        }
      };

      fetchImage();
    }
  }, [productData.imageUrl]);
  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedImage(acceptedFiles[0]);
    }
  };
  const setPreviousUserData = (id) => {
    console.log(`Setting`, id);
    userProducts.filter((product) => {
      if (product._id === id) {
        console.log("PRODUCT FOR EDIT", product);
        addProductData(product);
      }
    });
  };
  const handleSetEditor = (editor) => {
    setEditor(editor);
  };
  const handleImageUpload = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      //Export as Blob
      canvas.toBlob((blob) => {
        addProductData({ ...productData, picture: blob });
      }, "image/jpeg");
      console.log("Canvas", canvas);
      // const dataURL = canvas.toDataURL("image/jpeg");
      // // You can send the dataURL to your server or do further processing here.
      // setCredentials({ ...credentials, photo: dataURL });
      // console.log(dataURL);
    } else {
      console.log("Avatar editor not ready.");
    }
  };
  const handleCreateProduct = async () => {
    try {
      await createNewProduct();
      // Handle success or reset the form
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error gracefully, e.g., set an error state or show an error message
    }
  };
  const handleUpdateProduct = async () => {
    try {
      await updateProduct();
      // Handle success or reset the form
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error gracefully, e.g., set an error state or show an error message
    }
  };
  return {
    handleCreateProduct,
    handleImageUpload,
    handleImageDrop,
    uploadedImage,
    handleSetEditor,
    productData,
    addProductData,
    setPreviousUserData,
    handleUpdateProduct,
  };
};

export default useProductForm;
