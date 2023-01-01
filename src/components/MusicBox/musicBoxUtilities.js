function toMins(dMET){  //dMET - default media element time
    return Math.floor(dMET/60)
}

function toSecs(dMET){  //dMET - default media element time
    return Math.floor(dMET % 60)
}

function biNum(num){ 
    return num >= 10? num : "0"+num
}

export {toMins, toSecs, biNum}