const params = new URLSearchParams(location.search);


console.groupCollapsed("URLSearchParams")
for (const [k, v] in params){
    console.log(`${k}: ${v}`)
}
console.groupEnd("URLSearchParams")

