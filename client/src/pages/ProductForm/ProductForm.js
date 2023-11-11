import React, { useEffect, useState } from "react";
import useProducts from "../../components/hooks/useProducts";
import useStates from "../../components/hooks/useStates";
import Header from "../../components/reuseableComponents/Header";
import InputField from "../../components/reuseableComponents/InputField";
import { Alert, Avatar, Box, Button } from "@mui/material";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import Select from "react-select";
import useProductForm from "./useProductForm";
import { useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { selectLoading } from "../../redux/slicers/authSlice";
import { useSelector } from "react-redux";
import { selectProductsLoading } from "../../redux/slicers/productSlice";
import SaveIcon from "@mui/icons-material/Save";
const ProductForm = () => {
  const {
    handleCreateProduct,
    handleImageUpload,
    handleImageDrop,
    uploadedImage,
    handleUpdateProduct,
    editor,
    handleSetEditor,
    productData,
    addProductData,
    setPreviousUserData,
  } = useProductForm();
  let { id } = useParams();
  useEffect(() => {
    console.log("Product ID by ", id);
    if (id) {
      setPreviousUserData(id);
    }
  }, [id]);
  const options = [
    { value: "mobiles", label: "Mobiles" },
    { value: "property", label: "Property" },
    { value: "electronics", label: "Electronics" },
  ];
  const loading = useSelector(selectProductsLoading);
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          className="mainPage"
          style={{
            height: "auto",
            width: "80%",
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "10px",
            padding: "4px",
            display: "flex",
            justifyContent: "space-around",
            marginTop: "40px",
            boxShadow: "0 11px 21px 0 rgba(34,90,182,.12)",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box mt={2}>
                <Header
                  variant="h5"
                  component="h2"
                  color={"#49515A"}
                  fontWeight={600}
                  fontSize={22}
                  tag={"Add All details"}
                />
                <Box mt={4} width={"300px"} textAlign={"left"}>
                  <Header tag={"Product Name"} />
                  <InputField
                    value={productData?.name}
                    onChange={(e) =>
                      addProductData({
                        name: e.target.value,
                      })
                    }
                  />
                  <Header tag="Price" />
                  <InputField
                    value={productData?.price}
                    onChange={(e) =>
                      addProductData({
                        price: parseInt(e.target.value, 10),
                      })
                    }
                    placeholder="Enter Price"
                    type="number"
                  />

                  <Header tag={"Product Category"} />
                  <Select
                    className="react-select"
                    options={options}
                    value={options.find(
                      (option) => option.label === productData?.category
                    )}
                    onChange={(value) =>
                      addProductData({
                        ...productData,
                        category: value.label,
                      })
                    }
                  />
                  <Header tag={"Product Description"} />
                  <InputField
                    value={productData?.description}
                    onChange={(e) =>
                      addProductData({
                        description: e.target.value,
                      })
                    }
                    placeholder="short description"
                  />
                  <Header tag="Brand Name" />
                  <InputField
                    value={productData?.brand}
                    onChange={(e) =>
                      addProductData({
                        brand: e.target.value,
                      })
                    }
                    placeholder="Enter Your Brand Name"
                  />
                </Box>
                <Header tag={"Company Name"} />
                <InputField
                  value={productData?.company}
                  onChange={(e) =>
                    addProductData({
                      company: e.target.value,
                    })
                  }
                  placeholder="enter your company name"
                />
                <Header tag="Available Stock" />
                <InputField
                  value={productData?.stock}
                  onChange={(e) =>
                    addProductData({
                      stock: parseInt(e.target.value, 10),
                    })
                  }
                  placeholder="Enter available quantity"
                  type="number"
                />
              </Box>
              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                {/* <Button
                  variant="contained"
                  onClick={id ? handleUpdateProduct : handleCreateProduct}
                  sx={{
                    width: "200px",
                  }}
                >
                  {id ? "Update Product" : "Create Product"}
                </Button> */}
                <LoadingButton
                  color="secondary"
                  onClick={id ? handleUpdateProduct : handleCreateProduct}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  {id ? (
                    <span>Update Product</span>
                  ) : (
                    <span> create product</span>
                  )}
                </LoadingButton>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box mt={2}>
                <Header
                  variant="h5"
                  component="h2"
                  color={"#49515A"}
                  fontWeight={600}
                  fontSize={22}
                  tag={"Add Picture"}
                />

                <Dropzone onDrop={handleImageDrop} accept="image/*">
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {uploadedImage ? (
                        <AvatarEditor
                          ref={(editor) => handleSetEditor(editor)}
                          image={uploadedImage}
                          width={350} // Set width to match the uploaded image's width
                          height={500} // Set height to match the uploaded image's height
                          scale={1} // Set scale to 1 to display the full image
                          border={0} // Set border to 0 to remove any border
                        />
                      ) : (
                        <Box width={200} height={200} border="1px solid black">
                          <p>Click to select an image or drop one here.</p>
                        </Box>
                      )}
                    </div>
                  )}
                </Dropzone>
                <Box mt={4} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    onClick={handleImageUpload}
                    sx={{
                      width: "200px",
                    }}
                  >
                    Upload Image
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
