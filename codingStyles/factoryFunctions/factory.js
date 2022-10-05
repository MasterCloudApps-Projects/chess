const object = createObject(1);
object.publicInstanceMethod();
object.privateAttributeX = 666;
console.log(`object.privateAttributeX: ${object.privateAttributeX}`);
object.publicInstanceMethod();

// Factory
// Pro: public & private attributes, public methods, private 'methods'
// Limitations: No real 'this' context, multiple objects on memory (function context, 'that' context, returned object)

function createObject(parameter) {
    let that = {
        privateAttributeX: parameter,
        privateAttributeY: 0,
        privateMethod: function () {
            this.privateAttributeX++;
            this.privateAttributeY++;
        }
    }
    return {
        publicInstanceMethod: function () {
            that.privateMethod();
            console.log(`privateAttributeX: ${that.privateAttributeX} - privateAttributeY: ${that.privateAttributeY}`);
        }
    }
}