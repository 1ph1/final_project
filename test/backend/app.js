const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

let data = {
  "items":[{"name":"Blade of alacrity", "pic":"/src/img/blade_of_alacrity.jpg"},
      {"name":"Band of elvenskin", "pic":"/src/img/band_of_elvenskin.jpg"},
      {"name":"recipe", "pic":"/src/img/Default_recipe_icon.png"},
      {"name":"Yasha", "pic":"/src/img/yasha.jpg"},
      {"name":"Ogre axe", "pic": "/src/img/ogre_axe.jpg"},
      {"name":"Staff of wizardy", "pic":"/src/img/staff_of_wizardry.jpg"},
      {"name":"Point bооster", "pic":"/src/img/point_booster.jpg"},
      {"name":"Aghanim's scepter", "pic":"/src/img/aghanims_scepter.jpg"},
      {"name":"Shadow blade", "pic":"/src/img/shadow_blade.jpg"},
      {"name":"Broadsword", "pic":"/src/img/broadsword.jpg"},
      {"name":"Shadow amulet", "pic":"/src/img/shadow_amulet.jpg"},
      {"name":"Blitz knuckles", "pic":"/src/img/blitz_knuckles.jpg"},
      {"name":"Crystalys", "pic":"/src/img/crystalys.jpg"},
      {"name":"Blades of attack", "pic":"/src/img/blades_of_attack.jpg"},
      {"name":"Silver edge", "pic":"/src/img/silver_edge.jpg"},
      {"name":"Sages mask", "pic":"/src/img/sages_mask.jpg"},
      {"name":"Circlet", "pic":"/src/img/circlet.jpg"},
      {"name":"Ring of protection", "pic":"/src/img/ring_of_protection.jpg"},
      {"name":"Urn of shadows", "pic":"/src/img/urn_of_shadows.jpg"},
      {"name":"Fluffy hat", "pic":"/src/img/fluffy_hat.jpg"},
      {"name":"Force staff", "pic":"/src/img/force_staff.jpg"},
      {"name":"Belt of strength", "pic":"/src/img/belt_of_strength.jpg"},
      {"name":"Sange", "pic":"/src/img/sange.jpg"},
      {"name":"Cloak", "pic":"/src/img/cloak.jpg"},
      {"name":"Ring of health", "pic":"/src/img/ring_of_health.jpg"},
      {"name":"Ring of regen ", "pic":"/src/img/ring_of_regen.jpg"},
      {"name":"Hood of defian", "pic":"/src/img/hood_of_defiance.jpg"},
      {"name":"Voodoo mask", "pic":"/src/img/voodoo_mask.jpg"},
      {"name":"Eternal shroud", "pic":"/src/img/eternal_shroud.jpg"},
      {"name":"Demon edge", "pic":"/src/img/demon_edge.jpg"}],
  "build": { 
      "3" : [0, 1, 2],
      "7" : [0, 4, 5, 6],
      "8" : [9, 10, 11],
      "12" : [2, 10, 13],
      "14" : [2, 8, 29],
      "18" : [2, 15, 16, 17],
      "20" : [2, 5, 19],
      "22" : [2, 4, 21],
      "26" : [23, 24, 25],
      "28" : [2, 26, 27]
  }
}

// variables---------------------------------------------------------------------

let finalAnswer=[]
let keyForBuild = []
let keyRandomBuild = []
let buildObject = []


// functions---------------------------------------------------------------------

function compareNumbers(a, b){
  return a-b
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


// routes------------------------------------------------------------------------

app.use(cors())
const jsonParser = express.json();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/start', jsonParser, (req, res) => {

  keyForBuild = Object.keys(data["build"])
  keyRandomBuild = keyForBuild[Math.floor(Math.random() * keyForBuild.length)]
  buildObject = data["items"][keyRandomBuild]
  console.log(keyForBuild, keyRandomBuild, buildObject)

  let betaItemList= []
  for(let i=0; i<keyForBuild.length; i++){
    betaItemList.push(data["items"][keyForBuild[i]])
  }
  for(let i=0; i<25-keyForBuild.length; i++){
    let random = Math.floor(Math.random() * data["items"].length)
    while(betaItemList.includes(data["items"][random])){
      random = Math.floor(Math.random() * data["items"].length)
    }
    betaItemList.push(data["items"][random])
  }
  console.log(betaItemList, betaItemList.length)
  if(betaItemList.includes(buildObject)){
    let index = betaItemList.indexOf(buildObject)
    console.log(index)
    betaItemList.splice(index, 1)
    console.log("aboba")
  }
  console.log(betaItemList, betaItemList.length)
  shuffle(betaItemList)
  
  let finalItemList=[]
  let alreadyInList=[]
  for(let i=0; i<6; i++){
    let line=[]
    for(let j=0; j<4; j++){
      let random = Math.floor(Math.random() * betaItemList.length)
      while(alreadyInList.includes(betaItemList[random])){
        random = Math.floor(Math.random() * betaItemList.length)
      }
      line.push(betaItemList[random])
      alreadyInList.push(betaItemList[random])
    }
    finalItemList.push(line)
  }
  // console.log(finalItemList, finalItemList.length)

  let answer = {
    "list": finalItemList,
    "object": buildObject
  }
  res.send(JSON.stringify(answer))
})

app.post('/check', jsonParser, (req, res) => {
  let playerAnswerList = playerAnswer.value
  for(let i=0; i<playerAnswerList.length; i++){
    for(let j=0; j<data["items"].length; j++){
      if(playerAnswerList[i]==data['items'][j]["name"]){
        finalAnswer.push(j)
      }
    }
  }

  if(JSON.stringify(data["build"][keyRandomBuild])===JSON.stringify(finalAnswer.sort(compareNumbers))){
    console.log("УРАААААА")
    res.send("Правильно!")
  }else{
    console.log(":(")
    res.send("Неправильно(")
  }
  finalAnswer=[]
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})