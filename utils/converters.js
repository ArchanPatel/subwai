export default function convertWeightToBoxes(productName, weightGrams) {
    let boxes = 0;
    let weight_ounces = weightGrams*0.035274;

    switch (productName) {
        case 'Dill Pickles':
            // Assuming 1 box of ProductA contains 500 grams
            boxes = weight_ounces / (8 * 80);
            break;
        case 'Banana Peppers':
            // Assuming 1 box of ProductB contains 250 grams
            boxes = weight_ounces / (4 * 80);
            break;
        case 'Black Olives':
        case 'Green Olives':
            // Assuming 1 box of ProductC contains 1000 grams
            boxes = weight_ounces / (10 * 33);
            break;
        // Add more cases for other products as needed
        default:
            console.log('Product not found');
            break;
    }

    return parseFloat(boxes.toFixed(4)); // Returning the result as a float with two decimal places
}