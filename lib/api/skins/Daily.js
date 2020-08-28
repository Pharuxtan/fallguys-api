const fetch = require("node-fetch");

class Daily {
  pcStore = [];
  ps4Store = [];

  getFirstPCStore(){
    return this.pcStore[0];
  }

  getSecondPCStore(){
    return this.pcStore[1];
  }

  getThirdPCStore(){
    return this.pcStore[2];
  }

  getFirstPS4Store(){
    return this.ps4Store[0];
  }

  getSecondPS4Store(){
    return this.ps4Store[1];
  }

  getThirdPS4Store(){
    return this.ps4Store[2];
  }
}

class Skin {
  constructor(face){
    this.name = face.name;
    this.description = face.desc.replace("xxx", "");
    this.img = face.img;
    this.icon = face.icon;
    this.rarity = face.rarity;
    this.acquire = face.acquire;
    if(this.acquire == "Store"){
      this.price = Number(face.price);
      this.currency = face.currency;
    } else if(this.acquire == "Battle Pass"){
      this.season = face.season;
      this.tier = face.tier;
    }
  }
}


module.exports = {
  init: async () => {
    let clazz = new Daily();
    let static = await fetch("https://fallguys.esportinfo.gg/skins").then(res => res.text()).then(text => text.split('staticAssetsBase:"')[1].split('",')[0]);
    let payload = await fetch(`https://fallguys.esportinfo.gg${static}/skins/payload.js`).then(res => res.text());
    let infos = Function(`function __NUXT_JSONP__(text, result){return result};return ${payload}`)().data[0];
    for(let skin of infos.pcStore){
      let theSkin = new Skin(skin);
      clazz.pcStore.push(theSkin);
    }
    for(let skin of infos.ps4Store){
      let theSkin = new Skin(skin);
      clazz.ps4Store.push(theSkin);
    }
    return clazz
  }
}