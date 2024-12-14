// Basic Types Exercise
// 1. Variable declarations with type annotations
let firstName: string = "John";
let age: number = 30;
let isStudent: boolean = false;

// 2. Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// 3. Tuple
let person: [string, number] = ["John", 30];

// 4. Function with type annotations
function add(x: number, y: number): number {
    return x + y;
}

// 5. Object type
let user: {
    name: string;
    age: number;
    email?: string;  // Optional property
} = {
    name: "John",
    age: 30
};

// Practice Exercises:
// TODO: 1. Create an array of mixed types (union type)
// TODO: 2. Write a function that takes a string array and returns the longest string
// TODO: 3. Create an object type for a product with properties: id, name, price, and optional description

// Write your solutions below:

// Exercise 1: Mixed types array


// Exercise 2: Function to find longest string


// Exercise 3: Product type and object
