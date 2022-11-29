// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

function closureA() {
    let that = {
        privateAttribute: "This is a private attribute.",
        privateMethod: function () {
            console.log("This is a private method.");
            console.log(that.privateAttribute);
        }
    }

    function publicMethod() {
        console.log("This is a public method. ");
        console.log(that.privateAttribute);
        that.privateMethod();
    }

    return {
        publicMethod
    }
}

closureA.publicStaticMethod = function(){
    console.log("This is a static method.");
}

closureA.STATIC_FIELD = "This is a static field";
console.log(closureA.STATIC_FIELD);

closureA.publicStaticMethod();

let objA = new closureA();
//console.log(objA.#privateAttribute); // Will print undefined
objA.publicMethod();
// objA.privateMethod(); // Will throw not a function error
