import React from "react";
import { Modal, TextContainer } from "@shopify/polaris";

const ProductModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product.title}
      primaryAction={{
        content: "Close",
        onAction: onClose,
      }}
    >
      <Modal.Section>
        <TextContainer>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100px", height: "100px" }}
          />

          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>

          <p>Rating</p>
          <p>Rate: {product.rating.rate}</p>
          <p>Count: {product.rating.count}</p>

          {/* Add more product details as needed */}
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default ProductModal;
