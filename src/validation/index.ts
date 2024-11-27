// ** ProductObj === errorsObj (TITLE, DESCRIPTION, IMAGEURL, PRICE, VAL )

export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  // ** Return an object for errors
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = { title: "", description: "", imageURL: "", price: "" };
  // ** Regular expression to validate URL
  const validUrl = /^(ftp|http|https):\/\/[^ . " ]+$/.test(product.imageURL);
  // ** Title validation
  if (
    product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Prodect title must be between 10 and 80 characters!";
  }
  // ** Description validation
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 80
  ) {
    errors.description =
      "Prodect description must be between 1 and 80 characters";
  }

  // ** Image URL validation
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Invalid image URL reduired";
  }

  // ** Price validation
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Invalid price is required!";
  }
  return errors;
};
export default productValidation;
// ** Regular Expression
