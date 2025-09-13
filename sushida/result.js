const params = new URLSearchParams(location.search), //Javascript
resultElm = document.getElementById("result"),
outputElm = document.getElementById("output");

if (!params.has("course")) { history.replaceState(null, "", "./index.html") }
console.groupCollapsed("URLSearchParams")
for (let [key, value] of params.entries()){
    console.log(`${key}: ${value}`)
}
console.groupEnd("URLSearchParams")

const [course, difficulty, profit, average, miss, ranking] = 
      [Number(params.get("course")), Number(params.get("difficulty")), Number(params.get("profit")),
       Number(params.get("average"))*60, Number(params.get("miss")), 10001 - Number(params.get("ranking"))];

const score = course * difficulty * Math.abs( (average - miss) + ranking + profit);
if (IsInvalid()) { document.location.href = "./index.html?error"; }
{
    history.replaceState(null, "", "./result.html")
    outputElm.insertAdjacentHTML("afterbegin",
        `コース: ${course==30?"お手軽3,000":(course==50?"お勧め5,000":"高級10,000")}円コース<br>
        難易度: ${["練習", "普通", "正確重視", "速度必須", null, null, "一発勝負"][difficulty - 1]}<br>
        損益: ${profit == 0?"プラスマイナス":""}${Math.abs(profit)}円${0 < profit?"得":(0 > profit?"損":"")}<br>
        平均タイプ数: ${average/60}回/秒 ／ ${average}回/分<br>
        ミスタイプ数: ${miss}回<br>
        ランキング: ${ranking == 10002?"表示なし":10001 - ranking}<br>
        ① コース: (① / 100) / ② 難易度: 練習1 普通2 正確重視3 速度必須4 一発勝負7 /<br>
	    ③ 損益: 損-③ 得+③ / ④ 平均タイプ数: ④*60 (回/分) / ⑤ ミス数: そのまま /<br>
	    ⑥ 順位: 損-1 得10,001 - ⑥ ( | ~ | は絶対値 )<br>
        式) ${course}(①) * ${difficulty}(②) * | (${average}(④) - ${miss}(⑤)) + ${ranking}(⑥) + ${profit}(③) |`
        
    )
    resultElm.insertAdjacentText("beforeend", score.toLocaleString());
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