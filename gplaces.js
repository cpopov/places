var appKey = process.argv[2];
var ll = process.argv[3];
var number = process.argv[4] || 0;

var google = require('./google.js')(appKey);


function printCSVHeader() {
    console.log("Name, Lat, Lng, Categories, Address, Phone number ");
}

function printCSVVenue(venue) {
	var line = venue.name + ",";
    line+=venue.geometry.location.lat + ",";
    line+=venue.geometry.location.lng + ",";
    for (var type in venue.types) {
    	if (venue.types[type]) {
    		line+=venue.types[type]+"/";
    	}
    }
    
	google.details(venue.reference, function(err,response){
		if (err!=500) {
			line+=',';
			line+=response.result.formatted_address + ",";
		    line+=response.result.formatted_phone_number;
		    
		    console.log(line);
	    }
	});
}


printCSVHeader();
var count = 0;
google.search(ll, function(err, response) {
    response.results.forEach(printCSVVenue);
    count+=response.results.length;
    getPage(response.next_page_token);
});

function getPage(pageCode) {
	if (count>number) return;
	google.searchPage(ll, pageCode, function(err, response) {
	    response.results.forEach(printCSVVenue);
	    count+=response.results.length;
	    getPage(response.next_page_token);
	});
}


