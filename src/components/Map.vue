                                            <!-- Map child component -->
<!-- --------------------------------------------------------------------------------------------------------------------- -->
<script setup lang="ts">
    //imports
    import { onMounted, watch } from 'vue'
    import type { PropType } from 'vue'
    import type { Camp } from '../assets/camps'

    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    import Geocoder from 'leaflet-control-geocoder';

    //props
    /* create an object called props to define all 
    the props in use */
    const props = defineProps ({
        //define the prop name and type here
        camps: Array as PropType<Camp[]>,
        activeCamp: Number as PropType<number | null>
    })

    //custom markers
    /* each marker includes the path to an  image.
    remember to use the path from the src dir, not './assets'.
    otherwise, it does not work */
    var blueMarker = L.icon({
        iconUrl: 'src/assets/icons/blue-icon.png',
        iconSize: [21, 34],
    })
    var redMarker = L.icon({
        iconUrl: 'src/assets/icons/red-icon.png',
        iconSize: [21, 34],
    })
    var greenMarker = L.icon({
        iconUrl: 'src/assets/icons/green-icon.png',
        iconSize: [21, 34],
    })

    const locationPin = L.icon({
        iconUrl: 'src/assets/icons/location-pin.svg',
        iconSize: [30, 30],
    });

    //variables
    // empty array to hold all markers
    var markersArr: L.Marker[] = []
    let map: L.Map | L.LayerGroup<any> 

    //events
    /* define an emit object called emit and
    include all the emits/events in use. for example, 
    we have the clickMaker event */
    const emit = defineEmits(['clickMarker'])

    // function to set up the map
    function setupMap(){

        //scrollWheelZoom disables zoom on mouse scroll
        map = L.map('map', {scrollWheelZoom:false}).setView([51.505, -0.09], 3);

        const layers = {
            OpenStreet:L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'        
            }),

            Topography:L.tileLayer.wms('http://ows.mundialis.de/services/service?',   {
                layers: 'TOPO-WMS'
            }),

        }
        L.control.layers(layers).addTo(map)
        //add OpenStreet as the default layer
        layers.OpenStreet.addTo(map)
        // geocoder
        const GeocoderControl = new Geocoder();
        GeocoderControl.addTo(map);

        if (!navigator.geolocation){
            console.log("Fuck off")
        } else{
            navigator.geolocation.getCurrentPosition(getUserLocation)
        }

        // loop through the campsArr 
        // if(typeof props.camps !== undefined ){
            
        // }
        if (typeof props.camps !== 'undefined'){
            props.camps.forEach((camp: Camp) => {
                /* and create a marker for each camp site using the coordinates
                from camps.js and add markers to our map.
                additionally, add the camp name onto the pop up */
                const marker : any = L.marker([camp.y, camp.x], {icon: locationPin})
                marker.addTo(map)
                marker.bindPopup(camp.name)
                // .openPopup();

                //adding a new property named campId to the object marker
                marker.campId = camp.id
                marker.on('click', () =>{
                    emit('clickMarker', camp.id )
                })
                //add above marker to array
                markersArr.push(marker)
            })
        }
        //adds the array of markers to the map
        var markers: L.FeatureGroup = L.featureGroup(markersArr).addTo(map)
        //zooms and focuses into the area that the markers are located
        map.fitBounds(markers.getBounds())
        map.zoomOut(4)

    }

    /* watch for any changed in the selected camp site 
    and change the marker icon */
    watch(() => props.activeCamp, () => {
        markersArr.forEach(marker => marker.setIcon(blueMarker))
        
        /* when a camp site is selected, 
        set marker to the red marker */
        const activeMarker = markersArr.find(marker => marker.campId == props.activeCamp)
        if (typeof activeMarker === 'undefined') {
            return
        }
        activeMarker.openPopup()
        activeMarker.setIcon(redMarker)
    })
    

    function getUserLocation(position: { coords: { latitude: number; longitude: number; }; }){

        var userMarker

        const lat = position.coords.latitude
        const long = position.coords.longitude

        userMarker = L.marker([lat, long], {icon: locationPin})
        userMarker.addTo(map)
        userMarker.bindPopup('You are here!')

    }

    //call the function after initial rendering
    onMounted(setupMap)

</script>

<template>
    <!-- div to contain the generated map -->
    <div id="map"></div>
</template>


