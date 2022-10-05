import createObjectA from './classA.js';

export default function createObjectB(parameter1, parameter2) {
    const returned = createObjectA(parameter1);

    let privateAttributeY = parameter2;

    function publicMethod1() {
        console.log(`Overriden method: privateAttributeY: ${privateAttributeY}`);
    }

    function publicMethod2() {
        console.log(`Augmentated method: privateAttributeY: ${privateAttributeY}`);
        returned.publicMethod2();
    }

    function exclusiveMethod() {
        console.log(`Exclusive method: ${privateAttributeY}`);
    }

    return {
        ...returned,
        ...{
            publicMethod1,
            exclusiveMethod,
            publicMethod2,
        }
    }
}

let test = createObjectB(5, 6);
test.publicMethod1();
test.publicMethod2();
test.exclusiveMethod();
test.parentExclusiveMethod();