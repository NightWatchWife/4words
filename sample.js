
let csvData;


// CSVの読み込み
// CSVを読み込んで配列に変換
var csvToArray = function(path) {
    var csvData = new Array();
    var data = new XMLHttpRequest();  
      
    data.open("GET", path, false);
    data.send(null);

    var LF = String.fromCharCode(10);
    var lines = data.responseText.split(LF);

    for (var i = 0; i <  lines.length; ++i) {
        var cells = lines[i].split(",");
        if( cells.length != 1 ) {
            csvData.push(cells);
        }
    }
    return csvData;
};
function arrayShuffle(array) {
    for(var i = (array.length - 1); 0 < i; i--){
  
      // 0〜(i+1)の範囲で値を取得
      var r = Math.floor(Math.random() * (i + 1));
  
      // 要素の並び替えを実行
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  };
function setAns(btn, ran , ans){
    if(ran == ans){
        btn.setAttribute("ans","True");
    }else{
        btn.setAttribute("ans","False");
    }
};
function quiz(array){
    //最大値は配列の「要素数」にする
    var random1 = Math.floor( Math.random() * array.length );

    let choices =[];
    choices.push(random1);
    while(true){
        var random2 = Math.floor( Math.random() * array.length );
        if(!choices.includes(random2)){
            choices.push(random2);
        }
        if(choices.length >= 4){
            break;
        }
    }
    choices = arrayShuffle(choices);
    const lbl = document.getElementById("lbl");
    lbl.textContent =  array[random1][1];

    let ans1 = choices.shift();
    let ans2 = choices.shift();
    let ans3 = choices.shift();
    let ans4 = choices.shift();

    const btn1 = document.getElementById("btn1");
    btn1.value =  array[ans1][0];
    const btn2 = document.getElementById("btn2");
    btn2.value =  array[ans2][0];
    const btn3 = document.getElementById("btn3");
    btn3.value =  array[ans3][0];
    const btn4 = document.getElementById("btn4");
    btn4.value =  array[ans4][0];

    setAns(btn1,random1, ans1);
    setAns(btn2,random1, ans2);
    setAns(btn3,random1, ans3);
    setAns(btn4,random1, ans4);
};
// ページロード時に実行
window.onload = function(){
    csvData = csvToArray("1900.csv");
    quiz(csvData);
  };

  const p2 = document.getElementById("p2");

  function clickfun(e) {

    let btn = document.getElementById(e.target.id);
    let text="";
    if(btn.getAttribute("ans") =="True"){
        text ="正解！";
    }else{
        text ="不正解";
    }
    p2.innerHTML = text;

  }

function clickfunNext(){
    p2.innerHTML = "";
    quiz(csvData);
}