"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function add(a,b){
//  console.log(a+b)
// }
function add(a, b) {
    return (a + b);
}
// console.log(add(10,20))
let n = 10;
let s = "HELLLOOOO";
function addarr(arr) {
    let add = 0;
    for (const num of arr) {
        add += num;
    }
    return (add);
}
let arr = [1, 2, 3];
console.log(addarr(arr));
var OPERATIONS;
(function (OPERATIONS) {
    OPERATIONS["ADD"] = "+";
    OPERATIONS["SUBSTRACT"] = "-";
    OPERATIONS["DIVIDE"] = "/";
    OPERATIONS["MULTIPLY"] = "*";
    OPERATIONS["REMINDER"] = "%";
    OPERATIONS["POWEROF"] = "**";
})(OPERATIONS || (OPERATIONS = {}));
function calculator(op, n1, n2) {
    switch (op) {
        case OPERATIONS.ADD:
            console.log("Addition: " + (n1 + n2));
            break;
        case OPERATIONS.SUBSTRACT:
            console.log("Subtraction: " + (n1 + n2));
            break;
        case OPERATIONS.MULTIPLY:
            console.log("Multiplication: " + (n1 * n2));
            break;
        case OPERATIONS.DIVIDE:
            console.log("Divison: " + (n1 / n2).toFixed(2));
            break;
        case OPERATIONS.POWEROF:
            console.log("Power of: " + (n1 ** n2));
            break;
        case OPERATIONS.REMINDER:
            console.log("Reminder: " + (n1 % n2));
            break;
        default:
            console.log("Invalid operation");
    }
}
calculator(OPERATIONS.ADD, 10, 45);
calculator(OPERATIONS.DIVIDE, 10, 45);
calculator(OPERATIONS.MULTIPLY, 10, 45);
calculator(OPERATIONS.POWEROF, 10, 45);
calculator(OPERATIONS.REMINDER, 10, 45);
calculator(OPERATIONS.SUBSTRACT, 10, 45);
var digits;
(function (digits) {
    digits[digits["a"] = 0] = "a";
    digits[digits["b"] = 1] = "b";
    digits[digits["c"] = 2] = "c";
    digits[digits["d"] = 3] = "d";
    digits[digits["e"] = 4] = "e";
})(digits || (digits = {}));
{
    x: number, y;
    number;
}
const p1 = { x: 10, y: 20 };
const p2 = { x: 12, y: 22 };
console.log(digits);
const graphPoint = [
    { x: 10, y: 20 },
    { x: 30, y: 30 },
    { x: 330, y: 23 },
    { x: 14, y: 40 },
    { x: 13, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: 20 }
];
// function
//# sourceMappingURL=app.js.map