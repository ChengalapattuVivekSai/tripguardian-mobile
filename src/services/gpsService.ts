import * as Location
from 'expo-location';

// Development fallback location (San Francisco)
const DEVELOPMENT_LOCATION = {
  latitude: 37.7749,
  longitude: -122.4194,
  altitude: 0,
  accuracy: 10,
  altitudeAccuracy: 0,
  heading: 0,
  speed: 0
};

export async function
getCurrentLocation(){

    try {
      console.log('[GPS] Requesting location permission...');
      const permission =
        await Location
        .requestForegroundPermissionsAsync();

      console.log('[GPS] Permission status:', permission.status);

      if(
        permission.status
        !==
        'granted'
      ){
        console.warn('[GPS] Location permission denied, using development location');
        return {
          coords: DEVELOPMENT_LOCATION
        };
      }

      console.log('[GPS] Getting current position...');
      const location =
        await Location
        .getCurrentPositionAsync({
          accuracy:
            Location
            .Accuracy
            .Highest
        });

      console.log('[GPS] Location received:', location.coords);
      return location;

    } catch (error) {
      console.warn('[GPS] Location error, using development location:', error);
      console.log('[GPS] Returning fallback location:', DEVELOPMENT_LOCATION);
      return {
        coords: DEVELOPMENT_LOCATION
      };
    }

}