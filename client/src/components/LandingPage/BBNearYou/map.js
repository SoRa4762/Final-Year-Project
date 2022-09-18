import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// import "./map.css";
import { MapWrap, Mapp } from "./MapElements";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(87.258388);
  const [lat] = useState(26.6739314);
  const [zoom] = useState(14);
  //   const [API_KEY] = useState("hfCqLhC60Nc6JXEa7fgh");

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/openstreetmap/style.json?key=hfCqLhC60Nc6JXEa7fgh`,
      center: [lng, lat],
      zoom: zoom,
    });

    //adding control
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    //adding popups
    const markerPopup = new maplibregl.Popup({
      closeOnClick: true,
    }).setHTML("<b> A popup that is shown when you click on a marker</b>");

    const ABCInfo = new maplibregl.Popup({
      closeOnClick: true,
    }).setHTML(
      "<b>ABC Blood Bank</b> <br/> <b>Contact Info:</b> 9878457845 <br/> <b>Avaibility:</b> 24 Hr"
    );

    const NewBBInfo = new maplibregl.Popup({
      closeOnClick: true,
    }).setHTML(
      "<b>New Blood Bank</b> <br/> <b>Contact Info:</b> 025-755487 <br/> <b>Avaibility:</b> 24 Hr"
    );

    const MewMewInfo = new maplibregl.Popup({
      closeOnClick: true,
    }).setHTML(
      "<b>Mew Mew Blood Bank</b> <br/> <b>Contact Info:</b> 9878423515 <br/> <b>Avaibility:</b> 24 Hr"
    );

    const TBBInfo = new maplibregl.Popup({
      closeOnClick: true,
    }).setHTML(
      "<b>Test Blood Bank</b> <br/> <b>Contact Info:</b> 025-475303 <br/> <b>Avaibility:</b> 5AM - 10PM"
    );

    //adding markers
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .setPopup(markerPopup)
      .addTo(map.current);

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([87.2748964, 26.6622505])
      .setPopup(ABCInfo)
      .addTo(map.current);

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([87.2770008, 26.7953984])
      .setPopup(NewBBInfo)
      .addTo(map.current);

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([87.28381, 26.8126101])
      .setPopup(MewMewInfo)
      .addTo(map.current);

    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([87.258388, 26.6739314])
      .setPopup(TBBInfo)
      .addTo(map.current);
  });

  return (
    <MapWrap>
      <Mapp ref={mapContainer}></Mapp>
    </MapWrap>
  );
}
