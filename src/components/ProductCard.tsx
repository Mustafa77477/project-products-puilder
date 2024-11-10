import Image from "./Image";
import Button from "./ui/Button";
import { IProduct } from "../interfaces";
import { Txtslice } from "../utils/function";

// تعريف واجهة الخصائص المطلوبة للمكون
interface IProps {
  product: IProduct;  // كائن المنتج الذي يحتوي على بيانات المنتج
}

const ProductCard = ({ product }: IProps) => {
  // استخراج البيانات المطلوبة من كائن المنتج
  const { title, description, imageURL, price } = product;

  return (
    // الحاوية الرئيسية للبطاقة
    <div className="flex flex-col max-w-sm p-2 mx-auto border rounded-md md:max-w-lg md:mx-0">
      {/* صورة المنتج الرئيسية */}
      <Image
        imageURL={imageURL}
        alt={title} // تحسين: استخدام عنوان المنتج كنص بديل
        className="mb-2 rounded-md"
      />
      
      {/* عنوان المنتج */}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      
      {/* وصف المنتج (مقتطع إلى 100 حرف) */}
      <p className="mb-4 text-gray-600">
        {Txtslice(description, 100)}
      </p>
        
      {/* ألوان المنتج المتاحة */}
      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
      </div>

      {/* معلومات إضافية (السعر والصورة المصغرة) */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{price}</span>
        <img
          src={imageURL}
          alt={`${title} Thumbnail`}
          className="object-cover w-10 h-10 rounded-full"
        />
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center justify-between mt-5 space-x-2 ">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          width="w-full"
          onClick={() => {
            console.log("EDIT button clicked");
          }}
        >
          EDIT
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-800"
          onClick={() => {
            console.log("DELETE button clicked");
          }}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;