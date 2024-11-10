import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data/index";
import { useState } from "react";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

const App = () => {
  /*----  State ----*/
  const [isOpen, setIsOpen] = useState(false);

  /*----  HANDLER ----*/
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  /*----  Render ----*/
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={input.id}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input type="text" id={input.id}  name={input.name}/>
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
        <form className="space-y-3">
          {renderFormInputsList}
          <div className="flex items-center justify-end mt-6 space-x-3">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              onClick={closeModal}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={closeModal}
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
