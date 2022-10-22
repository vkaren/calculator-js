$(document).ready(function () {
  let display = "0";
  let isTwoOrMoreOperators = false;
  let result = "";
  let countDecimal = 0;

  $("button").on("click", onButtonClick);
  $("body").on("keydown", onButtonClick);

  function onButtonClick(event) {
    let text = event.key || event.target.innerText;

    if (isNaN(text)) {
      handleSymbol(text);
    } else {
      handleNumber(text);
    }
    $(".result").text(display);
  }

  function handleNumber(number) {
    if (number === "0" && display === "0") {
      display = "0";
    } else {
      if (display === "0") {
        display = "";
        display += number;
      } else {
        display += number;
      }
    }
    isTwoOrMoreOperators = false;
  }

  function handleSymbol(symbol) {
    switch (symbol) {
      case "C":
        display = "0";
        result = "";
        countDecimal = 0;
        $(".reminder").addClass("hidden");
        break;
      case "←":
      case "Backspace":
        display.charAt(display.length - 1) === "."
          ? (countDecimal = 0)
          : countDecimal;
        display = display.length > 1 ? display.slice(0, -1) : "0";
        break;
      case "=":
      case "Enter":
        result += display;
        display =
          (eval(result) + "").length > 4
            ? eval(result).toFixed(4) + ""
            : eval(result) + "";
        isTwoOrMoreOperators = false;
        result = "";
        $(".reminder").addClass("hidden");
        break;
      case ".":
        countDecimal++;
        countDecimal === 1 ? (display += ".") : false;
        break;
      case "-":
        display === "0" ? (display = "-") : handleMath(symbol);
        break;
      case "+":
      case "/":
      case "÷":
      case "*":
      case "×":
        handleMath(symbol);
        break;
      default:
        false;
        break;
    }
  }

  function handleMath(symbol) {
    if (!isTwoOrMoreOperators) {
      result += display;
    } else {
      result = result.slice(0, -1);
    }
    if (symbol === "×") {
      result += "*";
    } else if (symbol === "÷") {
      result += "/";
    } else {
      result += symbol;
    }
    history(result);
    display = "0";
    countDecimal = 0;
    isTwoOrMoreOperators = true;
  }

  function history(history) {
    $(".reminder").text(history);
    $(".reminder").removeClass("hidden");
  }
});
