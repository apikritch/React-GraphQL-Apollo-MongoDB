import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

import { Modal } from "@mui/material";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { GetCategories } from "../hooks/GetCategories";
import CategoryModal from "../components/category/CategoryModal";
import ColorButton from "../components/ColorButton";
import CategoryList from "../components/category/CategoryList";

const Categories = () => {
  const [search] = useOutletContext();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    type: "",
    item: undefined,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const categories = GetCategories(search);

  const handleModalOpen = (type, item) => {
    setModal({ type: type, item: item });

    if (type === "navigate") {
      navigate(`/category/${item.id}/products`);
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    categories.refetch();
  }, [categories]);

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-3">
        <h1>Categories</h1>
        {user && (
          <ColorButton
            background="#0ea5e9"
            hoverBackground="#0284c7"
            icon={solid("plus")}
            text="Create"
            handleClick={() => handleModalOpen("create")}
            hideText={true}
          ></ColorButton>
        )}
      </div>

      {categories.loading ? (
        <div>Spinner</div>
      ) : categories.error ? (
        <div>Error</div>
      ) : categories.data?.categories?.length > 0 ? (
        <CategoryList
          data={categories.data.categories}
          handleModalOpen={handleModalOpen}
        />
      ) : (
        <div className="h-[25vh] flex items-center">There is no category</div>
      )}
      <Modal open={open} onClose={handleClose}>
        <React.Fragment>
          <CategoryModal
            handleClose={handleClose}
            modal={modal}
            refetch={categories.refetch}
          />
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};
export default Categories;
