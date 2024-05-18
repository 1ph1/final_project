from flask import Flask, render_template, request
import random

app = Flask(__name__, static_folder="static")

data = {
    "items":{
        "1": {"name":"Blade of alacrity", "pic":"blade_of_alacrity.jpg"},
        "2": {"name":"Band of elvenskin", "pic":"band_of_elvenskin.jpg"},
        "3": {"name":"recipe", "pic":"Default_recipe_icon.png"},
        "4": {"name":"Yasha", "pic":"yasha.jpg"},
        "5": {"name":"Ogre axe", "pic": "ogre_axe.jpg"},
        "6": {"name":"Staff of wizardy", "pic":"staff_of_wizardry.jpg"},
        "7": {"name":"Point bооster", "pic":"point_booster.jpg"},
        "8": {"name":"Aghanim's scepter", "pic":"aghanims_scepter.jpg"},
        "9": {"name":"Shadow blade", "pic":"shadow_blade.jpg"},
        "11": {"name":"Broadsword", "pic":"broadsword.jpg"},
        "10": {"name":"Shadow amulet", "pic":"shadow_amulet.jpg"},
        "12": {"name":"Blitz knuckles", "pic":"blitz_knuckles.jpg"},
        "13": {"name":"Crystalys", "pic":"crystalys.jpg"},
        "14": {"name":"Blades of attack", "pic":"blades_of_attack.jpg"},
        "15": {"name":"Silver edge", "pic":"silver_edge.jpg"},
        "16": {"name":"Sages mask", "pic":"sages_mask.jpg"},
        "17": {"name":"Circlet", "pic":"circlet.jpg"},
        "18": {"name":"Ring of protection", "pic":"ring_of_protection.jpg"},
        "19": {"name":"Urn of shadows", "pic":"urn_of_shadows.jpg"},
        "20": {"name":"Fluffy hat", "pic":"fluffy_hat.jpg"},
        "21": {"name":"Force staff", "pic":"force_staff.jpg"},
        "22": {"name":"Belt of strength", "pic":"belt_of_strength.jpg"},
        "23": {"name":"Sange", "pic":"sange.jpg"},
        "24": {"name":"Cloak", "pic":"cloak.jpg"},
        "25": {"name":"Ring of health", "pic":"ring_of_health.jpg"},
        "26": {"name":"Ring of regen ", "pic":"ring_of_regen.jpg"},
        "27": {"name":"Hood of defian", "pic":"hood_of_defiance.jpg"},
        "28": {"name":"Voodoo mask", "pic":"voodoo_mask.jpg"},
        "29": {"name":"Eternal shroud", "pic":"eternal_shroud.jpg"}
    },
    "build": { 
        "4" : ["1", "2","3"],
        "8" : ["1", "5", "6", "7"],
        "9" : ["10", "11", "12"],
        "13" : ["3", "11", "14"],
        "15" : ["3", "9", "13"],
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

@app.route("/")
def index():
    return render_template("index.html", **data)

@app.route("/game")
def game():
    itemlist = data["items"].copy()
    spisok = list(data["build"].keys())
    choice = random.choice(spisok)
    corspisok = data["build"][choice].copy()
    nameofitem = itemlist.pop(choice)
    items_order = list(itemlist.keys())
    random.shuffle(items_order)
    i = 0
    while len(corspisok) < 27:
        if items_order[i] not in corspisok:
            corspisok.append(items_order[i])  
        i += 1          
    random.shuffle(corspisok)
    listofitems = {
        "name": nameofitem["name"],
        "picture": nameofitem["pic"],
        "items": itemlist,
        "answer": choice,
        "order": corspisok,
        "version": "build"
    }
    return render_template("game.html", **listofitems)

@app.route("/gamemhard")
def hard():
    itemlist = data["items"].copy()
    spisok = list(data["hardbuild"].keys())
    choice = random.choice(spisok)
    corspisok = data["hardbuild"][choice].copy()
    nameofitem = itemlist.pop(choice)
    items_order = list(itemlist.keys())
    img_order = list(itemlist.keys())
    random.shuffle(items_order)
    i = 0
    while len(corspisok) < 27:
        if items_order[i] not in corspisok:
            corspisok.append(items_order[i])  
        i += 1          
    random.shuffle(corspisok)
    listofitems = {
        "name": nameofitem["name"],
        "picture": nameofitem["pic"],
        "items": itemlist,
        "answer": choice,
        "order": corspisok,
        "img_order": img_order,
        "version": "hardbuild"
    }
    return render_template("hard.html", **listofitems)

@app.route("/check", methods = ["POST"])
def check():
    items = dict(request.form)
    bversion = items.pop("version")
    id = items.pop("answer")
    build1 = [int(i) for i in list(items.keys())]
    build1.sort()
    build1 = [str(i) for i in build1]
    build = (data[bversion][str(id)])
    build1 = '-'.join(build1)
    build = '-'.join(build)
    print(bversion)
    print(build, build1)
    if build1 == build:
        answer = {"vers": bversion} 
        return render_template("check.html", **answer)
    else:
        answer = {"vers": bversion}
        return render_template("check.html", **answer)

@app.route("/check2", methods = ["POST"])
def checkh():
    items = dict(request.form)
    bversion = items.pop("version")
    id = items.pop("answer")
    build1 = [int(i) for i in list(items.keys())]
    build1.sort()
    build1 = [str(i) for i in build1]
    build = (data[bversion][str(id)])
    build1 = '-'.join(build1)
    build = '-'.join(build)
    print(bversion)
    print(build, build1)
    if build1 == build:
        answer = {"answ":"Правильно!"} 
        return render_template("check2.html", **answer)
    else:
        answer = {"answ":"Неправильно!"}
        return render_template("check2.html", **answer)

if __name__=="__main__":
    app.run(port=3000)