
/**
 * Function to slice a given text up to a maximum length and add an ellipsis if the text is longer than the maximum length.
 * 
 * @param txt - The text to be sliced.
 * @param max - The maximum length of the text.
 * @returns The sliced text, or the original text if it is shorter than the maximum length.
 */
export function Txtslice(txt: string, max: number): string {
  // Check if the text length is greater than the maximum length
  if (txt.length > max) {
    // Slice the text up to the maximum length and add an ellipsis
    return `${txt.slice(0, max)}...`;
  }

  // Return the original text if it is shorter than the maximum length
  return txt;
}
