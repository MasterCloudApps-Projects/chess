export default function createObjectA(parameter) {
    let privateAttributeX = parameter;

    function privateMethod() {
        privateAttributeX++;
    }

    function publicMethod1() {
        privateMethod();
        console.log(`method1: privateAttributeX: ${privateAttributeX}`);
    }

    function publicMethod2() {
        privateMethod();
        console.log(`method2: privateAttributeX: ${privateAttributeX}`);
    }

    function parentExclusiveMethod() {
        privateMethod();
        console.log(`PARENT EXCLUSIVE: privateAttributeX: ${privateAttributeX}`);
    }

    return {
        publicMethod1,
        publicMethod2,
        parentExclusiveMethod
    }
}