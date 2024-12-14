# Understanding TypeScript vs JavaScript Types

## Dynamic Typing in JavaScript
Being a dynamically typed language, JavaScript variables' types are determined at runtime. The Node runtime or the browser doesn't know the type of data until it executes the code. This is where TypeScript comes in handy, as it adds static type checking to our existing JavaScript projects.

### Example of JavaScript's Dynamic Typing:
```javascript
let value = "hello";  // type is string
value = 42;           // type changes to number
value = true;         // type changes to boolean
// JavaScript allows this without any errors
```

## TypeScript's Static Typing
When a parameter is typed, we are providing the TypeScript compiler with a data type for a certain parameter. TypeScript will make sure that this function is only called with an argument that satisfies this data type. i.e., When a parameter is typed (for example, `: number`), TypeScript will throw an error if you call the function with another incompatible type as an argument. This helps prevent bugs at compile time rather than runtime.

### Example of TypeScript's Type Safety:
```typescript
// TypeScript Version
function add(x: number, y: number): number {
    return x + y;
}

add(5, 10);      // Works fine
add("5", "10");  // TypeScript Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

## Key Benefits:
1. **Catch Errors Early**: TypeScript catches type-related errors during development, before the code runs
2. **Better IDE Support**: Enhanced autocomplete and refactoring capabilities
3. **Self-Documenting Code**: Types serve as inline documentation
4. **Safer Refactoring**: The compiler helps ensure type safety when making changes

## TypeScript Compilation
As TypeScript is a superset of JavaScript with types added to it. Any valid JavaScript code is a valid TypeScript code. Since browsers do not support TypeScript at the moment, when you write TypeScript code, you will need to compile it down to plain JavaScript so that the browser can execute it.

This means the TypeScript types that you use and define will disappear from the compiled JavaScript.

### Example of Compilation:
```typescript
// TypeScript code (example.ts)
interface User {
    name: string;
    age: number;
}

function greetUser(user: User): string {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

const user: User = {
    name: "John",
    age: 30
};

console.log(greetUser(user));
```

```javascript
// Compiled JavaScript (example.js)
function greetUser(user) {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

const user = {
    name: "John",
    age: 30
};

console.log(greetUser(user));
```

### Key Points About Compilation:
1. **Type Erasure**: All type annotations and interfaces are removed during compilation
2. **Runtime Behavior**: The compiled JavaScript behaves exactly the same as the TypeScript code
3. **Compilation Options**: TypeScript compiler (`tsc`) can target different JavaScript versions (ES5, ES6, etc.)
4. **Source Maps**: TypeScript can generate source maps to help with debugging


### Avoiding the `any` Type
TypeScript has a special type called `any` which allows variables to hold values of any data type. We should avoid using this as it disables the benefits of using TypeScript and makes our code error-prone again. 

Example:
```typescript
// Bad practice
let value: any = "hello";
value = 42;        // No error
value = true;      // No error
value.someMethod() // No error in TypeScript, but will fail at runtime!

// Good practice
let value: string = "hello";
value = 42;        // Error: Type 'number' is not assignable to type 'string'