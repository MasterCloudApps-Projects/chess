// Reference:
// https://www.geeksforgeeks.org/what-are-factory-functions-in-javascript/
// https://www.javascripttutorial.net/javascript-factory-functions/

function CreateA() {
    return {
        publicAttribute: "A This is a public attribute.",
        publicMethod: function () {
            console.log("A This is a public method.");
        },
        publicMethod2: function () {
            console.log("This is another public method. ");
        }
    }
}

CreateA.publicStaticMethod = function() {
    console.log("This is a static method.");
}

CreateA.STATIC_FIELD = "This is a static field";
console.log(CreateA.STATIC_FIELD);

CreateA.publicStaticMethod();

let objA = new CreateA();
console.log(objA.publicAttribute);
objA.publicMethod();

console.log('\nInheritance\n');

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
CreateB.publicStaticMethod = CreateA.publicStaticMethod;
CreateB.STATIC_FIELD = CreateA.STATIC_FIELD;

CreateB.publicStaticMethod();
let objB = CreateB();
objB.publicMethod();
objB.publicMethod2();
objB.publicMethod3();
