#!/usr/bin/env node

var foursquare = require('./foursquare.js')('', '');

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
foursquare.search(41.0128,28.9744, function(err, response) {
    response.response.venues.forEach(printCSVVenue);
});


