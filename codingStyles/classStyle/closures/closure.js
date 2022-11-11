// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

// Closure
// Pro: private attributes, private functions, public methods
// Limitations: No public attributes, must use getter/setter

function ClosureA() {

    let privateAttribute = "This is a private attribute.";

    function publicMethod() {
        console.log("This is a public method. ");
        privateFunction();
    }

    function privateFunction() {
        console.log("This is a private function. ");
        console.log(privateAttribute);
    }

    return {
        publicMethod,
        publicMethod2: function() {
            console.log("This is another public method. ");
        }
    }
}

ClosureA.STATIC_FIELD = "This is a static field";
console.log(ClosureA.STATIC_FIELD);

ClosureA.publicStaticMethod = function() {
    console.log("This is a static method.");
}

ClosureA.publicStaticMethod();

let objA = ClosureA();
objA.publicMethod();

