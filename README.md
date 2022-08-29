# Patterned NodeJS
**Software Design Patterns implemented on JavaScript using NodeJS.**

# Technical Documentation
This work serves as a study of several well-known software design patterns implemented on the JavaScript language (by using the NodeJS framework), all applied in the context of a simple chess game.

## Table of Contents
- [Introduction](#introduction)
- [Style Guide](#style-guide)
- [Project Structure](#project-structure)
- [Design Pattern Implementation](#design-pattern-implementation)

## Introduction
TBD

## Style Guide
Due to the inherent nature and versatility of implementation of design patterns, as well as the multitude of alternatives when using JavaScript, a decision was made to define a coding style guide to embrace consistency across the whole project.

The main architecture will be structured using **ES6 Modules**. To achieve this, the following style and code conventions are to be followed:

### Creating a module:
A single file will be created which will contain the new module. Filename must be written using **lowercaseCamelCase along with the .js extension** (ex: *exampleModule.js*). Module names must also be descriptive of their functionality or their relation to the domain model.

Within the file itself, methods and functions must be declared as:
```
function functionNameOnLowerCaseCamelCase (parameter1, parameter2) {
    // Function code
}
```
Function names must be descriptive of their behavior and use **verbs** that make said behavior easily understandable.

All code indentation within JavaScript modules must be done **using spaces**.

### Handling exports:
**None of the functions or variables in a module must make use of the export keyword**. All exports for the module will be handled at the end of the file in the following fashion:
```
export {
    function1,
    function2,
    constant1,
}
```
Using the default export is to be avoided when possible, priorizing usage of named exports.

### Importing modules:
Imports must be specified at the beggining of a file:
```
import { function1, function2 } from ‘./ExampleModule.js’;
```
The usage of **require() is to be avoided**.

### Using classes, OOP, and other tools:
ES6 classes should be avoided and JS modules are a natural alternative. [Stop using javascript classes](https://medium.com/giant-machines/stop-using-javascript-classes-d0b6890ef097) explains why classes are not necessary and how to implement the alternative.
### Encapsulation:
Encapsulation can be dealt with by making use of **clousures**.
```
function createCounter () {
  let counter;
  function getCounter(){
    return counter;
  }
  function incrementCounter(){
    counter++;
  }
  return {
    getCounter,
    incrementCounter
  };
}
```
### Dependency injection:
Dependency injection can also be approached with ES modules since functions can also receive parameters. Classes must be used only when it is not possible to implement a specific design pattern otherwise.

## Project Structure
TBD

## Design Pattern Implementation
### Creational patterns
- [Factory]()
- [Factory Method]()
- [Builder]()
### Behavioral patterns
- [Strategy](#strategy-pattern)
- [Memento]()
### Structural patterns
- [Composite]()
- [Decorator]()

#### Factory pattern
Piece creation is handled by color factories.

#### Factory method
Piece factories define concrete piece objects by using a factory method only implemented on child modules.

#### Builder
Board creation and initialization is done via a builder pattern.

#### Strategy pattern
Used to manage how pieces move across the board. As so, several movement strategies exist to implement each kind of piece, which can also be swapped during execution. This is the case of the pawn piece turning into a queen when reaching the end of the board, which was solved smoothly by using this pattern.

#### Memento
Undo/Redo functionality is implemented by a memento pattern, which is also used to simulate movements when calculating checkmate possibilities.

#### Composite
The Queen movement strategy is implemented via a composite movement of both Rook and Bishop movement strategies.

#### Decorator
Attributes, and some functionality specific to certain piece types, are added via a series of decorator functions called from the piece factory during piece creation.

![Strategy pattern ES6 module structure diagram](.readme/movementStrategyPatternDiagram.png)
