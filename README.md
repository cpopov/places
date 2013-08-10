places
======

Node.js app to get location data from Google places, Foursquare and others

Usage:

For Google Places API:

node gplaces [appId] [lat,lon] [number]

- appId the appId obtained from google
- lat,lon the the location
- number otpional

For foursquare Venues API:

node fsq [appId] [userKey] [lat,lon]



Foursqure venues:
-----------------
https://api.foursquare.com/v2/venues/search?ll=41.0128,28.9744&client_id=[]&client_secret=[]&v=20130708

Details API
-----------
https://api.foursquare.com/v2/venues/42377700f964a52024201fe3?client_id=[]&client_secret=[]&v=20130708

ll represents lat,lon coordinates. Example: Istanbul: ll=41.0128,28.9744.


Google places
-------------

see https://developers.google.com/places/documentation/search#PlaceSearchRequests


https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.0128,28.9744&&radius=5000&types=food&sensor=false&key=[]

next page
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.0128,28.9744&&radius=5000&types=food&sensor=false&key=[]&pagetoken=ClRNAAAAbPydU8_aB1u4vNNBGk1bQ91lPXTe964kWci-XAJABcsyICY_0NyIwlRsfsA_90AjzNlRDj14rWhmNW2IG2NGw1-fSdnlPI4h4XJV9I65yqISEMdRJvJZg-NIe4vwAzjDmMwaFFno3nxGUd995l99uJ1aumHEZ9fP


Place details
https://maps.googleapis.com/maps/api/place/details/json?reference=CoQBcwAAACWsP1erWt82AZPucDajGu_Usny-f9xdEreWZc4IBEDhKhF7JSdRpRSxVnRigwtFYbIc8nnntbIQHxJxqy3j_VNVVvvo0NdcEYU2B4OMprMyEV_VRrvub0C_HBkjopH3X1gcgFWehZJoCC1i83I7TA--YMRSQ6-vt2pVXlUXjLkOEhDH-sl0tWbZImHMeBWr73PlGhQ7qHHIL1jpix5SiOPVZ9IJL3MYQg&sensor=false&key=[]