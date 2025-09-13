const params = new URLSearchParams(location.search),
resultElm = document.getElementById("result");


console.groupCollapsed("URLSearchParams")
for (let [key, value] in params.entries()){
    console.log(`${key}: ${value}`)
}
console.groupEnd("URLSearchParams")

const [course, difficulty, profit, average, miss, ranking] = 
      [Number(params.get("course")),Number(params.get("difficulty")),Number(params.get("profit")),
       Number(params.get("average")),Number(params.get("miss")),10001 - Number(params.get("ranking"))];

const score = course * difficulty * Math.abs( (average - miss) + ranking + profit);
if (!isNaN(score)){
    history.replaceState(null, "", "./result.html")
    resultElm.insertAdjacentText("beforeend", score.toLocaleString());
}else{
    document.location.href = "./index.html?error=NaN"
}
