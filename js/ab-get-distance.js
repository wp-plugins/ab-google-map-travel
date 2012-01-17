// JavaScript Document
var directionDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize(lat,lng) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    //var location = new google.maps.LatLng(-33.92487, 18.42406);
	var location = new google.maps.LatLng(lat, lng);
    
    var zm =  parseInt(document.getElementById('map_zoom').value);

    var myOptions = {
 
      zoom: zm,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: location
    }
    
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);

  }

  function calcRoute(from,to){
	var start = from;
    var end = to;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
	unitSystem: google.maps.DirectionsUnitSystem.METRIC
    };
    // function to round the decimal digits eg: round(123.456,2); gives 123.45
    function round(number,X) {
        X = (!X ? 2 : X);
        return Math.round(number*Math.pow(10,X))/Math.pow(10,X);
    }

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);

		distance = response.routes[0].legs[0].distance.text;
		time_taken = response.routes[0].legs[0].duration.text;
                
                calc_distance = response.routes[0].legs[0].distance.value;

                less_five =  document.getElementById('less_five').value;
                more_five =  document.getElementById('more_five').value;
                
                if (calc_distance <= 5010) {
                    amount_to_pay = calc_distance * less_five;
                }
                else {
                    amount_to_pay = calc_distance * more_five;
                }
                
                rounded_amount_to_pay = round(amount_to_pay/1000,2); 

		document.getElementById('distance').innerHTML = '<div class="distance-inner">'+ "The distance between <em>"+from+"</em> and <em>"+to+"</em>: <strong>"+distance+"</strong>\n\
                <br/>\n\
                Time take to travel: <strong>"+time_taken+"</strong><br/>\n\
                <br/><strong>Charge to be paid: $"+rounded_amount_to_pay+"</strong>\n\
                <br/><em>Charge rate: <5kms: $"+less_five+", >5kms: $"+more_five+" </em></div>";
                
		steps = "<ul>";
		var myRoute = response.routes[0].legs[0];
		for (var i = 0; i < myRoute.steps.length; i++) {
		 steps += "<li>" + myRoute.steps[i].instructions + "</li>";
		}
		steps += "</ul>";
		document.getElementById('steps').innerHTML = '<div class="steps-inner"><h2>Driving directions to '+response.routes[0].legs[0].end_address+'</h2>'+steps+'</div>';
      }
	  else{
		document.getElementById('distance').innerHTML = '<span class="gdc-error">Google Map could not be created for the entered parameters. Please be specific while providing the destination location.</span>';
	  }
    });
  }

//window.onload=function(){initialize();}