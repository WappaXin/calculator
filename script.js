function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a*b;
}

function division(a,b){
    if(a/b === Infinity){return "This eqauates to the amount of shit in your brain i.e Infinite." ;}
    else{return a/b ;}
}

function operate(op,c,d){
    if(op === '+'){return add(c,d);};
    if(op === '-'){return subtract(c,d);};
    if(op === '*'){return multiply(c,d);};
    if(op === '/'){return division(c,d);};
}

let numberSelector = document.querySelectorAll(".number");
let symbolSelector = document.querySelectorAll(".symbol");

let display = document.querySelector(".display");
let equalTo = document.querySelector(".equalTo");
let clear = document.querySelector(".clear");
let backSpace = document.querySelector(".backSpace");
let dotButton = document.querySelector(".dot");

let displayVariable;

numberSelector.forEach((num) => num.addEventListener("click", () => {
    display.textContent += num.textContent;
    displayVariable = display.textContent;
} ));

symbolSelector.forEach((symb) => symb.addEventListener("click", () => {
    display.textContent += symb.textContent;
    displayVariable = display.textContent;
} ));

equalTo.addEventListener("click", () => {
    if( /^[a-z]/i.test(display.textContent[0]) === true )
        {display.textContent = "Still not able to write a proper equation . Clear the Damn... text! ." ; return; }
    if(display.textContent === "=")
        {display.textContent = "It equals to the number of braincells in your brain i.e nothing. Idiot!"; return; }

    let firstNum = parseFloat(displayVariable);
    let o = parseFloat(displayVariable).toString().length;
    
    while( Number.isInteger(parseInt(displayVariable.slice(o + 1, o + 2))) === false ){
        if(displayVariable.slice(o + 1, o + 2) === ''){break;};
        o++ ;}
    if(displayVariable.slice(o + 1, o + 2) === ''){return display.textContent = "Still not able to write a proper equation.. huh!" ;}

    let oper = displayVariable.slice( o , o + 1 );
    let secondNum = parseFloat(displayVariable.slice(o + 1));
    
    let firstResult =  operate(oper,firstNum,secondNum);

    let remove1 = (o + 1 + secondNum.toString.length );
    displayVariable = displayVariable.slice(remove1);
    
    if(displayVariable[0] === '=') { display.textContent = firstResult;}

    while(displayVariable[0] !== '=' ){ 
        
        firstNum = firstResult;

        let x = 1;
        while( Number.isInteger(parseInt(displayVariable.slice(x, x + 1))) === false )
            {if(displayVariable.slice(x, x + 1)){break;} x++; }
        if(displayVariable.slice(x, x + 1) === ''){return display.textContent = "Still not able to write a proper equation.. huh!" ;}

        oper = displayVariable.slice(x - 1, x);
        secondNum = parseFloat(displayVariable.slice(1));

        firstResult = operate(oper,firstNum,secondNum);

        let remove2 =  x - 1 + 1 + secondNum.length;
        if(displayVariable[remove2] === '='){ displayVariable = displayVariable.slice(remove2); display.textContent = firstResult;}
        if(displayVariable[0] !== '='){ displayVariable = displayVariable.slice(remove2); }
    }
});

clear.addEventListener("click" , () => {
    display.textContent = "" ;
    dotButton.disabled = false;
})

backSpace.addEventListener("click" , () => {
    let backSpaceArray = display.textContent.split("");
    backSpaceArray.pop();
    display.textContent = backSpaceArray.join("");
});

dotButton.addEventListener("click" , () => {
    if(display.textContent.indexOf('.') === -1)
        {display.textContent += dotButton.textContent; displayVariable = display.textContent;}
    else if(display.textContent.indexOf('.') !== -1)
        {dotButton.disabled = true;}
    }
)
