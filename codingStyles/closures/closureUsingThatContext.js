// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

function clousureA() {
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


clousureA.publicStaticMethod = function(){
    console.log("This is a static method.");
}
clousureA.STATIC_FIELD = "This is a static field";

console.log(clousureA.STATIC_FIELD);
clousureA.publicStaticMethod();
let objA = new clousureA();
console.log(objA.publicAttribute);
//console.log(objA.#privateAttribute); // Will print undefined
objA.publicMethod();
// objA.privateMethod(); // Will throw not a function error
