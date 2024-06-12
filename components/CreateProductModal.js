import React, { useState } from "react";
import {
  Modal,
  TextField,
  FormLayout,
  Select,
  Thumbnail,
} from "@shopify/polaris";

const CreateProductModal = ({ open, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    rating: {
      rate: "",
    },
    rating: {
      count: "",
    },

    description: "",
  });

  const handleChange = (field) => (value) => {
    if (field.includes(".")) {
      // If the field is nested (e.g., 'rating.rate' or 'rating.count')
      const [parentField, nestedField] = field.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parentField]: {
          ...prevData[parentField],
          [nestedField]: value,
        },
      }));
    } else {
      // If the field is not nested
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    onAddProduct(formData);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Product"
      primaryAction={{
        content: "Add Product",
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Enter product title"
          />
          <Select
            label="Category"
            options={[
              { label: "electronics", value: "electronics" },
              { label: "men's clothing", value: "men's clothing" },
              { label: "women's clothing", value: "women's clothing" },
              { label: "jewelery", value: "jewelery" },
            ]}
            value={formData.category}
            onChange={handleChange("category")}
            placeholder="Select a category"
          />
          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange("price")}
            prefix="$"
            placeholder="Enter product price"
          />
          <TextField
            label="Rate"
            type="number"
            value={formData.rating.rate}
            onChange={handleChange("rating.rate")}
            placeholder="Enter product rate"
          />
          <TextField
            label="Count"
            type="number"
            value={formData.rating.count}
            onChange={handleChange("rating.count")}
            placeholder="Enter product count"
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Enter product description"
            multiline
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="fileInput">Image</label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.image && (
              <Thumbnail
                source={formData.image}
                alt="Product Preview"
                size="large"
              />
            )}
          </div>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default CreateProductModal;
