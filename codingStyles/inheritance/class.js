// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

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

class ClassB extends ClassA {

    constructor() {
        super();
    }

    publicMethod() {
        console.log("This is an overriden inherited public method.");
    }

    publicMethod2() {
        console.log("This is an augmented inherited public method.");
        super.publicMethod2();
    }

    publicMethod3() {
        console.log("This is a new child-exclusive public method.");
    }
}

ClassB.publicStaticMethod();
let objB = new ClassB();
objB.publicMethod();
objB.publicMethod2();
objB.publicMethod3();
