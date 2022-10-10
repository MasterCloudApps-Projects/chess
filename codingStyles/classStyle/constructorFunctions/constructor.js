// Reference: https://www.w3schools.com/JS/js_object_constructors.asp
// https://www.geeksforgeeks.org/how-inheritance-works-in-constructor-functions-in-javascript/

// Constructor function
// Pro: public attributes, public methods
// Limitations: No private methods (must be functions, no 'this' context), no private attributes

function ConstructorA(parameter) {

    this.publicAttribute = parameter;

    this.publicMethod = function() {
        console.log("This is a public method. ");
        privateFunction(this.publicAttribute);
    }

    this.publicMethod2 = function() {
        console.log("This is another public method. ");
    }

    function privateFunction(param) {
        console.log("This is a private function.");
        console.log(param);
    }
}

ConstructorA.publicStaticMethod = function () {
    console.log("This is a static method.");
}
ConstructorA.STATIC_FIELD = "This is a static field";

console.log(ConstructorA.STATIC_FIELD);
ConstructorA.publicStaticMethod();
let objA = new ConstructorA(2);
objA.publicMethod();

