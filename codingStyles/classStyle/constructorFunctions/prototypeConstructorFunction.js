// Prototype constructor function
// Pro: public attributes, public methods defined on prototype are only replicated once on memory 
// Limitations: No private attributes. No real private methods (must be functions), calling privateFunctions can be messy from different prototype methods. 

function Clazz(parameter) {
    this.publicAttributeX = parameter;
    this.publicAttributeY = 0;
}

Clazz.prototype.publicMethod = function () {
    privateFunction(this);
    console.log(`publicAttributeX: ${this.publicAttributeX} - publicAttributeY: ${this.publicAttributeY}`);

    function privateFunction(object) {
        object.publicAttributeX++;
        object.publicAttributeY++;
    }
}

const object = new Clazz(1);
object.publicMethod();
object.publicAttributeX = 666;
console.log(`object.publicAttributeX: ${object.publicAttributeX}`);
object.publicMethod();
