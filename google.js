var https = require('https'),
    querystring = require('querystring');

module.exports = function(appId){

    function request(method, path, callback){
        var requestOptions,
            req;

        requestOptions = {
            host: "maps.googleapis.com",
            method: method,
            port: 443,
            path: "/maps/api/place"+path,
            headers: {
                'Accept': 'text/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': '0'
            }
        };

        req = https.request(requestOptions);
        response(req, callback);
        req.write('');
        req.end();
    }

    function response(req, callback){
        var err;

        if(typeof req === 'function') return;

        req.on('response', function(res){
            var response = '';

            res.setEncoding('utf8');
            res.on('data', function(data){
                response += data;
            });
            res.on('end', function(){
                err = res.statusCode;
                try {
                    response = JSON.parse(response);
                } catch(e) {
                    err = 500;
                    response = "Google did not return JSON";
                };
                return callback(err, response);
            });
        });
    }

    function buildQuery(path, appId, obj) {
        var requestData;

        if(obj){
            requestData = querystring.stringify(obj);
            path += '?'+requestData+'&';
        } else {
            path += '?';
        };
        return path+'key='+appId;
    }


    return {
        details : function(reference, callback){
            request('GET',buildQuery('/details/json', appId, {reference:reference, sensor:false}), callback);
        },

        search : function(ll, callback){
            request('GET',buildQuery('/nearbysearch/json', appId, {location:ll, radius:10000, sensor:false}), callback);
        },
        
        searchPage : function(ll, pagetoken, callback){
            request('GET',buildQuery('/nearbysearch/json', appId, {location:ll, radius:10000, sensor:false, pagetoken:pagetoken}), callback);
        }
    };
};
