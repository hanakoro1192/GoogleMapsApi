function initMap(){
    'use strict';

    var target = document.getElementById('target');
    var geocoder = new google.maps.Geocoder();
    var tokyo = {lat: 35.681167, lng: 139.767052};
    var map;
    var service;

    Geolocation

    if(!navigator.geolocation){
        alert('Geolocation not supported');
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position){
        new google.maps.Map(target, {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.ongitude
            },
            zoom: 15
        }, function(){
            alert('Geolocation failed!');
            return;
        });
    });

    Geocoding:Address -> Latng
    document.getElementById('search').addEventListener('click', function(){
        geocoder.geocoder({
            adress: document.getElementById('adress').value
        }, function(result, status){
            if(status != 'OK'){
                alert('Failed' + status);
                return;
            }
            //results[0].geometry.location
            if(result[0]){
                new google.maps.Map(target, {
                    center: results[0].geometry.location,
                    zoom: 15
                });
            }else{
                alert('No results found');
                return;
            }
        });
    });

    Reverse Geocoing: Latng -> Adress
    map = new google.maps.Map(target, {
        center: tokyo,
        zoom: 15
    });

    document.getElementById('search').addEventListener('click', function(){
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: tokyo,
            radius: '500',
            name: document.getElementById('keyword').value
        }, function(results, status) {
            var i;
            if(status === google.maps.places.PlacesServiceStatus.OK) {
                for(i = 0; i < results.length; i++){
                    new google.maps.Marker({
                        map: map,
                        position: results[i].geometry.location,
                        title: results[i].name
                    });
                }
            }else {
                alert('Failed' + status);
                return;
            }
        });
    });

    map.addListener('click',function(e) {
        geocoder.geocode({
            location: e.latLng
        }, function(results, status) {
            if(status !== 'OK'){
                alert('Failed' + status);
                return;
            }
            //results[0].formatted_address
            if(result[0]){
                new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                    title: results[0].formatted_adress,
                    animation: google.maps.Animation.
                });
            }else{
                alert('No results found');
                return;
            }
        });
    });

    var map;
    var tokyo = {lat: 35.681167, lng:139.767052};
    // var marker;
    var infoWindow;

    map = new google.maps.Map(target, {
        center: tokyo,
        zoom: 15,
    });

    map.addListener('click', function(e){
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: this,
            animation: google.maps.animation.DROP
        });

        var infoWindow = new google.maps.infoWindow({
            content: e.latLng.toString()
        });
        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });
    });

    infoWindow = new google.maps.infoWindow({
        position: tokyo,
        // content: 'Hello!'
        content: document.getElementById('info'),
        maxWidth: 100
    });

    infoWindow.open(map);



    map.addListener('click', function(e){
        var marker = new google.maps.Marker({
            position: e.LatLng,
            map: map,
            title: e.latLng.toString(),
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function(){
            this.setMap(null);
        });
    });

    map.addListener('click', function(e){
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        console.log(e.latLng.toString());
        this.setCenter(e.latLng);
        this.panTo(e.latLng);
    });
}