mapboxgl.accessToken = mapToken;
// console.log({ campground });
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 10 }).setHTML(`<h3>${campground.title}</h3>`)
  )
  .addTo(map);
