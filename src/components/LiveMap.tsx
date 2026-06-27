import React from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LiveMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0">

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

    <style>
      html,body,#map{
        height:100%;
        width:100%;
        margin:0;
        padding:0;
      }
    </style>
  </head>

  <body>

    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>

      const map = L.map('map').setView(
        [${latitude},${longitude}],
        16
      );

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      ).addTo(map);

      L.marker([
        ${latitude},
        ${longitude}
      ]).addTo(map);

      L.circle(
        [
          ${latitude},
          ${longitude}
        ],
        {
          radius:50,
          color:'blue'
        }
      ).addTo(map);

    </script>

  </body>
  </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={{
        width: Dimensions.get('window').width,
        height: 350,
      }}
    />
  );
}