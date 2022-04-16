function myMap() {
    let mapProp = {
        center: new google.maps.LatLng(22.304502, 90.234876),
        zoom: 5
    }
    
    let map = new google.maps.Map(document.getElementById('googleMap'), mapProp)
}

myMap();
