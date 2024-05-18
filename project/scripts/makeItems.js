const data = {
    "items":[
        {"name":"Blade of alacrity", "pic":"blade_of_alacrity.jpg"},
        {"name":"Band of elvenskin", "pic":"band_of_elvenskin.jpg"},
        {"name":"recipe", "pic":"Default_recipe_icon.png"},
        {"name":"Yasha", "pic":"yasha.jpg"},
        {"name":"Ogre axe", "pic": "ogre_axe.jpg"},
        {"name":"Staff of wizardy", "pic":"staff_of_wizardry.jpg"},
        {"name":"Point bооster", "pic":"point_booster.jpg"},
        {"name":"Aghanim's scepter", "pic":"aghanims_scepter.jpg"},
        {"name":"Shadow blade", "pic":"shadow_blade.jpg"},
        {"name":"Broadsword", "pic":"broadsword.jpg"},
        {"name":"Shadow amulet", "pic":"shadow_amulet.jpg"},
        {"name":"Blitz knuckles", "pic":"blitz_knuckles.jpg"},
        {"name":"Crystalys", "pic":"crystalys.jpg"},
        {"name":"Blades of attack", "pic":"blades_of_attack.jpg"},
        {"name":"Silver edge", "pic":"silver_edge.jpg"},
        {"name":"Sages mask", "pic":"sages_mask.jpg"},
        {"name":"Circlet", "pic":"circlet.jpg"},
        {"name":"Ring of protection", "pic":"ring_of_protection.jpg"},
        {"name":"Urn of shadows", "pic":"urn_of_shadows.jpg"},
        {"name":"Fluffy hat", "pic":"fluffy_hat.jpg"},
        {"name":"Force staff", "pic":"force_staff.jpg"},
        {"name":"Belt of strength", "pic":"belt_of_strength.jpg"},
        {"name":"Sange", "pic":"sange.jpg"},
        {"name":"Cloak", "pic":"cloak.jpg"},
        {"name":"Ring of health", "pic":"ring_of_health.jpg"},
        {"name":"Ring of regen ", "pic":"ring_of_regen.jpg"},
        {"name":"Hood of defian", "pic":"hood_of_defiance.jpg"},
        {"name":"Voodoo mask", "pic":"voodoo_mask.jpg"},
        {"name":"Eternal shroud", "pic":"eternal_shroud.jpg"},
        {"name":"Demon edge", "pic":"demon_edge.jpg"}
    ],
    "build": { 
        "4" : ["1", "2","3"],
        "8" : ["1", "5", "6", "7"],
        "9" : ["10", "11", "12"],
        "13" : ["3", "11", "14"],
        "15" : ["3", "9", "30"],
        "19" : ["3", "16", "17", "18"],
        "21" : ["3", "6", "20"],
        "23" : ["3", "5", "22"],
        "27" : ["24", "25", "26"],
        "29" : ["3", "27", "28"]
    },
    "hardbuild": {
        "8" : ["1", "5", "6", "7"],
        "15" : ["10", "11", "12", "3", "11", "14"],
        "19" : ["3", "16", "17", "18"],
        "29" : ["3", "24", "25", "26", "28"]
    }
}

const root = document.getElementById('root')

function createPackage(){
    let finalPackage = []
    while (finalPackage.length<20){
        let package = Math.floor(Math.random()*data.items.length)
        if (finalPackage.includes(package)==false){
            finalPackage.push(package)
        }
    }
    return finalPackage
}

function render(){
    let finalPackage = createPackage()
    for (let i = finalPackage.length; i>0; i--){
        let html = `<td>${data.items[finalPackage[i]].name}</td>`
        root.insertAdjacentHTML('beforeend', html)
    }
}

let finalPackage = createPackage()
console.log(data.items[finalPackage[1]].name, root)