import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data/index";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Errormsg from "./components/Errormsg";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* -------- STATE -------- */
  const [product, setProduct] = useState<IProduct>(defaultProductObj);

  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  console.log("errors", errors);
  /* -------- HANDLER -------- */
  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onCancel = () => {
    console.log("cancel");
    setProduct(defaultProductObj);
    closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;

    const errors = productValidation({ title, description, imageURL, price });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).some((value) => value === "");
    console.log(hasErrorMsg);
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    console.log("sasad");
  };

  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-4" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      {/* LINE BELOW IN WRONG NEW FIX IT! */}
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name] || ""}
        onChange={onChangeHandler}
      />
      <Errormsg msg={errors[input.name]} />
    </div>
  ));

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>

      <div className="grid grid-cols-1 gap-2 p-2 m-5 rounded-md md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} close={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputsList}

          <div className="flex items-center justify-end mt-6 space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800" type="submit">
              Submit
            </Button>

            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
