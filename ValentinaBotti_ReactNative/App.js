import { useEffect, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, AppState } from 'react-native';

import { setCurrentPage, handleAppStateChange } from './viewmodel/AppStateHandler';
import { initTrackLocation, requestLocationPermission } from './viewmodel/LocationHandler';

import Splash from './components/Splash';
import ListaMenu from './components/ListaMenu';
import ModificaProfilo from './components/ModificaProfilo';
import DettagliMenu from './components/DettagliMenu';
import StatoConsegna from './components/StatoConsegna';
//import { deletePage } from './model/AsyncStorageController';

export default function App() {

  const [page, setPage] = useState("splash");
  const [datiProfilo, setDatiProfilo] = useState();
  const [location, setLocation] = useState();
  const [menuId, setMenuId] = useState();

  const trackingSubscription = useRef(null);

  useEffect(() => {
    requestLocationPermission();
    
    setCurrentPage(setPage, setDatiProfilo, setLocation);
  }, []);

  useEffect(() => {
    if (location != null && location != undefined) {
      initTrackLocation(location, setLocation).then((subscription) => {
        trackingSubscription.current = subscription;
      }).catch((error) => {
        console.error("Errore durante il recupero della posizione:", error);
      });
  
      return () => {
        if (trackingSubscription.current != null && trackingSubscription.current != undefined) {
            trackingSubscription.current.remove();
        }
      };
    }
  }, [location]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => handleAppStateChange(nextAppState, page, setPage, setDatiProfilo, setLocation));
    
    return () => {
      subscription.remove();
    }
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      {page === "splash" && (
        <Splash/>
      )}
      {page === "listaMenu" && (
        <ListaMenu
          setPage = {setPage}
          location = {location}
          setMenuId={setMenuId}
          datiProfilo={datiProfilo}
        />
      )}
      {page === "modificaProfilo" && (
        <ModificaProfilo
          setPage = {setPage}
          datiProfilo={datiProfilo}
          setDatiProfilo={setDatiProfilo}
        />
      )}
      {page === "dettagliMenu" && (
        <DettagliMenu
          location = {location}
          setPage = {setPage}
          menuId={menuId}
          datiProfilo={datiProfilo}
          setDatiProfilo={setDatiProfilo}
          setMenuId={setMenuId}
        />
      )}
      {page === "statoConsegna" && (
        <StatoConsegna
          setPage = {setPage}
          location = {location}
          datiProfilo={datiProfilo}
          setDatiProfilo={setDatiProfilo}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight
  },
});
