$(document).ready(function() {
  let display = '0'; 
  let copy = '0';
  let result = '';
  let countDecimal = 0;
 

  $('button').on('click',onButtonClick);
  $('body').on("keydown", onButtonClick);

  function onButtonClick(event){ 
    console.log(event.key)
    let text = event.key || event.target.innerText ;
    
    if(isNaN(text)){
        handleSymbol(text)
    } else{
        handleNumber(text)
        
    }
    screen(display)
 }

 function handleNumber(innerText){
    if(innerText == 0 && display == 0){
      display = '0';
       } else{
           if(display === '0'){
            display = '';
            display += innerText
           } else{
            display += innerText;
           }
       }
   copy = display;
 }

function handleSymbol(operator){
   switch(operator){
     case 'C':
     display = '0';
     result = '';
     countDecimal = 0;
     arrReminder = [];
     $('.reminder').addClass('hidden')
     break;
     case '←':
     case 'Backspace':
      display.charAt(display.length - 1) == '.' ? countDecimal = 0 : countDecimal;
      display = display.length > 1 ? display.slice(0,-1) : '0';
      break;
     case '=':
     case 'Enter':
      result += display;
      display = eval(result) % 1 !== 0 && (eval(result)+ '').length > 4 ? (eval(result)).toFixed(4) + '' : eval(result) + '';
      copy = display;
      result = '';
      arrReminder = [];
      $('.reminder').addClass('hidden')
      break;
     case '.':
      countDecimal++
      countDecimal ==  1 ?  display += '.' : false;
      break;
     case '-':
      display == '0' ? display = '-' : handleMath(operator);
      break;
     case '+':
     case '/':
     case '÷':
     case '*':
     case '×':
     handleMath(operator)
     break;
     default:
     return false
     break;
   }
   
}

function handleMath(op){
 countDecimal = 0
 if(copy !== ''){
     if(op == '×'){
      result += display + '*';
     } else if(op == '÷'){
      result += display + '/';
     } else{
         result += display + op;
     }
  } else {
    result = result.slice(0,-1)
    if(op == '×'){
      result += '*';
     } else if(op == '÷'){
      result += '/';
     } else{
         result += op;
     }
  }
  reminder(copy + op)
  display = '0';
  copy = '';
}

function screen(display){
    $('.result').text(display)
 }

let arrReminder = [] 
function reminder(history){ 
   arrReminder.push(history)
  $('.reminder').text(arrReminder.join(''));
  $('.reminder').removeClass('hidden')
}
})
