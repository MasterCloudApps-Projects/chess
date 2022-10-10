const object = new Clazz(1);
object.publicMethod();
object.privateAttributeX = 666;
console.log(`object.privateAttributeX: ${object.privateAttributeX}`);
object.publicMethod();

// Constructor function turns into clousure:
// By using function context to keep private attributes (let privateAttributeY), the function context is kept on memory like on a clousure.

function Clazz(privateAttributeX) {
    let privateAttributeY = 0;
    this.publicMethod = function () {
            privateFunction();
            console.log(`privateAttributeX: ${privateAttributeX} - privateAttributeY: ${privateAttributeY}`);
    }

    function privateFunction() {
        privateAttributeX++;
        privateAttributeY++;
    }
}