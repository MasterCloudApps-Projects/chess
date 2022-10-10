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

function ClosureB() {
    let sup = ClousureA();

    function publicMethod() {
        console.log("This is an overriden inherited public method.");
    }

    function publicMethod2() {
        console.log("This is an augmented inherited public method.");
        sup.publicMethod2();
    }

    function publicMethod3() {
        console.log("This is a new child-exclusive public method.");
    }

    return {
        ...sup,
        ...{
            publicMethod,
            publicMethod2,
            publicMethod3
        }
    }
}

let objB = ClosureB();
objB.publicMethod();
objB.publicMethod2();
objB.publicMethod3();
