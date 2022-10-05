// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

// Clousure
// Pro: private attributes, private functions, public methods
// Limitations: No public attributes, must use getter/setter

function ClousureA() {

    let privateAttribute = "This is a private attribute.";

    function publicMethod() {
        console.log("This is a public method. ");
        privateFunction();
    }

    function publicMethod2() {
        console.log("This is another public method. ");
    }

    function privateFunction() {
        console.log("This is a private function. ");
        console.log(privateAttribute);
    }

    return {
        publicMethod,
        publicMethod2
    }

}
ClousureA.publicStaticMethod = function() {
    console.log("This is a static method.");
}
ClousureA.STATIC_FIELD = "This is a static field";

console.log(ClousureA.STATIC_FIELD);
ClousureA.publicStaticMethod();
let objA = ClousureA();
objA.publicMethod();