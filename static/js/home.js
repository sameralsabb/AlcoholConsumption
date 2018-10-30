function createChoropleth(alcoholType){

    document.getElementById('mapcontainer').innerHTML = "<div id='map' style='width:100%;height:100%;'></div>";

    var myMap = L.map("map", {
    center: [0, -0],
    zoom: 3
    });

    const API_KEY = "pk.eyJ1IjoiZnZ1OTU4IiwiYSI6ImNqbTVldHhwajBlZXgzcXJ0bno3bDloaXkifQ.aMSQpbW9A8g7YU9n2If_bg"

    var geojsonPath = "static/js/vectormap.json";

    d3.json(geojsonPath, function (geojsonData) {
    d3.json("/data", function (countryData) {

        var features = geojsonData.features;

        features.forEach(function (feature) {

        var properties = feature.properties;
        var countryCode = properties.iso_a3;

        countryData.forEach(function (country) {
            if (countryCode === country.Country_Code) {
            properties["Beer_Percent"] = country["Beer_Percent"];
            properties["Wine_Percent"] = country["Wine_Percent"];
            properties["Spirits_Percent"] = country["Spirits_Percent"];
            properties["Other_Percent"] = country["Other_Percent"];
            }
        });
        });
        L.choropleth(geojsonData, {
            valueProperty: alcoholType,
            scale: ["white", "blue"],
            weight: 0.25,
            color: "black",
            opacity: 100,
            fillOpacity: .75,
            steps: 5
        }).addTo(myMap);
        

        

        
    });
    });

}

createChoropleth("Beer_Percent");