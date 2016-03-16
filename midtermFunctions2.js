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

//Reset map function
var resetMap = function() {
  _.each(myMarkers,function(mark){
    map.removeLayer(mark);
  });
  myMarkers = [];
};

//Calling JSON data
var data = schools;

//function for altering the map display
var mapfunc = function(fd, colorstring){_.each (fd, function(ob){
    var lat = ob.geometry.coordinates[1];
    var long = ob.geometry.coordinates[0];
    var schooname = ob.properties.FACIL_NAME;
    myMarkers.push(L.circleMarker([lat,long],{fillColor:colorstring, title: schooname, color: colorstring}).setRadius(3));
  });
  _.each(myMarkers, function(mark){
    mark.addTo(map).bindPopup(mark.options.title);
  });
};

//Slide Object Array
var slideArray = [
  slideNum0 = {
    filterCon: function(ob){return ob.properties.ACTIVE === "Open";}, //filter for all elements
    filterCon2: function(ob){return ob.properties.TYPE === "Charter";},
    filterCon3: function(ob){return ob.properties.TYPE === "District";},
    slideText: "There are 263 public schools in Philadelphia, just under 30% of which are charter schools. To get the actual counts, scroll over the chart below.",
    slideTitle:"Schools Overview", //text shadow css element from Stackoverflow
    pNum: 0,
    graphData: dataZero,
    graphfunc: function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);}, //w3schools "javascript function invocation"
    tablefunc: function(){
      $("#legend1Label1").text("District :").show();
      $("#legendColor1").css('background-color',this.markercolor3); //Stackoverflow thread "jQuery changing style of HTML element"
      $("#legendLabel2").text("Charter :").show();
      $("#legendColor2").css('background-color',this.markercolor2);
    },
    markercolor: "#FF0040", //If a marker of this color shows up, there is an error!
    markercolor2: "#FFC000", //Charter Schools color
    markercolor3: "#C800FF" //District Schools color
  },
  slideNum1 ={
    filterCon:  function(ob){return Number(ob.properties.total_arre) > 5;},
    filterCon2: function(ob){return ob.properties.TYPE === "Charter";},
    filterCon3: function(ob){return ob.properties.TYPE === "District";},
    slideText: "Of the 50 schools that had over 5 students arrested in 2015, only 2 of them were charter schools. Statistics like this are used by charter school advocates to prove that charter schools are safer.",
    slideTitle:"Relative Safety",
    pNum: 1,
    graphData: dataOne,
    graphfunc:  function(canvasOb){new Chart(canvasOb).Bar(this.graphData);},
    tablefunc: function(){
      $("#legend1Label1").text("District :").show();
      $("#legendColor1").css('background-color',this.markercolor3); //Stackoverflow thread "jQuery changing style of HTML element"
      $("#legendLabel2").text("Charter :").show();
      $("#legendColor2").css('background-color',this.markercolor2);
    },
    markercolor: "#FF0040",
    markercolor2: "#FFC000",
    markercolor3: "#C800FF"
  },
  slideNum2 ={
    filterCon:  function(ob){return ob.properties.TYPE === "Charter";},
    filterCon2: function(ob){return ob.properties.GRADE_LEVE === "High School";},
    filterCon3: function(ob){return ob.properties.GRADE_LEVE != "High School";},
    slideText: "However, there are only 13 charter high schools in the city, about 1/6 of all charter schools, and high schools tend to have much worse crime than elementary or middle schools.",
    slideTitle:"Charter School Proportions",
    pNum: 2,
    graphData: dataTwo,
    graphfunc: function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);},
    tablefunc: function(){
      $("#legend1Label1").text("Not High Schools").show();
      $("#legendColor1").css('background-color',this.markercolor3); //Stackoverflow thread "jQuery changing style of HTML element"
      $("#legendLabel2").text("High Schools :").show();
      $("#legendColor2").css('background-color',this.markercolor2);
    },
    markercolor: "#FF0040",
    markercolor2: "#00FFFF",
    markercolor3: "#FF0000"
  },
  slideNum3 ={
    filterCon:  function(ob){return ob.properties.TYPE === "District";},
    filterCon2: function(ob){return ob.properties.GRADE_LEVE === "High School";},
    filterCon3: function(ob){return ob.properties.GRADE_LEVE != "High School";},
    slideText: "By contrast, 39 out of 149 district schools in Philadelphia are high schools. This is a larger proportion, but more importantly, a much larger raw number.",
    slideTitle:"District School Proportions",
    pNum: 3,
    graphData: dataThree,
    graphfunc: function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);},
    tablefunc: function(){
      $("#legend1Label1").text("Not High Schools").show();
      $("#legendColor1").css('background-color',this.markercolor3); //Stackoverflow thread "jQuery changing style of HTML element"
      $("#legendLabel2").text("High Schools :").show();
      $("#legendColor2").css('background-color',this.markercolor2);
    },
    markercolor: "#FF0040",
    markercolor2: "#00FFFF",
    markercolor3: "#FF0000"
  },
  slideNum4 ={
    filterCon:  function(ob){return ob.properties.Zip === "19132" || ob.properties.Zip === "19140" || ob.properties.Zip === "19124" || ob.properties.Zip === "19146";},
    filterCon2: function(ob){return ob.properties.TYPE ==="Charter";},
    filterCon3: function(ob){return ob.properties.TYPE === "District";},
    slideText: "On the other hand, charter schools and district schools are both represented in communities with high crime. In Philadelphia's 4 most dangerous zip codes, corresponding to the neighborhoods of Allegheny West, Gray's Ferry/Point Breeze, Hunting Park, and Frankford, Charter Schoos and District Schools are represented in almost equal proportion.",
    slideTitle:"High Crime Areas",
    pNum: 4,
    graphData: dataFour,
    graphfunc: function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);},
    tablefunc: function(){
      $("#legend1Label1").text("District :").show();
      $("#legendColor1").css('background-color',this.markercolor3); //Stackoverflow thread "jQuery changing style of HTML element"
      $("#legendLabel2").text("Charter :").show();
      $("#legendColor2").css('background-color',this.markercolor2);
    },
    markercolor: "#FF0040",
    markercolor2: "#FFC000",
    markercolor3: "#C800FF"
  },
  slideNum5 ={
    filterCon:  function(ob){return ob.properties.Zip === "19128" || ob.properties.Zip === "19118" || ob.properties.Zip === "19119";},
    filterCon2: function(ob){return ob.properties.TYPE ==="Charter";},
    filterCon3: function(ob){return ob.properties.TYPE === "District";},
    slideText: "There are very few charter schools in Philadlephia's 3 safest zip codes, all located in the far northeast. Overall, charter schools in Philadlephia have lower crime because of the grade they cater to, not because of the areas they're located in.",
    slideTitle:"Low Crime Areas",
    pNum: 5,
    graphData: dataFive,
    graphfunc: function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);},
    tablefunc: function(){
      $("#legend1Label1").text("District :").show();
      $("#legendColor1").css('background-color',this.markercolor3); //Stackoverflow thread "jQuery changing style of HTML element"
      $("#legendLabel2").text("Charter :").show();
      $("#legendColor2").css('background-color',this.markercolor2);
    },
    markercolor: "#FF0040",
    markercolor2: "#FFC000",
    markercolor3: "#C800FF"
  }
];



//Generic function for changing the slide of a map
var changeSlide = function(number) {
  //get current slide from array of slides
  var slide = slideArray[number];

  //change value of slide to that of the current position in the slide array, helps with next and previous slide functions
  var slideNo = (slide.pNum).toString();
  $("#slide").val(slideNo);

  //change slide main text
  var newText = slide.slideText;
  $("#slideText").text(newText);

  //change slide title
  var newTitle = slide.slideTitle;
  $("#titleOfSlide").text(newTitle);

  //change what schools appear on map
  //Filter for all points
  var theFilter = slide.filterCon;
  var dataArray = data.features;
  var filteredData = _.filter(dataArray, theFilter);
  mapfunc(filteredData,slide.markercolor);

  //Filter for points of color 1
  var theFilter2 = slide.filterCon2;
  var dataArray2 = filteredData;
  var filteredData2 = _.filter(dataArray2, theFilter2);
  mapfunc(filteredData2,slide.markercolor2);

  //Filter for points of color 2
  var theFilter3 = slide.filterCon3;
  var dataArray3 = filteredData;
  var filteredData3 = _.filter(dataArray3, theFilter3);
  mapfunc(filteredData3,slide.markercolor3);

  //Create chart
  var ctx = $("#myChart").get(0).getContext("2d");
  var slideGraphData = slide.graphData;
  var slideChart = slide.graphfunc(ctx); //chart making method from chartjs documentation

  //Change legend
  var changeLegend = slide.tablefunc();

  //Slide specific instructions
  if (slideNo === "0"){
    $('#prevslide').hide(); //no previous button on first slide
    map.setZoom(11);
  }
  else if (slideNo === "4") {
    map.setView([40.010454, -75.108772],12);
    $('#nextslide').show();
    $('#prevslide').show();
  }
  else if (slideNo === "5") {
    map.panTo(new L.LatLng(40.047611, -75.200954)); // pan to method from Stackoverflow thread "How to Change the Map Center in Leaflet"
    $('#nextslide').hide();
  } else {
    $('#prevslide').show();
    $('#nextslide').show();
    map.panTo(new L.LatLng(40.010454, -75.108772));
    map.setZoom(11);
  }
};

var myMarkers = [];

//This function adds the initial slide to map, and is called automatically
$(document).ready(function(){
  resetMap();
  changeSlide(0);
});

//This function moves to the next slide
$('#nextslide').click(function(){
  var currentSlide = Number($("#slide").val());
  resetMap();
  changeSlide(currentSlide + 1);
});

//This function moves to the previous slide
$('#prevslide').click(function(){
  var currentSlide = Number($("#slide").val());
  resetMap();
  changeSlide(currentSlide - 1);
});
