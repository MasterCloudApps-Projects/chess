// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

// All examples must have:
// Public, private, static attributes
// Public, private, static methods
// Inherited, overriden, augmented & child exclusive methods

class ClassA {

    static STATIC_FIELD = "This is a static field";
    #privateAttribute; // Private attributes must be defined prior to use
    publicAttribute;

    constructor () {
        this.publicAttribute = "This is a public attribute.";
        this.#privateAttribute = "This is a private attribute.";
    }

    publicMethod() {
        console.log("This is a public method. ");
        this.#privateMethod();
    }

    publicMethod2() {
        console.log("This is another public method. ");
    }

    #privateMethod() {
        console.log("This is a private method.");
        console.log(this.#privateAttribute);
    }

    static publicStaticMethod() {
        console.log("This is a static method.");
    }

}

console.log(ClassA.STATIC_FIELD);
ClassA.publicStaticMethod();
let objA = new ClassA();
console.log(objA.publicAttribute);
//console.log(objA.#privateAttribute); // Will print undefined
objA.publicMethod();
// objA.privateMethod(); // Will throw not a function error