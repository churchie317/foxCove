var request = require('request');
var key = require('../secret/api-keys');

// Retrieve news from Guardian for a specific rep

module.exports.getOfficials = function(inputPackage, outputPackage, nextCB){


  var requestCallback = function(error, response, data){
    if( error ){
        console.error(error);
    } else {
        data = JSON.parse(data);
        outputPackage.city = data.normalizedInput.city;
        var offices = data.offices;
        for(var i = 0; i < offices.length; i++){
          var title = offices[i].name;
          for(var j = 0; j < offices[i].officialIndices.length;j++){
            var index = offices[i].officialIndices[j];
            if(!outputPackage[title]){
              outputPackage[title] = [];
            }
            outputPackage[title].push(data.officials[index])
          }
        }
        nextCB();
    }
  }

  var httpRequestOptions = {
    url: 'https://www.googleapis.com/civicinfo/v2/representatives?address='+inputPackage.zip+'&key=' + key.google,
  }

  request(httpRequestOptions, requestCallback);

};

