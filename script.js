// Variables and variables conataining querySelectors
let numberSelector = document.querySelectorAll(".number");
let symbolSelector = document.querySelectorAll(".symbol");

let display = document.querySelector(".display");
let equalTo = document.querySelector(".equalTo");
let clear = document.querySelector(".clear");
let backSpace = document.querySelector(".backSpace");
let dotButton = document.querySelector(".dot");

let displayVariable;

// at the surface level of understanding focus, focus on the page changes as you press the tab button
// divs aren't focused in a page by default unlike links or input
// the below command helps us focus on the display div and hear the keys from keyboard events
// placing it here in the document helps us focus the div as soon as the page loads before taking any further action
display.focus();

// eventListeners (has two parts)
// First - for the things displayed on the page
numberSelector.forEach((num) => num.addEventListener("click", () => {
    display.textContent += num.textContent;
    displayVariable = display.textContent;
    display.focus();
} ));

symbolSelector.forEach((symb) => symb.addEventListener("click", () => {
    display.textContent += symb.textContent;
    displayVariable = display.textContent;
    display.focus();
} ));

clear.addEventListener("click" , () => {
    display.textContent = "" ;
    dotButton.disabled = false;
    display.focus();
})

equalTo.addEventListener("click", () => { equalTo1(); display.focus(); });

backSpace.addEventListener("click" , () => { backSpace1(); display.focus();});

dotButton.addEventListener("click" , () => { dotButton1(); display.focus(); })

display.addEventListener("click" , () => display.focus())

// Second - for the keys on keyboard
display.addEventListener("keydown" , (event) => {
    let keyboardChar = event.key;
    if( /\./.test(keyboardChar) ) { dotButton1() }
    if( /^[0-9+/*=-]/.test(keyboardChar) ) { display.textContent += keyboardChar; }
    if( /Backspace/.test(keyboardChar) ) { backSpace1() }
    displayVariable = display.textContent;

    if( /=/.test(keyboardChar) ) { equalTo1() }
    if( /Enter/.test(keyboardChar) ){ display.textContent += '=' ; displayVariable = display.textContent; equalTo1();}

})

// Functions (has two parts)
// First - operations
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
    if(a/b === Infinity){return "This eqauates to the amount of sh#t in your brain i.e Infinite." ;}
    else{return a/b ;}
}

function operate(op,c,d){
    if(op === '+'){return add(c,d);};
    if(op === '-'){return subtract(c,d);};
    if(op === '*'){return multiply(c,d);};
    if(op === '/'){return division(c,d);};
}

// Second - for buttons
function dotButton1(){
    if(display.textContent.indexOf('.') === -1)
        {display.textContent += dotButton.textContent; displayVariable = display.textContent;}
    else if(display.textContent.indexOf('.') !== -1)
        {dotButton.disabled = true;}
}

function backSpace1(){
    let backSpaceArray = display.textContent.split("");
    backSpaceArray.pop();
    display.textContent = backSpaceArray.join("");
    displayVariable = display.textContent;
}
   
function equalTo1(){
    // Exceptions
    if( /^[a-z]/i.test(display.textContent[0]) === true )
        {display.textContent = "Still not able to write a proper equation . Clear the Damn... text! ." ; return; }
    if(display.textContent === "=")
        {display.textContent = "It equals to the number of braincells in your brain i.e nothing. Idiot!"; return; }
    
    // First equation
    let firstNum = parseFloat(displayVariable);
    let o = parseFloat(displayVariable).toString().length;
    if(displayVariable.slice(o) === '='){ return display.textContent = "Still not able to write a proper equation.. huh!" ; }
    
    // Condition to see if user has typed more than one operator after firstNum
    while( /[+/*-]/.test(displayVariable.slice(o + 1 , o + 2)) === true) { o++ ; };
    if(displayVariable.slice(o + 1, o + 2) === '='){return display.textContent = "Still not able to write a proper equation.. huh!" ;}

    let oper = displayVariable.slice( o , o + 1 );
    let secondNum = parseFloat(displayVariable.slice(o + 1));
    
    let firstResult =  operate(oper,firstNum,secondNum);

    let secondNumLength = secondNum.toString().length;

    // Finding the index to remove the first equation 
    let remove1 =  ( o  + 1 + secondNumLength );
    // checking if the second position after the first equation has an operator or not, if it has, it increases by one
    while(/[+/*-]/.test(displayVariable.slice(remove1 + 1 , remove1 + 2)) === true){ remove1++; }

    displayVariable = displayVariable.slice(remove1);
    // if there is an = after an operator instead of a number then
    if(displayVariable[1] === '=') { return display.textContent = "Still not able to write a proper equation.. huh!" ; }
    // If it equals = then the user has entered only two variables and an operator and it ends here
    if(displayVariable[0] === '=') { display.textContent = firstResult;}

    //Otherwise there is only one option for the second position of the displayVariable,
    //i.e a number, since the first position will be an operator 
    while(displayVariable[0] !== '=' ){ 
        
        firstNum = firstResult;
        oper = displayVariable.slice( 0, 1);
        secondNum = parseFloat(displayVariable.slice(1));

        firstResult = operate(oper,firstNum,secondNum);

        let secondNumLength1 = secondNum.toString().length;
        // operator + lengthOfSecondNum
        let remove2 = ( 1 + secondNumLength1 );
        // checking if the second position after the second numb is an operator or not, if it is then increment
        while(/[+/*-]/.test(displayVariable.slice(remove2 + 1 , remove2 + 2)) === true){ remove2++; }
        // Exception to check a wrong equation
        if(displayVariable[remove2 + 1] === '=') { return display.textContent = "Still not able to write a proper equation.. huh!" ; }
        // If the first position after second num is = then the equation ends here
        if(displayVariable[remove2] === '='){ displayVariable = displayVariable.slice(remove2); display.textContent = firstResult;}
        // If the second position is a number then the loop continues 
        if(/[0-9]/.test(displayVariable[remove2 + 1]) === true ){ displayVariable = displayVariable.slice(remove2); }
    }
}

