import React, { useState } from "react";
import {
  Modal,
  TextField,
  FormLayout,
  Select,
  Thumbnail,
  InlineError,
} from "@shopify/polaris";

const CreateProductModal = ({ open, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
    description: "",
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.rating.rate) newErrors.ratingRate = "Rate is required";
    if (!formData.rating.count) newErrors.ratingCount = "Count is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddProduct(formData);
      onClose(); // Close the modal after submission
    }
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
            requiredIndicator
            error={errors.title}
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
            requiredIndicator
            error={errors.category}
          />
          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange("price")}
            prefix="$"
            placeholder="Enter product price"
            requiredIndicator
            error={errors.price}
          />
          <TextField
            label="Rate"
            type="number"
            value={formData.rating.rate}
            onChange={handleChange("rating.rate")}
            placeholder="Enter product rate"
            requiredIndicator
            error={errors.ratingRate}
          />
          <TextField
            label="Count"
            type="number"
            value={formData.rating.count}
            onChange={handleChange("rating.count")}
            placeholder="Enter product count"
            requiredIndicator
            error={errors.ratingCount}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Enter product description"
            multiline
            requiredIndicator
            error={errors.description}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="fileInput">Image</label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {errors.image && <InlineError message={errors.image} fieldID="fileInput" />}
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
