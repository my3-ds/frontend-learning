// Function Example
function runExample() {
  // Object Example
  let student = {
    name: "Mythri",
    age: 21,
    course: "JavaScript",
    greet: function() {
      return `Hello, my name is ${this.name} and I am learning ${this.course}.`;
    }
  };

  // String Example
  let str = "JavaScript is Powerful!";
  let strLength = str.length; // basic property
  let strUpper = str.toUpperCase();

  //template
  let message = `Student Info: ${student.name}, Age: ${student.age}, Course: ${student.course}`;

  // Example for number
  let num = 25.56789;
  let rounded = num.toFixed(2); // 25.57

  // Array creaton
  let fruits = ["Apple", "Banana", "Mango", "Orange"];

  // Basic Array Methods
  fruits.push("Grapes");  // adds to the last
  fruits.pop();           // removes the last element
  fruits.unshift("Kiwi"); // adds at starting of array
  fruits.shift();         // removes first element of the array

  // Array Search
  let hasMango = fruits.includes("Mango");
  let mangoIndex = fruits.indexOf("Mango");

  // Array Sorting Method
  fruits.sort(); // alphabetical order

  // Array Iteration
  let fruitList = "";
  fruits.forEach(function(fruit, index) {
    fruitList += `${index+1}. ${fruit} \n`;
  });

  // References of array
  let fruitsRef = fruits; // both point to same memory
  fruitsRef.push("Papaya");

  // The below comment is to display all
  document.getElementById("demo").innerText = 
    student.greet() + "\n\n" +
    `Original String: ${str}\n` +
    `Length: ${strLength}, Uppercase: ${strUpper}\n\n` +
    message + "\n\n" +
    `Number: ${num}, Rounded: ${rounded}\n\n` +
    `Fruits List:\n${fruitList}\n` +
    `Mango Found: ${hasMango} at Index: ${mangoIndex}\n` +
    `Updated Fruits: ${fruits.join(", ")}`;
}
