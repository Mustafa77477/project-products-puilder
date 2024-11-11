import ProductCard from "./components/ProductCard";
// هنا بنستورد مكون ProductCard اللي هنستخدمه لعرض كل منتج ككارت في الصفحة.

import Modal from "./components/ui/Modal";
// هنا بنستورد مكون Modal اللي هنعرض فيه النموذج لما المستخدم يضغط على زر "Add".

import { formInputsList, productList } from "./data/index";
// هنا بنستورد قائمة المنتجات (productList) وقائمة المدخلات للنموذج (formInputsList) من ملف البيانات عشان نستخدمهم.

import { ChangeEvent, useState } from "react";
// هنا بنستورد نوع ChangeEvent عشان نستخدمه لتحديد نوع الأحداث اللي بتحصل على المدخلات، وuseState عشان نقدر نعمل State ونتابع حالتها.

import Button from "./components/ui/Button";
// بنستورد مكون Button اللي بنستخدمه لعرض الأزرار بتنسيق معين.

import Input from "./components/ui/Input";
// بنستورد مكون Input اللي بيكون المدخلات اللي المستخدم هيكتب فيها البيانات.

import { IProduct } from "./interfaces";
// بنستورد نوع IProduct اللي هو بيوضح شكل كائن المنتج والبيانات اللي هيتضمنها.

const App = () => {
  /*----  State ----*/
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: 0,
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });
  // هنا عرفنا حالة اسمها product بتكون من نوع IProduct، وعملنا لها قيم مبدئية فاضية (empty) عشان نجمع البيانات اللي المستخدم هيضيفها.

  const [isOpen, setIsOpen] = useState(false);
  // عرفنا حالة اسمها isOpen بتكون Boolean بتتحكم في عرض واغلاق ال Modal، وقيمتها المبدئية False عشان المودال يكون مقفول أول ما الصفحة تفتح.

  /*----  HANDLER ----*/
  const closeModal = () => setIsOpen(false);
  // هنا عرفنا دالة closeModal اللي بتغير قيمة isOpen لـ false عشان تقفل المودال.

  const openModal = () => setIsOpen(true);
  // هنا عرفنا دالة openModal اللي بتغير قيمة isOpen لـ true عشان تفتح المودال.

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // هنا عرفنا دالة onChangeHandler اللي بتحدث قيمة ال product في الحالة لما المستخدم يغير قيمة أي مدخل، بنستخدم تفكيك (destructuring) للحصول على name و value عشان نحدث قيمة الحقل في الكائن product.

  /*----  Render ----*/
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  // هنا بنعمل متغير renderProductList بيحول قائمة المنتجات لبطاقات عن طريق استخدام map بحيث كل عنصر يبقى مكون ProductCard وبيمرر بيانات المنتج له.

  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-4">
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
        value={product[input.name]}
        onChange={onChangeHandler}
      />
    </div>
  ));
  // هنا بنعمل متغير renderFormInputsList بيحول قائمة المدخلات لعناصر نموذج (Form) بحيث كل عنصر يبقى مدخل (Input) ولابل (Label) وبنستخدم onChangeHandler لتحديث القيمة لما تتغير.

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>
      {/* هنا بنعرض زر "Add" اللي بيفتح المودال لما المستخدم يضغط عليه، وبنحدد ألوان الخلفية والألوان عند التمرير عليه باستخدام كلاس من Tailwind. */}
      <div className="grid grid-cols-1 gap-2 p-2 m-5 rounded-md md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderProductList}
      </div>
      {/* هنا بنعرض قائمة المنتجات بشكل شبكة Grid، بحيث يتم ترتيب المنتجات حسب عدد الأعمدة اللي تحددها الكلاسات بتاعة Tailwind بناءً على حجم الشاشة. */}
      <Modal isOpen={isOpen} close={closeModal} title="Add New Product">
        <form className="space-y-3">
          {renderFormInputsList}
          {/* هنا بنعرض المدخلات داخل المودال، وبنعرضها بشكل عمودي مع مسافات بينها باستخدام space-y-3 من Tailwind. */}
          <div className="flex items-center justify-end mt-6 space-x-3">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              onClick={closeModal}
            >
              Submit
            </Button>
            {/* زر "Submit" بيقفل المودال لما المستخدم يضغط عليه. */}
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={closeModal}
            >
              Cancel
            </Button>
            {/* زر "Cancel" برضو بيقفل المودال لو المستخدم قرر انه مش عايز يضيف المنتج. */}
          </div>
        </form>
      </Modal>
      {/* هنا بنعرض المودال اللي بيحتوي على النموذج لإضافة منتج جديد، وبنمرر حالته ومتى يتم إغلاقه مع عنوان المودال. */}
    </main>
  );
};

export default App;
// هنا بنعمل تصدير لمكون App عشان نقدر نستعمله في باقي المشروع كالمكون الأساسي للصفحة.
