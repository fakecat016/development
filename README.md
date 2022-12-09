# Development

### Link to Deployed Website
https://fakecat016.github.io/development/

### Goal and Value of the Application
Create a interactive bakery shop!

### Usability Principles Considered
Clear function of each button, cute style.

### Organization of Components
In the public folder are images for bakery items. 
In the src folder are 
- App.js where the cart, filtering, and sorting functions are coded
- App.css where the style of the final page is defined
- components/BakeryItems.js where bakery item cards are coded
- assets/bakery-data.json where bakery item information is coded

### How Data is Passed Down Through Components
In App.js, data in bakery-data.json are rendered by BakeryItems.js to create bakery item cards on the webpage.


### How the User Triggers State Changes
By clicking or selecting corresponding buttons or bars, users can add to or remove from cart specific bakery items. The cart will automatically calculate the total price of the items. User can also browse through the menu by sorting with price or filtering with price and ingredients. 
