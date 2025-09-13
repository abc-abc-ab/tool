const params = new URLSearchParams(location.search), //JS
resultElm = document.getElementById("result");

if (!params.has("course")) { history.replaceState(null, "", "./index.html") }
console.groupCollapsed("URLSearchParams")
for (let [key, value] of params.entries()){
    console.log(`${key}: ${value}`)
}
console.groupEnd("URLSearchParams")

const [course, difficulty, profit, average, miss, ranking] = 
      [Number(params.get("course")), Number(params.get("difficulty")), Number(params.get("profit")),
       Number(params.get("average")), Number(params.get("miss")), 10001 - Number(params.get("ranking"))];

const score = course * difficulty * Math.abs( (average - miss) + ranking + profit);
if (!IsInvalid()){
    history.replaceState(null, "", "./result.html")
    resultElm.insertAdjacentText("beforeend", score.toLocaleString());
}else{
    window.setTimeout(()=>{document.location.href = "./index.html?error";}, 3000)
}

function IsInvalid(){
    let result = false;
    if (0 > (  100 * course  + profit )) {result = true;}
    else if (profit % 10) {result = true;}
    else if (10002 < ranking || 1 > ranking) {result = true;}
    else if (!/30|50|100/.test(course)) {result = true;}
    else if (!/1|2|3|4|7/.test(difficulty)) {result = true;}
    else if (miss % 1) {result = true;}
    else if (0 >= score) {result = true;}
    return result;
}