import { Alert } from "react-native";
import isEqual from 'lodash/isEqual';

import * as Location from 'expo-location';

import { postBuyMenu, getUser } from "../model/APICalls";
import { storeUserProfileData } from "../model/AsyncStorageController";

export const handleAcquista = async (datiProfilo, setPage, mid, location, setDatiProfilo) => {
    const profiloVuoto =  {
        "cardCVV": null,
        "cardExpireMonth": null,
        "cardExpireYear": null,
        "cardFullName": null,
        "cardNumber": null,
        "firstName": null,
        "lastName": null,
        "lastOid": null,
        "orderStatus": null,
        "uid": null
    }

    if (location.lat == 37.77 && location.lng == -122.41) {
        const hasPermission =  await Location.getForegroundPermissionsAsync();
        console.log(hasPermission)
        if (!hasPermission.granted){
            if (!hasPermission.canAskAgain) {
                Alert.alert("Attenzione", "Per effettuare l'acquisto è necessario l'accesso alla posizione, vai sulle impostazioni per dare i permessi all'app");
            } else {
                Alert.alert("Attenzione", "Per effettuare l'acquisto è necessario l'accesso alla posizione");
            }
            setPage("listaMenu");
            await Location.requestForegroundPermissionsAsync();
        } else {
            preceedToBuy(mid, location, setPage, setDatiProfilo);
        }
    } else if (isEqual(datiProfilo, profiloVuoto)) {
        Alert.alert("Attenzione", "Accedi al tuo profilo ed inserisci il tuo nominativo ed i tuoi dati della carta di credito per procedere all'acquisto");
        console.log("Profilo vuoto");
    } else if (datiProfilo.lastOid === null) {
        console.log("Profilo non vuoto, ma non è mai stata fatta una consegna");
        try {
            await retriveProfileDataFromServer(setDatiProfilo);

            try {
                preceedToBuy(mid, location, setPage, setDatiProfilo);
            } catch (error) {
                console.error("Errore durante il recupero dei dati del profilo", error);
            }

            console.log("Dati profilo recuperati", datiProfilo);
            
        } catch (error) {
            console.error("Errore durante il recupero dei dati del profilo", error);
        }
    }  else if (datiProfilo.orderStatus === "ON_DELIVERY") {
        Alert.alert("Attenzione", "Hai già effettuato un ordine, attendi la consegna");
        return;
    } else if (datiProfilo.orderStatus === "COMPLETED") {
        try {
            preceedToBuy(mid, location, setPage, setDatiProfilo);
        } catch (error) {
            console.error("Errore durante il recupero dei dati del profilo", error);   
        }
        return;
    }
};

//recupera i dati del profilo dal server per verificare se l'acquisto è stato fatto in precedenza
export const retriveProfileDataFromServer = async (setDatiProfilo) => {
    try {
        const userData = await getUser();
        setDatiProfilo(userData);
        console.log("userData presi dal server: ", userData);
        storeUserProfileData(userData);

    }catch(error){
        console.error("Errore durante il recupero dei dati del profilo", error);
    }
}

//se l'utente è idoneo all'acquisto procede con la richiesta al server, aggiorna i dati del profilo, inserisce i dati di consegna e cambia pagina
const preceedToBuy = async (mid, location, setPage, setDatiProfilo) => {
    try {
        const datiAcquisto = await postBuyMenu(mid, location)

        if (datiAcquisto !== null) {
            try {
                await retriveProfileDataFromServer(setDatiProfilo);
            } catch (error) {
                console.error("Errore durante l'acquisto", error);
            }
            console.log("Acquisto effettuato", datiAcquisto);
            setPage("statoConsegna");
        } else {
            Alert.alert("Attenzione, il numero della carta inserito non è corretto.", "Puoi modificalo per effettuare l'ordine!")
            setPage("modificaProfilo")
        }
    }catch(error) {
        console.error("Errore durante l'acquisto", error);
    }
}