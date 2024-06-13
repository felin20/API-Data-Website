import React, { useState, useCallback } from "react";
import {
  Page,
  Card,
  DataTable,
  TextField,
  Button,
  Popover,
  FormLayout,
  Select,
  EmptyState,
} from "@shopify/polaris";
import { FilterMajor } from "@shopify/polaris-icons";
import ProductModal from "../components/ProductModal";
import CreateProductModal from "../components/CreateProductModal";
import "../src/app/globals.css";

const Home = ({ products = [] }) => {
  const [productList, setProductList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "",
    price: "",
  });
  const [popoverActive, setPopoverActive] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleSearchChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: value,
    }));
  };

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleCategoryChange = useCallback((value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value,
    }));
  }, []);

  const handlePriceChange = useCallback((value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: value,
    }));
  }, []);

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      category: "",
      price: "",
    });
  };

  const handleAddProductClick = () => {
    setCreateModalOpen(true);
  };

  const handleAddProduct = (newProduct) => {
    setProductList((prevProducts) => [newProduct, ...prevProducts]);
  };

  const filteredProducts = productList.filter((product) => {
    return (
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      (filters.category ? product.category === filters.category : true) &&
      (filters.price ? product.price <= parseFloat(filters.price) : true)
    );
  });

  const rows = filteredProducts.map((product, index) => [
    <img
      key={`img-${index}`}
      src={product.image}
      style={{ width: "50px", height: "50px" }}
    />,
    <div key={`title-${index}`} onClick={() => handleRowClick(product)}>
      {product.title}
    </div>,
    <div key={`category-${index}`} onClick={() => handleRowClick(product)}>
      {product.category}
    </div>,
    <div key={`price-${index}`} onClick={() => handleRowClick(product)}>
      {product.price}
    </div>,
  ]);

  const categoryOptions = [
    { label: "All", value: "" },
    ...Array.from(new Set(products.map((product) => product.category))).map(
      (category) => ({
        label: category,
        value: category,
      })
    ),
  ];

  return (
    <Page title="Product List">
      <Card sectioned>
        <FormLayout>
          <FormLayout.Group>
            <div style={{ width: "750px" }}>
              <TextField
                label="Search"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products by title"
                clearButton
                onClearButtonClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    searchQuery: "",
                  }))
                }
              />
            </div>
            <div
              style={{
                position: "relative",
                left: "300px",
                top: "25px",
              }}
            >
              <Popover
                active={popoverActive}
                activator={
                  <Button
                    icon={FilterMajor}
                    onClick={togglePopoverActive}
                    disclosure
                  >
                    Filters
                  </Button>
                }
                onClose={togglePopoverActive}
              >
                <Popover.Section>
                  <FormLayout>
                    <Select
                      label="Category"
                      options={categoryOptions}
                      value={filters.category}
                      onChange={handleCategoryChange}
                    />
                    <TextField
                      label="Max Price"
                      type="number"
                      value={filters.price}
                      onChange={handlePriceChange}
                      prefix="$"
                    />
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </FormLayout>
                </Popover.Section>
              </Popover>
            </div>
          </FormLayout.Group>
        </FormLayout>
      </Card>
      <div style={{ position: "relative", top: "-150px", left: "830px" }}>
        <Button id="custom-button" primary onClick={handleAddProductClick}>
          Add Product
        </Button>
      </div>
      
      <Card>
        
          {filteredProducts.length > 0 ? (
            <DataTable nam
              columnContentTypes={["text", "text", "text", "numeric"]}
              headings={["Image", "Title", "Category", "Price"]}
              rows={rows}
            />
          ) : (
            <EmptyState
              heading="No products found"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </EmptyState>
          )}
        
      </Card>
      
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={closeModal}
      />
      <CreateProductModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </Page>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Home;
