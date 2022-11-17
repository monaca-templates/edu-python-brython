/**
 * Monaca Education Dev Utility Library for Brython
 *
 * @version 1.0
 * @author  Asial Corporation
 */
// デバッグアシスタントのHTML
let debugArea = document.createElement("section");
let titleArea = document.createElement("h1");
let logArea = document.createElement("ul");
let errorArea = document.createElement("p");
debugArea.classList.add("debug");
logArea.classList.add("log");
errorArea.classList.add("error");
titleArea.innerHTML = "デバッグアシスタント";
debugArea.appendChild(titleArea);
debugArea.appendChild(logArea);
debugArea.appendChild(errorArea);
document.body.appendChild(debugArea);

// デバッグアシスタントのCSS
let educationStyle = document.createElement('style');
educationStyle.innerText = `
section.debug {
    border:solid 2px blue;
    padding:5px;
    display:none;
    margin-top:50px;
}
.debug h1 {
    text-align:center;
    font-size:medium;
}
.debug li {
   list-style-type: circle;
}
.debug .error {
}
.debug li.error {
   list-style-type: square;
}
`;
document.querySelector("head").appendChild(educationStyle);


debug = function (message){
    if (message == null) {
        message = "null(なる)が発生していませんか？";
    }
    if(typeof message != "string"){
        return;
    }

    debugArea.style.display = "block";
    debugArea.style.borderColor = "red";

    let advice = "";
    let line = message.match(/line (\d+)/);
    line = line[1];

    if(message.match("is not defined")) {
        advice += "未定義の変数や関数を利用していませんか？";
    }
    if(message.match("SyntaxError")) {
        advice += "文法的に間違った記述をしていませんか？";
    }
    if(message.match("invalid literal for int")) {
        advice += "int()に数値以外の値(文字列や空文字など)を渡していませんか？";
    }
    if (line) {
        advice += "<br>" + line + "行目付近を確認して下さい。";
    }

    errorArea.innerHTML += advice + "<br>" + message;
}
const tempError = console.error;
console.error = function(message) {
    tempError.apply(this, arguments);
    debug(message);
}

// print()やinput()をJSで代替する関数を定義
util = {}
util.print = function(...msg) {
    let message = [];
    let suffix = "";
    for(let value1 of msg) {
        if (value1 instanceof Array) {
            for (let value2 of value1) {
                message.push(value2)
            }
        } else {
            suffix = value1;
        }
    }
    document.getElementById("contents").innerHTML += message.join(" ");
    document.getElementById("contents").innerHTML += suffix;
}
util.prompt = function(msg) {
    let value = prompt(msg);
    if (value === null) {
        return "";
    }
    return value;
}
// matplotlib風にPlotly.jsを呼び出すためのラップ関数定義。実際に使う場合はindex.html側にCDN記述も必要です。<script src="https://cdn.plot.ly/plotly-latest.min.js" defer></script>
plt = {
    layout:{
        height: 350,
        width:  350,
        xaxis:{},
        yaxis:{}
    },
    data:[],
    config:{},
    scatterData:{}
};
plt.title = function (str) {
    this.layout.title = str;
}
plt.xlabel = function (str) {
    this.layout.xaxis.title = str;
}
plt.ylabel = function (str) {
    this.layout.yaxis.title = str;
}
plt.show = function () {
    plt.scatterData2trace();

    Plotly.newPlot("myDiv", this.data, this.layout, this.config);
}
plt.scatter = function (x, y, color) {
    if(this.scatterData[color] === undefined) {
        this.scatterData[color] = {x:[],y:[]};
    }   
    this.scatterData[color].x.push(x);
    this.scatterData[color].y.push(y); 
}
plt.scatterData2trace = function () {
    for (let key in this.scatterData) {
        let trace = {
            x: this.scatterData[key].x,
            y: this.scatterData[key].y,
            type: 'scatter',
            mode: 'markers',
            marker:{
                color:key,
                size:1
            }
        }
        this.data.push(trace);
    }
}
plt.plot = function (x,y,color,label,marker) {
    let trace = {
        x: x,
        y: y,
        name:label,
        type: 'scatter'
    }
    this.data.push(trace);
}
