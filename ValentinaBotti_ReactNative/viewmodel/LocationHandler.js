import * as Location from 'expo-location';

import { storeSidAndUid } from '../model/AsyncStorageController';

import { isEqual } from 'lodash';

// Funzione per verificare e richiedere i permessi
export async function requestLocationPermission() {
    try {
            const sidUidStored = await storeSidAndUid();
            console.log(sidUidStored)
            if (!sidUidStored) {
                //chiede i permessi all'utente
                await Location.requestForegroundPermissionsAsync();
            }

    } catch (error) {
        console.error("Errore durante la richiesta dei permessi:", error);
        return false;
    }
}

// Funzione per ottenere la posizione corrente
export async function fetchCurrentLocation(setLocation) {
    try {
        const hasPermission =  await Location.getForegroundPermissionsAsync();
        console.log("permessi location", hasPermission)

        if (hasPermission.granted) {
            const locationData = await Location.getCurrentPositionAsync();
            setLocation(
                {
                    lat: Number(locationData.coords.latitude.toFixed(3)),
                    lng: Number(locationData.coords.longitude.toFixed(3))                    
                }
            );
            console.log("Posizione corrente:", locationData);
        } else {
            setLocation({
                lat: 37.77,
                lng: -122.41
            })
        }
    } catch (error) {
        console.error("Errore durante il recupero della posizione: ", error);
        return null;
    }
}

//funzione che aggiorna periodicamente la posizione dell'utente
export const initTrackLocation = async (location, setLocation) => {
    try {

        const hasPermission =  await Location.getForegroundPermissionsAsync();

        if (hasPermission.granted) {
            const subscription = await Location.watchPositionAsync(
                {
                    timeInterval: 1000, // Solo su Android
                    accuracy: Location.Accuracy.Balanced,
                    distanceInterval: 0, // Distanza minima tra ogni aggiornamento (per test l'ho messa a 0)
                },
                locationTrack => {
    
                    const trackedLocation = ({
                        lat : Number(locationTrack.coords.latitude.toFixed(3)),
                        lng : Number(locationTrack.coords.longitude.toFixed(3)) 
                    });
    
                    if (!isEqual(trackedLocation, location) && trackedLocation !== null && location !== undefined) {
                        console.log("LA POSIZIONE È CAMBIATA E AGGIORNATA A QUELLA ATTUALE");
                        console.log("Posizione attuale:", trackedLocation, location);
                        setLocation(trackedLocation);
                    }
                }
            );
        
            return subscription;
        }
    } catch (error) {
        console.error("Errore durante il recupero della posizione: qui", error);
    }
};