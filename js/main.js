// // AIzaSyDGayMW45wByWyVSybVqqSW53e586BdoDQ
// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {
        var origin_place_id1 = null;
        var destination_place_id = null;
        var travel_mode = 'DRIVING';
        var origin_place_id3 = null;
        var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          center: {lat: 37.7, lng: -122.2},
          zoom: 10,
          styles: [{
            stylers: [{ visibility: 'simplified' }]
          }, {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }]
        });
        // var directionsService = new google.maps.DirectionsService;
        // var directionsDisplay = new google.maps.DirectionsRenderer;
        // directionsDisplay.setMap(map);

        var origin_input1 = document.getElementById('origin-input1');
        var destination_input = document.getElementById('destination-input');
        var origin_input3 = document.getElementById('origin-input3');
        var modes = document.getElementById('mode-selector');

        // map.controls[google.maps.ControlPosition.LEFT].push(origin_input1); // pushing these input thingys onto map
        // map.controls[google.maps.ControlPosition.LEFT].push(destination_input);
        // map.controls[google.maps.ControlPosition.LEFT].push(modes);
        // map.controls[google.maps.ControlPosition.LEFT].push(origin_input3);

        var origin_autocomplete1 = new google.maps.places.Autocomplete(origin_input1);
        origin_autocomplete1.bindTo('bounds', map);
        var destination_autocomplete =
            new google.maps.places.Autocomplete(destination_input);
        destination_autocomplete.bindTo('bounds', map);

        var origin_autocomplete3 = new google.maps.places.Autocomplete(origin_input3);
        origin_autocomplete3.bindTo('bounds', map);

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        // function setupClickListener(id, mode) {
        //   var radioButton = document.getElementById(id);
        //   radioButton.addEventListener('click', function() {
        //     travel_mode = mode;
        //   });
        // }
        // setupClickListener('changemode-walking', 'WALKING');
        // setupClickListener('changemode-transit', 'TRANSIT');
        // setupClickListener('changemode-driving', 'DRIVING');
        // setupClickListener('changemode-bicycling', 'BICYCLING');


        function expandViewportToFitPlace(map, place) {
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
          }
        }

        origin_autocomplete1.addListener('place_changed', function() {
          var place = origin_autocomplete1.getPlace();
          
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }
         
          expandViewportToFitPlace(map, place);

          // If the place has a geometry, store its place ID and route if we have
          // the other place ID
          // origin_place_id = place.place_id;
          // route(origin_place_id, destination_place_id, travel_mode,
          //       directionsService, directionsDisplay);
        });
        
        destination_autocomplete.addListener('place_changed', function() {
          var place = destination_autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }
          expandViewportToFitPlace(map, place);

          // If the place has a geometry, store its place ID and route if we have
          // the other place ID
          // destination_place_id = place.place_id;
          // route(origin_place_id, destination_place_id, travel_mode,
          //       directionsService, directionsDisplay);
       
        });

        origin_autocomplete3.addListener('place_changed', function() {
          var place = origin_autocomplete3.getPlace();
          
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }
         
          expandViewportToFitPlace(map, place);

          // If the place has a geometry, store its place ID and route if we have
          // the other place ID
          // origin_place_id = place.place_id;
          // route(origin_place_id, destination_place_id, travel_mode,
          //       directionsService, directionsDisplay);

           con();

        });


        var infowindow;

        // finding midpoint
        function con(){
          
          
        
          var placeOrigin1 = origin_autocomplete1.getPlace();
          var placeDes    = destination_autocomplete.getPlace();
          var placeOrigin3 = origin_autocomplete3.getPlace();

          var avgLat = (placeOrigin1.geometry.location.lat() + placeDes.geometry.location.lat() + placeOrigin3.geometry.location.lat())/3;
          var avgLng = (placeOrigin1.geometry.location.lng() + placeDes.geometry.location.lng() + placeOrigin3.geometry.location.lng())/3;

          var midpoint = {lat: avgLat, lng: avgLng};

          console.log(midpoint);
          
          map = new google.maps.Map(document.getElementById('map'), {
          center: midpoint,
          zoom: 11
          });

          
          infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: midpoint,
          radius: 10000,
          type: ['bar']
        }, callback);

        
      }

      function callback(results, status) {
        
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < 5; i++) { // taking out results.length and replacing with top five spots... 
            createMarker(results[i]);
            addToList(results[i]);
            console.log(results[i]);
            
            
        
          }
        }
      }
      
      //Add to list
      function addToList(place) {
        var $thingLi = $('<li>');
        $thingLi.text(place.name);
        console.log(place);
        $('#fav-thing').append('<li>Hello!</li>');
        $('#output').append('<h5>' + place.name +'</h5>');
        $('#output').append('<p>'+ place.vicinity +', rating: '+ place.rating +'</p>');
    
   
      }

      // Create the markers on the map
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });




        }


        // function route(origin_place_id, destination_place_id, travel_mode,
        //                directionsService, directionsDisplay) {
        //   if (!origin_place_id || !destination_place_id) {
        //     return;
        //   }
        //   directionsService.route({
        //     origin: {'placeId': origin_place_id},
        //     destination: {'placeId': destination_place_id},
        //     travelMode: travel_mode
        //   }, function(response, status) {
        //     console.log(response);
        //     if (status === 'OK') {
        //       directionsDisplay.setDirections(response);
        //     } else {
        //       window.alert('Directions request failed due to ' + status);
        //     }
        //   });
        // }
      }