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


### tsconfig.json Configuration
The `tsconfig.json` file is the heart of a TypeScript project's configuration. It defines how the TypeScript compiler should process your code and what features should be enabled or disabled.

#### Basic Structure:
```json
{
  "compilerOptions": {
    "target": "es2020",        // What JS version to compile to
    "module": "commonjs",      // Module system to use
    "strict": true,           // Enable all strict type checking options
    "outDir": "./dist",       // Output directory for compiled files
    "rootDir": "./src",       // Root directory of source files
    "esModuleInterop": true,  // Enable interoperability between CommonJS and ES Modules
    "skipLibCheck": true,     // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true  // Ensure consistent casing in file names
  },
  "include": ["src/**/*"],    // Files to include
  "exclude": ["node_modules"] // Files to exclude
}
```

#### Important Compiler Options:
1. **Type Checking**
   - `strict`: Enables strict type checking
   - `noImplicitAny`: Error on expressions with implied `any` type
   - `strictNullChecks`: Enable strict null checks

2. **Module Resolution**
   - `baseUrl`: Base directory for module resolution
   - `paths`: Path mapping for module imports
   - `moduleResolution`: Module resolution strategy

3. **Output Control**
   - `outDir`: Output directory for compiled files
   - `rootDir`: Root directory of input files
   - `sourceMap`: Generate source maps for debugging

4. **JavaScript Support**
   - `allowJs`: Allow JavaScript files compilation
   - `checkJs`: Type check JavaScript files
   - `jsx`: Support for JSX

#### Example with Explanations:
```json
{
  "compilerOptions": {
    // Modern JavaScript Features
    "target": "es2020",          // Use modern JavaScript features
    "module": "commonjs",        // Use CommonJS module system
    
    // Strict Type Checking
    "strict": true,              // Enable all strict type checks
    "noImplicitAny": true,      // Error on implied 'any' type
    "strictNullChecks": true,   // Enable strict null checks
    
    // Module Resolution
    "esModuleInterop": true,    // Better module interop
    "moduleResolution": "node", // Use Node.js module resolution
    
    // Output Configuration
    "outDir": "./dist",         // Output to dist folder
    "rootDir": "./src",         // Source code in src folder
    "sourceMap": true          // Generate source maps
  },
  "include": [
    "src/**/*"                  // Include all files in src
  ],
  "exclude": [
    "node_modules",             // Exclude node_modules
    "**/*.spec.ts"             // Exclude test files
  ]
}
```

#### Best Practices:
1. Always enable `strict` mode for better type safety
2. Use `sourceMap` during development for better debugging
3. Properly configure `include` and `exclude` to manage compilation scope
4. Set appropriate `target` based on your deployment environment

For more detailed options, refer to the [TypeScript Configuration Reference](https://www.typescriptlang.org/tsconfig)


### TypeScript ESLint and Code Quality
TypeScript ESLint ([typescript-eslint.io](https://typescript-eslint.io/)) is a powerful static code analysis tool that helps maintain code quality in TypeScript projects. It examines your code without executing it, identifying potential issues and enforcing best practices.

#### Setting up TypeScript ESLint
```json
// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/ban-types": "error"
  }
}
```

#### TypeScript Directive Comments
TypeScript provides special comment directives that give instructions to the compiler. While useful in certain situations, these should be used sparingly as they can bypass TypeScript's type safety.

1. **@ts-ignore**
```typescript
// Bad practice: Silently ignoring type errors
// @ts-ignore
const result = someFunction('invalid argument');

// Better practice: Fix the type error or explain why it's necessary
// @ts-ignore: Third-party library type definition issue #123
const result = someFunction('invalid argument');
```

2. **@ts-nocheck**
```typescript
// @ts-nocheck
// All TypeScript errors in this file will be ignored
// Use with extreme caution, preferably never
```

3. **@ts-expect-error**
```typescript
// Good practice: Used in test files to verify error conditions
// @ts-expect-error: This should fail type checking
const invalidAssignment: string = 42;

// Error: Directive unused as code is valid
// @ts-expect-error
const validCode: string = "This is fine";
```

#### Important ESLint Rules

1. **@typescript-eslint/no-explicit-any**
```typescript
// Bad Practice
function processData(data: any) {
    return data.someProperty;
}

// Good Practice
interface DataType {
    someProperty: string;
}
function processData(data: DataType) {
    return data.someProperty;
}
```

2. **@typescript-eslint/ban-ts-comment**
```typescript
// Bad Practice: Blindly ignoring TypeScript errors
// @ts-ignore
const unsafe = someUntypedFunction();

// Good Practice: Document why the directive is necessary
// @ts-ignore: Issue #123 - Third-party type definitions need updating
const temporary = someUntypedFunction();
```

3. **@typescript-eslint/ban-types**
```typescript
// Bad Practice: Using object wrapper types
const str: String = new String("Hello");
const num: Number = new Number(42);

// Good Practice: Using primitive types
const str: string = "Hello";
const num: number = 42;

// Example of why wrapper types are problematic:
console.log(typeof new String("Hello")); // "object"
console.log(typeof "Hello");             // "string"
```

#### Best Practices:
1. Enable strict ESLint rules from the start of your project
2. Avoid using directive comments (@ts-ignore, @ts-nocheck) unless absolutely necessary
3. Document why you're using any directive comments
4. Use @ts-expect-error instead of @ts-ignore when writing tests
5. Always use primitive types (string, number, boolean) instead of their object wrapper versions


### Primitive Types in TypeScript
TypeScript supports all seven JavaScript primitive types, providing type-safety and better tooling support for each one.

#### Available Primitive Types:
```typescript
// 1. string: Textual data
const name: string = "John";
const greeting: string = `Hello ${name}`; // Template literals work too

// 2. number: Both integers and floating-point values
const age: number = 25;
const price: number = 99.99;
const binary: number = 0b1010; // Binary
const hex: number = 0xFF;      // Hexadecimal

// 3. boolean: true or false
const isActive: boolean = true;
const isLoggedIn: boolean = false;

// 4. undefined: Uninitialized value
let userData: undefined = undefined;
let userEmail: string | undefined; // Common in optional properties

// 5. null: Deliberate absence of value
const userSettings: null = null;
let config: string | null = null; // Nullable string

// 6. bigint: Large integers (ES2020)
const largeNumber: bigint = 9007199254740991n;
const anotherBigInt: bigint = BigInt(9007199254740991);

// 7. symbol: Unique identifiers
const sym1: symbol = Symbol("key");
const sym2: symbol = Symbol("key");
console.log(sym1 === sym2); // false, symbols are always unique
```

#### null vs undefined
```typescript
// undefined: Variable declared but not assigned
let userAge: number | undefined;
console.log(userAge); // undefined

// null: Explicit absence of value
let userProfile: { name: string; age: number | null } = {
    name: "John",
    age: null  // Explicitly set to null (user hasn't provided age)
};
```

#### Type Annotations and Inference

1. **Explicit Type Annotations**
```typescript
// Explicitly telling TypeScript the type
const username: string = "sam";
const age: number = 20;
const isActive: boolean = true;

// Arrays with type annotations
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["John", "Jane"];
```

2. **Type Inference**
```typescript
// TypeScript automatically infers the types
const username = "sam";          // inferred as string
const age = 20;                  // inferred as number
const isActive = true;           // inferred as boolean

// Type inference with operations
const sum = 10 + 20;            // inferred as number
const greeting = "Hello " + username;  // inferred as string
const numbers = [1, 2, 3];      // inferred as number[]

// Type inference in functions
const double = (n: number) => n * 2;  // Return type inferred as number
```

#### Best Practices:
1. **Use Type Inference When Possible**
```typescript
// Good: Let TypeScript infer obvious types
const name = "John";
const age = 25;

// Good: Add type annotations for clarity or when inference isn't obvious
function processUser(user: { name: string; age: number }) {
    // ...
}
```

2. **Be Explicit When Needed**
```typescript
// Good: Explicit types for function parameters
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Good: Explicit types for arrays with specific contents
const mixedArray: (string | number)[] = ["hello", 42];
```

3. **Null and Undefined Handling**
```typescript
// Good: Use union types with null/undefined
function findUser(id: string): User | undefined {
    // Return undefined if user not found
}

// Good: Explicit null checks
function processUser(user: User | null) {
    if (user === null) {
        return "No user provided";
    }
    return user.name;
}