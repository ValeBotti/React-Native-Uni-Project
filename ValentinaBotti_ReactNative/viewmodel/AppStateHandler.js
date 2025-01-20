import { storeSidAndUid, retrieveCurrentPage } from "../model/AsyncStorageController.js";
import { fetchUserData } from "./AsyncStorageViewModel.js";
import { fetchCurrentLocation } from "./LocationHandler.js";

import { storeCurrentMid, retrieveCurrentMid, storeCurrentPage } from "../model/AsyncStorageController.js";
import DBController from "../model/DBController.js";

let dbController = new DBController();

const loadingPageStatus = async (setDatiProfilo, setLocation) => {
    
    try {
        await storeSidAndUid();
    } catch (error) {
        console.log("Errore durante il salvataggio di sid e uid: ", error);
    }

    try {
        await fetchUserData(setDatiProfilo);
    } catch (error) {
        console.log("Errore durante il set dei dati utente: ", error);
    }

    try {
        await fetchCurrentLocation(setLocation);

    } catch (error) {
        console.log("Errore durante il set della posizione: ", error);
    }

    try {
        await dbController.openDB();
        console.log("Database aperto con successo", dbController.db);
    } catch (error) {
        console.log("Errore durante l'apertura del database nell'app state: ", error);
    }
}

export const returnDBistance = () => {
    try {
        if (dbController.db) {
            return dbController;
        } else {
            console.log("Database non aperto");
        }
    } catch (error) {
        console.log("Errore durante l'apertura del database nell'app state: ", error);
    }
}

export const setCurrentPage = async (setPage, setDatiProfilo, setLocation) => {
    try {
    
        await loadingPageStatus(setDatiProfilo, setLocation);
        try {
            const currentPage = await retrieveCurrentPage();
            if (currentPage !== "splash" && currentPage !== undefined && currentPage !== null) {
                console.log("Pagina corrente: ", currentPage);
                setPage(currentPage);
            } else if (currentPage === "dettagliMenu") {
                await retrieveAppStateMenuId(setMenuId);
            } else {
                setPage("listaMenu");
            }
        } catch (error) {
            console.log("Errore nel recupero della pagina corrente: ", error);
        }

    } catch (error) {
        console.log("Errore durante il salvataggio della pagina corrente: ", error);
    }
}

export const saveAppStateMenuId = async (menuId, setMenuId) => {
    try {
        await storeCurrentMid(menuId);
        setMenuId(menuId);
    } catch (error) {
        console.log("Errore durante il salvataggio del menuId: ", error);
    }
}

export const retrieveAppStateMenuId = async (setMenuId) => {
    try {
        const mid = await retrieveCurrentMid();
        if (mid) {
            setMenuId(mid);
        }
    } catch (error) {
        console.log("Errore durante il recupero del menuId: ", error);
    }
}

export const handleAppStateChange = (nextAppState, page, setPage, setDatiProfilo, setLocation) => {
    console.log("App state changed to: ", nextAppState);
    if (nextAppState === "active") {
      console.log("App has come to the foreground!", nextAppState);
      setCurrentPage(setPage, setDatiProfilo, setLocation);
    } else if (nextAppState === "background") {
      console.log("App has come to the background!", nextAppState);
      storeCurrentPage(page);
    }
}