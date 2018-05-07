var colundi = [10.8, 33, 33.8, 55, 62.64, 63, 70, 73.6, 83, 98.4, 105, 110, 111, 147,147.85, 172.06, 210.42, 221.23, 264, 293, 342, 396, 404, 408, 410, 413, 416, 417, 420.82, 440, 448, 528, 630, 639, 685, 852, 880, 1052, 1200];

for (var i = 0; i < colundi.length; i++) {
  colundi[i] = (60*1000)/colundi[i];
}
module.exports = {

  colundi,

  random: function (){
    return colundi[Math.floor(Math.random()*colundi.length)];
  },

  randomInBand: function (band, divisions){
    var range = Math.floor(colundi.length/divisions);
    var index = Math.floor(Math.random()*range)+(range*band);
    console.log("index: " + index);
    return colundi[index];
  },

  sequence: function (length, start){
    var seq = [];
    if(!start){
      start= 0;
    }
    for (var i = 0; i < length; i++) {
      seq = colundi[i+start];
    }
    return seq;
  },

  band : function (band, divisions) {
    var seq = [];
    var range = Math.floor(colundi.length/divisions);
    var offset = range*band;
    for (var i = 0; i < range; i++) {
      seq.push(colundi[i+offset]);
    }
    return seq;
  },

  progression: function (length, band, divisions) {
    var range, offset, seq = [];
    if(band !== undefined && divisions !== undefined){
      range = Math.floor(colundi.length/divisions);
      offset = range*band;
    } else {
      range = colundi.length;
      offset = 0;
    }
    for (var i = 0, item = 0; i < length; item++) {
      item = item % range;
      if(Math.random() > 0.3){
        seq.push(colundi[item+offset]);
        i++;
      }
    }

    return seq;


  },

  index: function (i) {
    return colundi[i%colundi.length];
  }

};
