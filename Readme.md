Answer To The Question Number 1:
In JavaScript, var, let, and const are used to declare variables, but they are a little different in how they work.

var is the older way of creating variables. It is function-scoped, which means it can be used anywhere inside the function where it is declared. Also, a variable declared with var can be changed and even declared again.

let was introduced later in ES6. It works inside a block {}. This means it is only available in the block where it is defined. You can change its value, but you cannot declare it again in the same scope.

const is also block-scoped like let, but its value cannot be reassigned after it is set. It is usually used when the value should stay the same.


