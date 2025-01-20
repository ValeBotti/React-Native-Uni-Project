import CommunicationController from "./CommunicationController";
import { retrieveSid, retrieveUid } from "./AsyncStorageController";

//recupera i dati di user dal server
export async function getUser() {
    console.log("getUser called");
    try {
        let uid = await retrieveUid();
        let endpoint = "user/" + uid;
        let sid = await retrieveSid();
        let queryParams = {sid: sid};
        let data = await CommunicationController.genericGetRequest(endpoint, queryParams);

        if (data.cardExpireMonth < 10) {
            data.cardExpireMonth = "0" + data.cardExpireMonth;
        }
        return data;
    } catch (error) {
        console.log("Errore nella chiamata getUser: ", error);
    }
}

//aggiorna o crea un elemento sul server con i dati dello user
export async function putUser(bodyParams) {
    console.log("putUser called");
    try {
        let uid = await retrieveUid();
        let endpoint = "user/" + uid;
        let queryParams = {};
        let sid = await retrieveSid();
        bodyParams.sid = sid;
        console.log(bodyParams);
        let data = await CommunicationController.genericPutRequest(endpoint, queryParams, bodyParams);
        return data;

    } catch (error) {
        console.log("Errore nella chiamata putUser: ", error);
    }
}

//recupera i dati del menu dal server (i primi 20 in base alla posizione dell'utente)
export async function getSecificMenuList(lat, lng) {
    console.log("getSecificMenuList called");
    console.log("lat: ", lat, "lng: ", lng);
    try {
        let endpoint = "menu/";
        let sid = await retrieveSid();
        let queryParams = {
            lat: lat,
            lng: lng,
            sid: sid
        };        
        let data = await CommunicationController.genericGetRequest(endpoint, queryParams);
        return data;
    } catch (error) {
        console.log("Errore nella chiamata getUser: ", error);
    }
}

//recupera l'immagine del menu dal server in base all'id del menu corrente
export async function getSecificMenuImage(mid) {
    //console.log("getSecificMenuImage called");
    try {
        let endpoint = "menu/" + mid + "/image";
        let sid = await retrieveSid();
        let queryParams = { sid: sid };        
        let data = await CommunicationController.genericGetRequest(endpoint, queryParams);
        return data;
    } catch (error) {
        console.log("Errore nella chiamata getUser: ", error);
    }
}

//recupera la descrizione lunga del menu dal server in base all'id del menu corrente
export async function getSecificMenu(mid, lat, lng) {
    console.log("getSecificMenu called");
    try {
        let endpoint = "menu/" + mid;
        let sid = await retrieveSid();

        let queryParams = {
            lat: lat,
            lng: lng,
            sid: sid
        };        
        let data = await CommunicationController.genericGetRequest(endpoint, queryParams);
        return data;
    } catch (error) {
        console.log("Errore nella chiamata getUser: ", error);
    }
}

//effettua l'acquisto sul server
export async function postBuyMenu(mid, location) {
    console.log("postBuyMenu called");

    try {
        let endpoint = "menu/" + mid + "/buy";
        let sid = await retrieveSid();

        let queryParams = {};

        console.log("location: ", location);

        let bodyParams = {
            sid: sid,
            deliveryLocation: location,
        };

        let data = await CommunicationController.genericPostRequest(endpoint, queryParams, bodyParams);
        return data;
    } catch (error) {
        console.log("Errore nella chiamata postBuyMenu: ", error);
        return null;
    }
}

export async function getOrder(oid) {
    //console.log("getOrder called");
    try {
        let endpoint = "order/" + oid;
        let sid = await retrieveSid();
        let queryParams = { sid: sid };        
        let data = await CommunicationController.genericGetRequest(endpoint, queryParams);
        return data;
    } catch (error) {
        console.log("Errore nella chiamata getOrder: ", error);
    }
}