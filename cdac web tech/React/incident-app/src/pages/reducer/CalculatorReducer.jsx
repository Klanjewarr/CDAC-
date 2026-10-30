
import { useState, useReducer } from "react";
import { IntTextField } from "../../components/FormElements";

export function CalculatorReducer() {

    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);

    const initialStates = {
        result: 0
    };

    const reducer = (state, action) => {

        const { n1, n2 } = action.payload;

        switch (action.type) {

            case "add":
                return { ...state, result: n1 + n2 };

            case "subtract":
                return { ...state, result: n1 - n2 };

            case "multiply":
                return { ...state, result: n1 * n2 };

            case "divide":
                if (n2 === 0) {
                    return { ...state, result: "Cannot divide by zero" };
                }
                return { ...state, result: n1 / n2 };

            case "pow":
                return { ...state, result: n1 ** n2 };

            case "mod":
                if (n2 === 0) {
                    return { ...state, result: "Cannot divide by zero" };
                }
                return { ...state, result: n1 % n2 };

            case "fact": {
                if (n1 < 0 || !Number.isInteger(n1)) {
                    return { ...state, result: "Enter a non-negative integer" };
                }

                let f = 1;

                for (let i = 1; i <= n1; i++) {
                    f = f * i;
                }

                return { ...state, result: f };
            }

            case "evenOdd":
                if (n1 % 2 === 0) {
                    return { ...state, result: "Even" };
                } else {
                    return { ...state, result: "Odd" };
                }

            // 1. Reverse a number
            case "rev": {
                let num = Math.abs(n1);
                let rev = 0;

                while (num > 0) {
                    let digit = num % 10;
                    rev = rev * 10 + digit;
                    num = Math.floor(num / 10);
                }

                return {
                    ...state,
                    result: n1 < 0 ? -rev : rev
                };
            }

            // 2. Sum of digits
            case "sum": {
                let num = Math.abs(n1);
                let sum = 0;

                while (num > 0) {
                    sum = sum + (num % 10);
                    num = Math.floor(num / 10);
                }

                return { ...state, result: sum };
            }

            // 3. Count digits
            case "count": {
                let num = Math.abs(n1);
                let count = 0;

                do {
                    count++;
                    num = Math.floor(num / 10);
                } while (num > 0);

                return { ...state, result: count };
            }

            // 4. Palindrome number
            case "palindrome": {
                if (!Number.isInteger(n1)) {
                    return { ...state, result: "Enter an integer" };
                }

                let num = Math.abs(n1);
                let temp = num;
                let rev = 0;

                while (temp > 0) {
                    let digit = temp % 10;
                    rev = rev * 10 + digit;
                    temp = Math.floor(temp / 10);
                }

                let isPalindrome = n1 >= 0 && num === rev;

                return {
                    ...state,
                    result: isPalindrome ? "Palindrome" : "Not Palindrome"
                };
            }

            // 5. Armstrong number
            case "armstrong": {
                if (!Number.isInteger(n1) || n1 < 0) {
                    return { ...state, result: "Enter a non-negative integer" };
                }

                let num = n1;
                let temp = num;
                let digits = String(num).length;
                let sum = 0;

                while (temp > 0) {
                    let digit = temp % 10;
                    sum = sum + digit ** digits;
                    temp = Math.floor(temp / 10);
                }

                return {
                    ...state,
                    result: sum === num ? "Armstrong" : "Not Armstrong"
                };
            }

            // 6. Prime number
            case "prime": {
                let isPrime = n1 > 1 && Number.isInteger(n1);

                for (let i = 2; i <= Math.sqrt(n1) && isPrime; i++) {
                    if (n1 % i === 0) {
                        isPrime = false;
                    }
                }

                return {
                    ...state,
                    result: isPrime ? "Prime" : "Not Prime"
                };
            }

            // 7. Sum of even digits
            case "sumEven": {
                let num = Math.abs(n1);
                let sum = 0;

                while (num > 0) {
                    let digit = num % 10;

                    if (digit % 2 === 0) {
                        sum = sum + digit;
                    }

                    num = Math.floor(num / 10);
                }

                return { ...state, result: sum };
            }

            // 8. Sum of odd digits
            case "sumOdd": {
                let num = Math.abs(n1);
                let sum = 0;

                while (num > 0) {
                    let digit = num % 10;

                    if (digit % 2 !== 0) {
                        sum = sum + digit;
                    }

                    num = Math.floor(num / 10);
                }

                return { ...state, result: sum };
            }

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialStates);

    return (
        <>
            <div className="alert shadow-lg alert-secondary w-50 mx-auto">

                <h1>Result = {state.result}</h1>

                <IntTextField
                    stateFunction={setN1}
                    stateVar={n1}
                    pHolder={"Enter first number"}
                />

                <IntTextField
                    stateFunction={setN2}
                    stateVar={n2}
                    pHolder={"Enter second number"}
                />

                <button onClick={() => dispatch({ type: "add", payload: { n1, n2 } })}>
                    Add
                </button>

                <button onClick={() => dispatch({ type: "subtract", payload: { n1, n2 } })}>
                    Sub
                </button>

                <button onClick={() => dispatch({ type: "multiply", payload: { n1, n2 } })}>
                    Multi
                </button>

                <button onClick={() => dispatch({ type: "divide", payload: { n1, n2 } })}>
                    Div
                </button>

                <button onClick={() => dispatch({ type: "pow", payload: { n1, n2 } })}>
                    Pow
                </button>

                <button onClick={() => dispatch({ type: "mod", payload: { n1, n2 } })}>
                    Mod
                </button>

                <button onClick={() => dispatch({ type: "fact", payload: { n1, n2 } })}>
                    Factorial
                </button>

                <button onClick={() => dispatch({ type: "evenOdd", payload: { n1, n2 } })}>
                    Even/Odd
                </button>

                <button onClick={() => dispatch({ type: "rev", payload: { n1, n2 } })}>
                    Reverse
                </button>

                <button onClick={() => dispatch({ type: "sum", payload: { n1, n2 } })}>
                    Sum of Digits
                </button>

                <button onClick={() => dispatch({ type: "count", payload: { n1, n2 } })}>
                    Count Digits
                </button>

                <button onClick={() => dispatch({ type: "palindrome", payload: { n1, n2 } })}>
                    Palindrome
                </button>

                <button onClick={() => dispatch({ type: "armstrong", payload: { n1, n2 } })}>
                    Armstrong
                </button>

                <button onClick={() => dispatch({ type: "prime", payload: { n1, n2 } })}>
                    Prime
                </button>

                <button onClick={() => dispatch({ type: "sumEven", payload: { n1, n2 } })}>
                    Sum of Even Digits
                </button>

                <button onClick={() => dispatch({ type: "sumOdd", payload: { n1, n2 } })}>
                    Sum of Odd Digits
                </button>

                {/* <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"primary"} text={"+"}/>
         <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"primary"} text={"-"}/>
         <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"danger"} text={"/"}/>
         <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"warning"} text={"×"}/>
         <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"warning"} text={"POW"}/> */}

            </div>
        </>
    );
}
