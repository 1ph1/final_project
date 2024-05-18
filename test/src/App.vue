<script setup>
import { ref } from 'vue'
// import newButton from './components/newButton.vue'

let arr = ref([])
let buildObject = ref([])
let playerAnswer = ref([])
let answerText=ref("")
let displaying = ref("none")

async function start(){
  let answer = await fetch('http://localhost:3000/start', {
      method: 'GET'
  })
  if(answer.ok){
      let data = await answer.json()
      console.log("фбобф")
      arr.value = data["list"]
      buildObject.value = data["object"]

  }else{
      alert("Ошибка HTTP:" + answer.status)
  }
}

async function check(){
  let answer = await fetch('http://localhost:3000/check', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerAnswer)
  })
  if(answer.ok){
      answerText.value(req.body.text)
      displaying.value="flex"
  }else{
      alert("Ошибка HTTP:" + answer.status)
  }
}

</script>

<template>
  <div class="startGame">
    <button v-on:click="start()">Начать игру</button>
  </div>
  <div class="game">
    <div>
      <img :src="buildObject.pic" alt="" class="build_img">
      <h1>{{ buildObject.name }}</h1>
      <h2 >{{ answerText }}</h2>
    </div>
    <div class="playerChoice">
      <button class="end">Закончить</button>
      <button class="next">Продолжить</button>
    </div>
    <div class="png">
      <div v-for="element in arr" class="row">
        <div v-for="item in element" class="flex_element">
          <label :for="item.name">  
            <v-card class="mx-auto my-8" max-width="700" :title="item.name" color="#6b6b6b" link>
              <input type="checkbox" :name="item.name" :id="item.name" :value="item.name" v-model="playerAnswer">
              <img :src="item.pic" alt="">
            </v-card>
          </label>
        </div>
      </div>
    </div>
    <button v-on:click="check()">Проверить</button>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.png{
  display: flex;
  flex-direction: row;
}

.row{
  width: 100%;
  display: inline;
}

.flex_element{  
  margin-right: 10px;
}

.build_img{
  width: 150px;
  height: 100px;
}

.playerChoice{
  position: absolute;
  display: v-bind(displaying);
  top: 200px;
  left: 32%;
}

.end{
  margin-right: 300px;
}

.start{
  margin-left: 600px;
}

.gameStart {
  display: flex;
}

h1, button{
  color: aliceblue;
}

</style>
