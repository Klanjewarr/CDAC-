// function add(a,b){
//  console.log(a+b)
// }
function add(a:number,b:number):number//return type
{ 
return(a+b)
}

// console.log(add(10,20))

let n:number=10
let s:string="HELLLOOOO"

function addarr(arr:number[]):number//return type
{ 
    let add:number=0
 for(const num of arr ){
    add+= num
 }
 return(add)
}
let arr:number[]=[1,2,3]
console.log(addarr(arr))

enum OPERATIONS{
    ADD="+",
    SUBSTRACT="-",
    DIVIDE="/",
    MULTIPLY="*",
    REMINDER="%",
    POWEROF="**",
}

function calculator(op:OPERATIONS,n1:number,n2:number):void{
    switch(op){
        case OPERATIONS.ADD:
            console.log("Addition: "+(n1+n2))
            break
        case OPERATIONS.SUBSTRACT:
            console.log("Subtraction: "+(n1+n2))
            break
        case OPERATIONS.MULTIPLY:
            console.log("Multiplication: "+(n1*n2))
            break
        case OPERATIONS.DIVIDE:
            console.log("Divison: "+(n1/n2).toFixed(2))
            break
        case OPERATIONS.POWEROF:
            console.log("Power of: "+(n1**n2))
            break
        case OPERATIONS.REMINDER:
            console.log("Reminder: "+(n1%n2))
            break
        default:
            console.log("Invalid operation")
    }
}

calculator(OPERATIONS.ADD,10,45)
calculator(OPERATIONS.DIVIDE,10,45)
calculator(OPERATIONS.MULTIPLY,10,45)
calculator(OPERATIONS.POWEROF,10,45)
calculator(OPERATIONS.REMINDER,10,45)
calculator(OPERATIONS.SUBSTRACT,10,45)

enum digits{a,b,c,d,e}

interface Point={x:number, y:number}

const p1:Point={x:10,y:20}
const p2:Point={x:12,y:22}

console.log(digits)

const graphPoint:Point[]=[
    {x:10,y:20},
    {x:30,y:30},
    {x:330,y:23},
    {x:14,y:40},
    {x:13,y:20},
    {x:10,y:20},
    {x:10,y:20},
    {x:10,y:20},
    {x:10,y:20},
    {x:10,y:20},
    {x:10,y:20},
    {x:10,y:20}
]

// function