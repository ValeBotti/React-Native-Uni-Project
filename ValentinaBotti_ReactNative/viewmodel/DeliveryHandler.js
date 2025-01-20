import { getOrder, getUser } from "../model/APICalls.js";
import { getSecificMenu } from "../model/APICalls.js";
import { storeUserProfileData } from "../model/AsyncStorageController.js";

const setOrderData = async (oid) => {
    try {
        const orderData = await getOrder(oid);
        return orderData;
    } catch (error) {
        console.error("Errore durante il recupero dello stato dell'ordine", error);
    }
}

const setMenuData = async (mid, lat, lng) => {
    try {
        const menuData = await getSecificMenu(mid, lat, lng);
         return menuData;
    } catch (error) {
        console.error("Errore durante il recupero dello stato del menu", error);
    }
}

export const setStatus = async (oid, setDatiOrdine, setMenu, setDatiProfilo) => {
    try {
        const orderData = await setOrderData(oid, setDatiOrdine);
        console.log("Procedo con l'acquisto: ", orderData.status)
        if (orderData.status === "COMPLETED") {
            try {
                await updateUserDataProfile(setDatiProfilo);
            }catch(error){
                console.error("Errore durante l'aggiornamento dei dati del profilo", error);
            }
        }
        setDatiOrdine(orderData);
        try {
            const menuData = await setMenuData(orderData.mid, orderData.deliveryLocation.lat, orderData.deliveryLocation.lng, setMenu);
            setMenu(menuData);
        } catch (error) {
            console.error("Errore durante il recupero dello stato del menu", error);
        }
    } catch (error) {
        console.error("Errore durante il recupero dello stato dell'ordine", error);
    }
}

const updateUserDataProfile = async (setDatiProfilo) => {
    try {
        const userData = await getUser();
        setDatiProfilo(userData);
        console.log("userData presi dal server: ", userData);
        storeUserProfileData(userData);
    } catch (error) {
        console.error("Errore durante il recupero dei dati del profilo", error);
    }
}