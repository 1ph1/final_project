let data = document.getElementById("input")
let submitBtn = document.getElementById("sendButton")
let answerLabel = document.getElementById("answer")


submitBtn.addEventListener("click", async function(){
    let text = data.value
    let obj = {text}
    let answer = await fetch('http://localhost:3000/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if(answer.ok){
        let jesus = await answer.text()
        answerLabel.innerHTML = jesus
    }else{
        alert("Ошибка HTTP:" + answer.status)
    }
})