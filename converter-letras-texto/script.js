(function(window, document) {
    var timer1, timer2;

    function toUpper(text) {
       if (text.length > 0)
          return text.toUpperCase()
       return "";
    } // end toUpper

    function toLower(text) {
       if (text.length > 0)
          return text.toLowerCase()
       return "";
    } // end toLower

    function toTitleCase(text) {
       let arr = text.trim().split(" ");
       let new_arr = arr.map(function(element) {
          return toUpper(element.charAt(0)) + element.substring(1);
       });
       return new_arr.join(" ");
    } // titleCase

    function setHTML(element, text) {
       element.innerHTML = text;
    } // end setHTML

    function addCSSClass(element, css_class) {
       if (css_class) element.classList.add(css_class);
    } // addCSSClass

    function removeCSSClass(element, css_class) {
       if (css_class) element.classList.remove(css_class);
    } // removeCSSClass

    function showElement(element) {
       removeCSSClass(element, "d-none");
       removeCSSClass(element, "hide");

       addCSSClass(element, "d-block");
       addCSSClass(element, "show");
    } // end showElement

    function hideElement(element) {
       removeCSSClass(element, "show");
       removeCSSClass(element, "d-block");

       addCSSClass(element, "hide");
       addCSSClass(element, "d-none");
    } // end hideElement

    function hideWithTransition(element) {
       element.classList.add("hide");
       timer2 = window.setTimeout(function(){
             hideElement(element);
       }, 1000);
    } // hideWithTransition

    function clearTimers() {
       window.clearTimeout(timer1);
       window.clearTimeout(timer2);
    } // clearTimers

    function showAndHideElement(element) {
       clearTimers();
       showElement(element);
       timer1 = window.setTimeout(function(){
          hideWithTransition(element);
       }, 1000);
    } // showAndHideElement

    function showSuccessInfo(element, text) {
       setHTML(element, text);
       addCSSClass(element, "info-success");
       removeCSSClass(element, "info-error");
       showAndHideElement(element);
    } // showSuccessInfo

    function showErrorInfo(element, text) {
       setHTML(element, text);
       addCSSClass(element, "info-error");
       removeCSSClass(element, "info-success");
       showAndHideElement(element);
    }

    function showResult(element, text) {
       removeCSSClass(element, "d-none");
       addCSSClass(element, "d-block");
       setHTML(element, text);
    } // end showResult

    function hideResult(element, text) {
       removeCSSClass(element, "d-block");
       addCSSClass(element, "d-none");
       setHTML(element, text);
    } // end hideResult

    function clearAndHideResult(element) {
       hideResult(element, "");
    } // end clearAndHideResult

    function copyContent() {
       let selection  = document.getSelection();
       let element    = document.querySelector("#result");
       let range      = document.createRange();
       let error_copy = false;

       if (result.innerHTML.trim().length > 0) {
          try {
             range.selectNodeContents(element)
             selection.removeAllRanges();
             selection.addRange(range);

             document.execCommand('copy');

             selection.removeAllRanges();
          } catch (error) {
             error_copy = true;
             showErrorInfo(info, "Não foi possível copiar.")
          } // end try
       } else {
          error_copy = true;
          showErrorInfo(info, "Nenhum conteúdo a copiar.")
       }

       if (!error_copy) {
          showSuccessInfo(info, "Texto copiado com sucesso.")
       } // endif
    } // copyContent

    let btn_convert = document.querySelector('#convert-button');
    btn_convert.addEventListener('click', function() {

       let option = document.querySelector('input[name="case-option"]:checked');
       let text   = document.querySelector('#text-to-convert').value;
       let result = document.querySelector('#result');
       let info   = document.querySelector('#info')

       if (text.trim().length > 0) {
          switch (option.value) {
             case "1":
                showResult(result, toUpper(text));
                break;
             case "2":
                showResult(result, toLower(text));
                break;
             case "3":
                showResult(result, toTitleCase(text));
                break;
             default:
             // showResult(result, toTitleCase(text));
          } // end switch
          showSuccessInfo(info, "Texto convertido.");
       } else {
          showErrorInfo(info, "Nada a converter.");
       }

    }); // end click

    let btn_clear = document.querySelector('#clear-button');
    btn_clear.addEventListener('click', function() {
       let input  = document.querySelector('#text-to-convert');
       let result = document.querySelector('#result');
       input.value = "";
       clearAndHideResult(result);
    }); // end click

    let btn_copy = document.querySelector("#copy-button");
    btn_copy.addEventListener('click', function() {
       copyContent();
    });

 })(window, document);
