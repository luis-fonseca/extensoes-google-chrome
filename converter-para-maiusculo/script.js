document.addEventListener("DOMContentLoaded", function() {

    /** Converte uma string para maiusculo. */
    function toUpper(text) {
        return text.toUpperCase();
    }; // toUpper

    let convert_command = document.querySelector("#convert-command");
    convert_command.addEventListener("click", function() {
        let text_to_convert             = document.querySelector("#text-to-convert");
        let tempText                    = "<strong>Resultado: </strong>";
            tempText                   += '<span id="result">' + toUpper(text_to_convert.value) + "</span>";
        let result_container            = document.querySelector("#result-container");
            result_container.innerHTML  = tempText;
    }); // end click

    let copy_command = document.querySelector("#copy-command");
    copy_command.addEventListener("click", function() {
        let selection = document.getSelection();
        let element   = document.querySelector("#result");
        let range     = document.createRange();

        range.selectNodeContents(element);

        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');

        selection.removeAllRanges();
    });

});
