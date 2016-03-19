/* ================================
Week 7
================================ */

//Map Setup from Week4 Lab 2
var map = L.map('map', {
  center: [40.010454, -75.108772],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


//Search Function
new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.Google(),
    position: 'topcenter',
    showMarker: true,
    retainZoomLevel: true
}).addTo(map);

var censusCall = "long lat empty";
var tractCall = "tract empty";
var FIPSCode = "No FIPS Code";

var processFIPSCode = function(FIPSCode) {
  console.log(FIPSCode);
  var state = FIPSCode.substring(0,2);
  var county = FIPSCode.substring(2,5);
  var tract = FIPSCode.substring(5,11);
  var block = FIPSCode.substring(11,15);
  FIPStoinfo(state,county,tract);
};

var FIPStoinfo = function(state,county,tract){
  httpCensus = "http://api.census.gov/data/2014/acs5";
  censusKey = "&key=ccda5ba8300d0a723e4cba2a1a0e7cf9b2768b46";
  params = "?get=B25119_001E&"; //Test parameters
  geography = "for=tract:" + tract + "&in=state:" + state+ "+county:" + county;
  tractCall = httpCensus + params + geography + censusKey;
  console.log(tractCall);
  $.ajax({
    url: tractCall,
    crossDomain:true,
    success: function (data, textStatus, xhr) {
      console.log(data);
  }
});
};


//Get Long and Lat from center of map, then call FCC Block Converter API
//On pressing enter in search bar
$("#leaflet-control-geosearch-qry").keypress(function(e) {
    if(e.which == 13) {
    var latitude = map.getCenter().lat;
    var longitude = map.getCenter().lng;
    censusCall = "https://data.fcc.gov/api/block/find?format=jsonp&latitude=" + latitude +"&longitude="+ longitude + "&showall=false";
    $.ajax({
      url: censusCall,
      type: 'GET',
      dataType: 'jsonp',
      crossDomain:true,
      success: function (data, textStatus, xhr) {
      FIPSCode = data.Block.FIPS;
      processFIPSCode(FIPSCode);
    }
  });
}});




//Load first page
$(document).ready(function(){
  $('#Scene1').show();
  $('#Scene2').hide();
});


//Load Second Page on Click of function
$('#ToQuizSlide').click(function(){
  //If statement, give alert if geocoding failed
  $('#Scene1').hide();
  $('#Scene2').show();
});
