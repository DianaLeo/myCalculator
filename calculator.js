var currNum = 0;
var calculator;
var currDisplayText = "";
var result = 0;


function myDisplayer(p) {
 /*   let lastStrOfCurrDisplayText = currDisplayText.substr(currDisplayText.length-1,1);
    //是小数点
    if (p=="." && isNaN(parseFloat(lastStrOfCurrDisplayText))) {//最后一位不是数字（是运算符）
        currDisplayText += "0";
    }
    //是运算符
    if (isNaN(parseFloat(p)) && p!="(") {
        if (currDisplayText=="") {//空
            p = "";
        }else if(isNaN(parseFloat(lastStrOfCurrDisplayText)) && lastStrOfCurrDisplayText!=")"){//最后一位不是数字（是运算符）
            currDisplayText = currDisplayText.substr(0,currDisplayText.length-p.length);
        }
    
    }*/

    currDisplayText += p;
    document.getElementById("display").innerHTML = currDisplayText;
}

function myCurrentNum(p) {
    currNum = p;
    console.log(currNum);
}

function myCalculator(p) {
    calculator = p;
    console.log("calculator:"+calculator);
}

window.onload = function() {
    const numbers = document.getElementsByClassName("g-i-num");
    for (let x in numbers){
        numbers[x].onclick = ()=>{
            myDisplayer(numbers[x].innerHTML);
            myCurrentNum(numbers[x].innerHTML);
        };
    }
    const calculators = document.getElementsByClassName("g-i-calculation");
    for (let x in calculators){
        calculators[x].onclick = ()=>{
            myDisplayer(calculators[x].innerHTML);
            myCalculator(calculators[x].innerHTML);
        };
    }
    const equal = document.getElementsByClassName("g-i-equal");
    equal[0].onclick = ()=>{
        
        let sinAngle = currDisplayText.match(/sin\d+/);
        let cosAngle = currDisplayText.match(/cos\d+/);
        let tanAngle = currDisplayText.match(/tan\d+/);
        if (sinAngle){//找到sin
            const angle = sinAngle.toString().match(/\d+/);
            currDisplayText = currDisplayText.replace(/sin\d+/,"Math.sin("+angle.toString()+"*Math.PI/180)");
        }
        if (cosAngle){//找到cos
            const angle = cosAngle.toString().match(/\d+/);
            currDisplayText = currDisplayText.replace(/cos\d+/,"Math.cos("+angle.toString()+"*Math.PI/180)");
        }
        if (tanAngle){//找到tan
            const angle = tanAngle.toString().match(/\d+/);
            currDisplayText = currDisplayText.replace(/tan\d+/,"Math.tan("+angle.toString()+"*Math.PI/180)");
        }
        try{
            result = eval(currDisplayText);
            document.getElementById("display").innerHTML = result;
            if (isNaN(result)){
                currDisplayText = "";
            }else{
                currDisplayText = result.toString();
            }
        }catch(error){
            console.log("error:"+error.message);
            document.getElementById("display").innerHTML = "error";
            currDisplayText = "";
        }
        
        
        
    };

    const clear = document.getElementsByClassName("g-i-clear");
    clear[0].onclick = ()=>{
        currDisplayText = "";
        document.getElementById("display").innerHTML = currDisplayText;
    };

    const back = document.getElementsByClassName("g-i-back");
    back[0].onclick = ()=>{
        let lastStrOfCurrDisplayText = currDisplayText.substr(currDisplayText.length-1,1);
        currDisplayText = currDisplayText.substr(0,currDisplayText.length-1);
        document.getElementById("display").innerHTML = currDisplayText;

    };
};


//const collection = document.getElementsByClassName("grid-item");
//for (let x in collection){
 //   collection[x].addEventListener("click",()=>{myDisplayer(collection[x].innerHTML);}); 
//}