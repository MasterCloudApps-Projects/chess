// Reference: https://www.w3schools.com/JS/js_object_constructors.asp
// https://www.geeksforgeeks.org/how-inheritance-works-in-constructor-functions-in-javascript/

function ConstructorA() {
  this.publicAttribute = "This is a public attribute.";

  // Attempting to use private attributes or functions like these turn the pattern into a pseudo clousure
  // Also they don't work propertly, even less on prototype based implementations like the one showcased here
  let privateAttribute = "This is a private attribute.";
  function privateFunction() {
    console.log("This is a private method.");
    console.log(privateAttribute);
  }
}
ConstructorA.prototype.publicMethod = function () {
  console.log("This is a public method.");
  console.log(this.publicAttribute);
};
ConstructorA.prototype.publicMethod2 = function () {
  console.log("This is another public method.");
};
ConstructorA.publicStaticMethod = function () {
  console.log("This is a static method.");
};
ConstructorA.STATIC_FIELD = "This is a static field";

console.log(ConstructorA.STATIC_FIELD);
ConstructorA.publicStaticMethod();
let objA = new ConstructorA();
console.log(objA.publicAttribute);
objA.publicMethod();

console.log("\nInheritance\n");

function ConstructorB() {
  ConstructorA.call(this);
}
ConstructorB.prototype = Object.create(ConstructorA.prototype);
ConstructorB.prototype.constructor = ConstructorB;
ConstructorB.prototype.publicMethod = function () {
  console.log("This is an overriden inherited public method.");
};
ConstructorB.prototype.publicMethod2 = function () {
  console.log("This is an augmentated inherited public method.");
  ConstructorA.prototype.publicMethod2.apply(this, arguments);
};
ConstructorB.prototype.publicMethod3 = function () {
  console.log("This is a new child-exclusive public method.");
};
ConstructorB.publicStaticMethod = ConstructorA.publicStaticMethod;
ConstructorB.STATIC_FIELD = ConstructorA.STATIC_FIELD;

ConstructorB.publicStaticMethod();
let objB = new ConstructorB();
objB.publicMethod();
objB.publicMethod2();
objB.publicMethod3();
