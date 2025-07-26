const result = document.getElementById("result");
const calc = document.getElementById("calc");

const buttons = document.getElementsByClassName("button");

var _cache = ["0"];
var _index = 0;

function Show () {
    let showResult = "";

    for (const value in _cache) {
        let chagedValue = _cache[value];
        if (chagedValue == undefined) {continue};
        /*if (Number(chagedValue)) {
            const dot = chagedValue.indexOf(".") == -1 && chagedValue.length || chagedValue.indexOf(".") -1;
            for (let i = dot; i > -1; i = i - 3) {
                if (i == 1) {
                    
                }
            }
        }*/
        showResult = showResult + chagedValue
    }

    result.textContent = showResult
}

ButtonsFunctions = []

ButtonsFunctions["C"] = () => {_cache = ["0"]; _index = 0;}

ButtonsFunctions["0"] = () => {
    if (_cache[_index] == "%") {return}
    if (_cache[_index] == "(") {_index++;}
    if (_cache[_index] == ")") {SignalsFunction("x");}

    let addZero = false

    for (const caracter in _cache[_index]) {if (_cache[_index][caracter] !== "0") {addZero = true}}
    if (_cache[_index] == undefined) {_cache[_index] = "0"}

    if (addZero) {_cache[_index] = _cache[_index] + "0";}
}

ButtonsFunctions["."] = () => {
    if (_cache[_index] == "%") {return}

    if (_cache[_index] == undefined) {_cache[_index] = "0."}

    if (_cache[_index] == "(") {
        _index++
        _cache[_index] = "0."
    }

    for (const caracter in _cache[_index]) {if (_cache[_index][caracter] == ".") {return}}

    _cache[_index] = _cache[_index] + ".";

}

function SignalsFunction (signal) {

    if (signal == "+" || signal == "-") {
        if (_cache[_index] == "(") {
            _index++;

            _cache[_index] = signal;
            return
        }
        if (_cache[_index] == "+" || _cache[_index] == "-" && _cache[_index -1] == "(") {
            _cache[_index] = signal;
            return
        }
    }

    if (_cache[_index -1] == "+" || _cache[_index -1] == "-" || _cache[_index -1] == "x" || _cache[_index -1] == "/") {
        if (_cache[_index] == undefined) {_cache[_index -1] = signal;}
    }

    if (_cache[_index] == undefined || _cache[_index] == "(" || _cache[_index] == "+" || _cache[_index] == "-") {return}

    _index++;

    _cache[_index] = signal;

    _index++;

}

ButtonsFunctions["+"] = () => {SignalsFunction("+");}

ButtonsFunctions["-"] = () => {SignalsFunction("-");}

ButtonsFunctions["x"] = () => {SignalsFunction("x");}

ButtonsFunctions["/"] = () => {SignalsFunction("/");}

ButtonsFunctions["%"] = () => {

    if (_cache[_index] == undefined || _cache[_index] == "%" || _cache[_index] == "(" || _cache[_index] == "+" || _cache[_index] == "-") {return}

    _index++;

    _cache[_index] = "%";
}

ButtonsFunctions["()"] = () => {

    if (isNaN(Number(_cache[_index])) && _cache[_index] !== ")" && _cache[_index] !== "%") {
        if (_cache[_index] == "(" || _cache[_index] == "+" || _cache[_index] == "-") {_index++;}

        _cache[_index] = "(";
        return
    }

    let tolerance = 1;

        for (let i = _cache.length; i > -1; i = i - 1) {
            const element = _cache[i];

            if (element == "(") {
                tolerance = tolerance - 1
            } else if (element == ")") {
                tolerance = tolerance + 1
            }

        }

    if (tolerance <= 0) {
        _index++;

        _cache[_index] = ")";
    } else {

        _index++;

        _cache[_index] = "x";
    
        _index++;

        _cache[_index] = "("
    }

}

ButtonsFunctions["+/-"] = () => {

    if (_cache[_index] == "(") {_index++;}

    if (_cache[_index] == undefined) {
        _cache[_index] = "(";
        _index++;
        _cache[_index] = "-";
    } else if (_cache[_index] == "-") {
        _cache.splice(_index -1, 1);
        _index--;
        _cache[_index] = undefined;
    }

    if (_cache[_index] == "%" || _cache[_index] == ")") {
        SignalsFunction("x");
        _cache[_index] = "(";
        _index++;
        _cache[_index] = "-";
    }

    if (isNaN(Number(_cache[_index])) && _cache[_index] !== "0") {return}

    if (_cache[_index] == "0") {
        _cache[_index] = "(";
        _index++;
        _cache[_index] = "-0";
        return
    } else if (_cache[_index] == "-0") {
        _cache.splice(_index -1, 1);
        _index--;
        _cache[_index] = -(_cache[_index]) + "";
        return
    }

    if (_cache[_index].search("-") !== -1) {
        _cache.splice(_index -1, 1);
        _index--;
        _cache[_index] = -(_cache[_index]) + "";
    } else {
        let currentValue = _cache[_index]
        _cache[_index] = "(";
        _index++;
        _cache[_index] = -(currentValue) + "";

    }
}

function calculating (exprecion) {
    const changedExprecion = exprecion;
    
    let currentIndex = 0;

    for (currentIndex; currentIndex < changedExprecion.length; currentIndex++) {
        const element = changedExprecion[currentIndex];
        
        if (element == "(") {
            let newExprecion = [];
            let tolerance = 1;
            let i;

            for (i = currentIndex +1; i < changedExprecion.length; i++) {
                const element = changedExprecion[i];

                if (element == "(") {
                    tolerance = tolerance + 1;
                } else if (element == ")") {
                    tolerance = tolerance - 1;
                }

                if (tolerance < 1) {
                    newExprecion[newExprecion.length] = element;
                    break
                } else {
                    newExprecion[newExprecion.length] = element;
                }
            }

            console.log("----------------------------------------------------");
            console.log(newExprecion);

            const end = newExprecion.length;

            console.log(end);
            changedExprecion.splice(currentIndex, end);
            changedExprecion[currentIndex] = calculating(newExprecion)[0];
            
            console.log(changedExprecion);

            _index = i;
            currentIndex = 0;
        }
    }

    currentIndex = 0;

    for (currentIndex; currentIndex < changedExprecion.length; currentIndex++) {
        const element = changedExprecion[currentIndex];

        console.log("=+-",changedExprecion);

        if (element == "%") {
            changedExprecion[currentIndex] = Number(changedExprecion[currentIndex - 1]) / 100 + "";
            changedExprecion.splice(currentIndex - 1, 1);
        }

        if (element == "x") {
            changedExprecion[currentIndex +1] = Number(changedExprecion[currentIndex -1]) * Number(changedExprecion[currentIndex +1]) + "";
            changedExprecion.splice(currentIndex -1, 2);
            currentIndex = currentIndex - 1;
        }

        if (element == "/") {
            changedExprecion[currentIndex +1] = Number(changedExprecion[currentIndex -1]) / Number(changedExprecion[currentIndex +1]) + "";
            changedExprecion.splice(currentIndex -1, 2);
            currentIndex = currentIndex - 1;
        }

        if (element == ")") break

    }

    currentIndex = 0;

    for (currentIndex; currentIndex < changedExprecion.length; currentIndex++) {
        const element = changedExprecion[currentIndex];

        console.log("=+-",changedExprecion);

        if (element == "+") {
            changedExprecion[currentIndex +1] = Number(changedExprecion[currentIndex -1]) + Number(changedExprecion[currentIndex +1]) + "";
            changedExprecion.splice(currentIndex -1, 2);
            currentIndex = currentIndex - 1;
        }

        if (element == "-") {
            changedExprecion[currentIndex +1] = Number(changedExprecion[currentIndex -1]) - Number(changedExprecion[currentIndex +1]) + "";
            changedExprecion.splice(currentIndex -1, 2);
            currentIndex = currentIndex - 1;
        }

        if (element == ")") break

    }

    if (changedExprecion[changedExprecion.length -1] == ")") {changedExprecion.pop();}

    _index = changedExprecion.length -1;
    console.log("---+-",changedExprecion);
    return changedExprecion;
}

ButtonsFunctions["="] = () => {
    _cache = calculating(_cache);
}

Show()

for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    
    element.addEventListener("click", () => {
        
        if (ButtonsFunctions[element.textContent]) {
            ButtonsFunctions[element.textContent]()
        } else {
            if (_cache[_index] == "%") {return}
            if (_cache[_index] == "(") {_index++;}
            if (_cache[_index] == ")") {SignalsFunction("x");}
            _cache[_index] = _cache[_index] == undefined && element.textContent || _cache[_index] == "0" && element.textContent || _cache[_index] == "-0" && -(element.textContent) + "" || _cache[_index] + element.textContent;
        }

        console.log(_cache);
        Show()
    });
};