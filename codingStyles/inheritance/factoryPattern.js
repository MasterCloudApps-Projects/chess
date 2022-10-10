function CreateA() { 

    // Attempting to use private attributes or functions like these turn the pattern into a pseudo clousure
    let privateAttribute = "A This is a private attribute.";
    function privateFunction() {
        console.log("A This is a private function.");
        console.log(privateAttribute);
    }

    return { 
        publicAttribute: "A This is a public attribute.",
        publicMethod: function () { 
            console.log("A This is a public method.");
            privateFunction();        
        },
        publicMethod2: function () {
            console.log("This is another public method. ");
        }
    }
}

function CreateB() {
    let B = CreateA();

    B.publicAttribute = "B This is an overriden public attribute."

    B.publicMethod = function () {
        console.log("This is an overriden inherited public method.");
    }

    B.__publicMethod2 = B.publicMethod2;
    B.publicMethod2 = function () {
        console.log("This is an augmentated inherited public method.");
        B.__publicMethod2();
    }

    B.publicMethod3 = function () {
        console.log("This is a new child-exclusive public method.");
    }

    return B;
}

let objB = CreateB();
objB.publicMethod();
objB.publicMethod2();
objB.publicMethod3();