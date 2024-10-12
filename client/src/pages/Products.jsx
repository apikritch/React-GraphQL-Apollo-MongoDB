import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

import { Modal } from "@mui/material";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { GetProducts } from "../hooks/GetProducts";
import { GetCategory } from "../hooks/GetCategory";
import ProductModal from "../components/product/ProductModal";
import ProductList from "../components/product/ProductList";
import ColorButton from "../components/ColorButton";

const Products = () => {
  const [search] = useOutletContext();

  const navigate = useNavigate();

  const { categoryId } = useParams();

  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    type: "",
    item: undefined,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const products = GetProducts(search, categoryId);

  const category = GetCategory(categoryId);

  const handleModalOpen = (type, item) => {
    setModal({ type: type, item: item });

    if (type === "navigate") {
      if (!categoryId) {
        navigate(`/product/${item.id}`);
      } else {
        navigate(`/category/${categoryId}/product/${item.id}`);
      }
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    products.refetch();
  }, [products]);

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-3">
        {!categoryId ? (
          <h1>Products</h1>
        ) : (
          <React.Fragment>
            {category.loading ? (
              <div>Spinner</div>
            ) : category.error ? (
              <div>Error</div>
            ) : (
              category.data && (
                <h1>
                  Category {">"} {category.data.category.name}
                </h1>
              )
            )}
          </React.Fragment>
        )}
        {user && (
          <ColorButton
            background="#f97316"
            hoverBackground="#ea580c"
            icon={solid("plus")}
            text="Create"
            handleClick={() => handleModalOpen("create")}
            hideText={true}
          ></ColorButton>
        )}
      </div>
      {products.loading ? (
        <div>Spinner</div>
      ) : products.error ? (
        <div>Error</div>
      ) : products.data.products?.length > 0 ? (
        <ProductList data={products.data} handleModalOpen={handleModalOpen} />
      ) : (
        <div className="h-[25vh] flex items-center">
          There is no product in this category
        </div>
      )}
      <Modal open={open} onClose={handleClose}>
        <React.Fragment>
          <ProductModal
            handleClose={handleClose}
            modal={modal}
            categoryId={categoryId && categoryId}
            refetch={products.refetch}
          />
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default Products;
