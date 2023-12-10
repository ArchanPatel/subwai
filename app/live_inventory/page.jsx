import React from 'react'

const page = () => {
  return (
    <table>
        <thead>
            <tr>
                <th>Ingredient</th>
                <th>Inventory Count</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Jalapeno</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Black Olives</td>
                <td>120</td>
            </tr>
            <tr>
                <td>Green Olives</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Banana Peppers</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Mustard Sauce</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Chipotle Sauce</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Garlic Aioli Sauce </td>
                <td>90</td>
            </tr>
            <tr>
                <td>Siracha Sauce</td>
                <td>90</td>
            </tr>
            <tr>
                <td>House Sandwich Sauce</td>
                <td>90</td>
            </tr>
        </tbody>
    </table>
  )
}

export default page