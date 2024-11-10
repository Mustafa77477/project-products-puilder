import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data/index";
import { useState } from "react";
import Button from "./components/ui/Button";

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
    <div key={input.id} className="flex flex-col mb-4">
      <label className="mb-2 text-sm font-medium text-gray-700">{input.label}</label>
      <input
        type="text"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
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
        <div className="mt-4">
          {renderFormInputsList}
          <div className="flex items-center justify-end mt-6 space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={closeModal}>
              Submit
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default App;