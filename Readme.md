Answer To The Question Number 1:
In JavaScript, var, let, and const are used to declare variables, but they are a little different in how they work.

var is the older way of creating variables. It is function-scoped, which means it can be used anywhere inside the function where it is declared. Also, a variable declared with var can be changed and even declared again.

let was introduced later in ES6. It works inside a block {}. This means it is only available in the block where it is defined. You can change its value, but you cannot declare it again in the same scope.

const is also block-scoped like let, but its value cannot be reassigned after it is set. It is usually used when the value should stay the same.


Answer To The Question Number 2:

The spread operator (...) is used to expand values from an array or object. It helps when you want to copy elements, combine arrays, or pass multiple values easily.

For example, if you have an array and you want to add more elements to it, you can use the spread operator to include the existing elements.

Example:

const arr1 = [1,2,3];
const arr2 = [...arr1,4,5];

Here the elements from arr1 are spread into arr2.



Answer To The Question Number 3:

These three methods are used to work with arrays.

map() goes through each element of an array and returns a new array after applying a function to every element.

filter() also checks each element, but it only returns the elements that match a specific condition.

forEach() simply loops through the array and performs an action for each element, but it does not return a new array.


Answer To The Question Number 4:

An arrow function is a shorter way of writing functions in JavaScript. It uses the => symbol and makes the code look cleaner.

It is mostly used for small functions or when working with array methods.
Example:

const multiply = (a,b) => {
  return a * b;
}