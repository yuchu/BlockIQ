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
var censusCall = "long lat empty";
var tractCall = "tract empty";
var FIPSCode = "No FIPS Code";

var processFIPSCode = function(FIPSCode) {
  // console.log(FIPSCode);
  var state = FIPSCode.substring(0,2);
  var county = FIPSCode.substring(2,5);
  var tract = FIPSCode.substring(5,11);
  var block = FIPSCode.substring(11,15);
  FIPStoinfo(state,county,tract);
};

var CensusTract;

var removeCensusTract = function(CensusTract) {
      map.removeLayer(CensusTract);
    };

var CensusTractGeoJSON = function(FIPSCode){
  url = "https://raw.githubusercontent.com/yuchu/BlockIQ/master/Census_Tracts_2010.geojson";
  $.ajax(url).done(function(data){
    parsed= JSON.parse(data);
    console.log(parsed);
    CensusTract = L.geoJson(parsed, {
      filter: function(feature){
        return (feature.properties.GEOID10==FIPSCode.substring(0,11));
      }
    }).addTo(map);
    // console.log(FIPSCode,FIPSCode.substring(0,11));
  });
};

var FIPStoinfo = function(state,county,tract){
  httpCensus = "http://api.census.gov/data/2014/acs5";
  censusKey = "&key=ccda5ba8300d0a723e4cba2a1a0e7cf9b2768b46";
  population = "B01003_001E";
  medianAge = "B01002_001E";


  params = "?get=" + population + "," + medianAge + "&";
  geography = "for=tract:" + tract + "&in=state:" + state+ "+county:" + county;
  tractCall = httpCensus + params + geography + censusKey;
  // console.log(tractCall);
  $.ajax({
    url: tractCall,
    crossDomain:true,
    success: function (data, textStatus, xhr) {
      // console.log(data);
  }
});
};

//Get Long and Lat from center of map, then call FCC Block Converter API
//On pressing enter in search bar

var marker = [];
var plotMarkers = function(marker){
      marker.addTo(map);
    };
var removeMarker = function(marker) {
      map.removeLayer(marker);
    };

var geocoder = function() {
  var query = $('#addressInput').val();

  $.ajax({
    url: "http://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=1&countrycodes=US&q="+query+" philadelphia pa",
  }).done(function(data) {
    console.log(data, _.first(data).lat, _.first(data).lon);
    var latitude = _.first(data).lat;
    var longitude = _.first(data).lon;
    marker = L.marker([latitude, longitude]);
    plotMarkers(marker);

    censusCall = "https://data.fcc.gov/api/block/find?format=jsonp&latitude=" + latitude +"&longitude="+ longitude + "&showall=false";
    $.ajax({
      url: censusCall,
      type: 'GET',
      dataType: 'jsonp',
      crossDomain:true,
      success: function (data, textStatus, xhr) {
      FIPSCode = data.Block.FIPS;
      console.log(FIPSCode);
      processFIPSCode(FIPSCode);
      CensusTractGeoJSON(FIPSCode);
      // plotCensusTract();
      if(typeof CensusTract !== 'undefined'){
        removeCensusTract(CensusTract);
      }
    }
  });
  });
};

$('#addressInput').keypress(function(e){
  removeMarker(marker);

  if(e.which == 13) {
    geocoder();

  }
});


// $("#leaflet-control-geosearch-qry").keypress(function(e) {
//     if(e.which == 13) {
//     var latitude = control._positionMarker._latlng.lat;
//     var longitude = control._positionMarker._latlng.lng;
//     censusCall = "https://data.fcc.gov/api/block/find?format=jsonp&latitude=" + latitude +"&longitude="+ longitude + "&showall=false";
//     $.ajax({
//       url: censusCall,
//       type: 'GET',
//       dataType: 'jsonp',
//       crossDomain:true,
//       success: function (data, textStatus, xhr) {
//       FIPSCode = data.Block.FIPS;
//       console.log(FIPSCode);
//       processFIPSCode(FIPSCode);
//       drawCensusTract(FIPSCode);
//     }
//   });
// }});

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
