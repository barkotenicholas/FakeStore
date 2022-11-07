import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import SideBarHook from "../sidebar/SideBarHook";
import styles from "./Modal.module.css";
const AddProductModal = ({ setIsOpened, addNewProduct }) => {
  const initialValues = {
    id:Math.floor(Math.random() * 100),
    title: "",
    description: "",
    image: "",
    price: null,
    category: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [data] = SideBarHook("https://fakestoreapi.com/products/categories");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.info(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues,image:`https://source.unsplash.com/random/400*400/?img=${getRandomInt(9)}`})
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        addNewProduct(formValues);
        setIsOpened(false)
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }
    if (!values.category) {
      errors.category = "Category is required";
    }

    return errors;
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpened(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Add New Product</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpened(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <form className={styles.formList} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formValues.title}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.title}</p>
              <div className={styles.field}>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={formValues.description}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.description}</p>
              <div className={styles.field}>
                <label>price:</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formValues.price}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.price}</p>
              <div className={styles.field}>
                <label>Choose category:</label>
                <select
                  name="category"
                  value={formValues.category}
                  className={styles.dropdown}
                  onChange={handleChange}
                >
                  <option>Choose Category</option>
                  {data &&
                    data.map((item, index) => {
                      return <option key={index}>{item}</option>;
                    })}
                </select>
              </div>
              <p className={styles.err}>{formErrors.category}</p>

              <button className={styles.addBtn} onClick={() => handleSubmit}>
                Submit
              </button>
            </form>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpened(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;
