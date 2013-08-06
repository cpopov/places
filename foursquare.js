var https = require('https'),
    querystring = require('querystring');

module.exports = function(appId,secretKey){

    function request(method, path, callback){
        var requestOptions,
            req;

        requestOptions = {
            host: "api.foursquare.com",
            method: method,
            port: 443,
            path: "/v2"+path,
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
        var me = this,
            err;

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
                    response = "Foursquare did not return JSON";
                };
                return callback(err, response);
            });
        });
    }

    function buildQuery(path, appId, secretKey, obj) {
        var requestData;

        if(obj){
            requestData = querystring.stringify(obj);
            path += '?'+requestData+'&';
        } else {
            path += '?';
        };
        return path+'client_id='+appId+'&client_secret='+secretKey+'&v=20130708';
    }





    return {
        venue : function(venueId, callback){
            request('GET',buildQuery('/venues/'+venueId, appId, secretKey), callback);
        },

        search : function(lat, lon, callback){
            request('GET',buildQuery('/venues/search', appId, secretKey, {ll:lat+","+lon, radius:10000, intent: "browse", limit: 100000}), callback);
        }
    };
}
