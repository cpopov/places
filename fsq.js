var appKey = process.argv[2];
var userKey = process.argv[3];
var ll = process.argv[4];

var foursquare = require('./foursquare.js')(appKey, userKey);


function printCSVHeader() {
    console.log("Name, Lat, Lng, Address, Postal code, City, Category1 ");
}

function printCSVVenue(venue) {
    var line = venue.name + ",";
    line+=venue.location.lat + ",";
    line+=venue.location.lng + ",";
    line+=venue.location.address + ",";
    line+=venue.location.postalCode + ",";
    line+=venue.location.city + ",";
    if (venue.categories[0]) {
        line+=venue.categories[0].name;
    }

    console.log(line);
}


printCSVHeader();
foursquare.search(ll, function(err, response) {
    response.response.venues.forEach(printCSVVenue);
});


