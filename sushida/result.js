const params = new URLSearchParams(location.search);


console.groupCollapsed("URLSearchParams")
for (const [k, v] in params){
    console.log(`${k}: ${v}`)
}
console.groupEnd("URLSearchParams")

const [course, difficulty, profit, average, miss, ranking] = 
      [Number(params.get("course")),Number(params.get("difficulty")),Number(params.get("profit")),
       Number(params.get("average")),Number(params.get("miss")),10001 - Number(params.get("ranking"))];