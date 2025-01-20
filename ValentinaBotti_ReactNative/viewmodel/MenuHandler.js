import { getSecificMenuList, getSecificMenuImage, getSecificMenu } from '../model/APICalls';
import { returnDBistance } from '../viewmodel/AppStateHandler';

//ottiene la lista dei menu in base alla posizione dell'utente e setta lo stato
export const fetchMenuList = async (location, setMenuList) => {
    try {
        console.log(location.lat, location.lng);
        const listaMenu = await getSecificMenuList(location.lat, location.lng);
        setMenuList(listaMenu);
    } catch (error) {
        console.log(error);
    }
};

//ottiene l'immagine del menu in base all'id del menu corrente la ritorna
export async function fetchMenuImage(menuId) {
    try {
        const data = await getSecificMenuImage(menuId);
        if (!data) {
            return null;
        }
        const base64Image = `data:image/jpeg;base64,${data.base64}`;
        return base64Image;
    } catch (error) {
        console.error("Errore nel caricamento dell'immagine:", error);
        throw error;
    }
}

//ottiene i menu vicini con la descrizione lunga del menu in base all'id del menu corrente e setta lo stato
export const fetchMenu = async (mid, location, setMenu, setImage) => {
    try {
        console.log(mid, location.lat, location.lng);
        const menu = await getSecificMenu(mid, location.lat, location.lng);
        if (menu.mid !== undefined) {
            checkImageDBpresence_getImageOnServer_SetImage(menu.mid, menu.imageVersion, setImage);
        }
        setMenu(menu);
    } catch (error) {
        console.log(error);
    }
};

//controlla se l'immagine del menu è presente nel db, se non lo è la recupera dal server e la salva nel db. Poi aggiorna l'immagine nel componente
export const checkImageDBpresence_getImageOnServer_SetImage = async (mid, version, setImage) => {
    try {
        const dbController = returnDBistance();
        const imageBase64 = await dbController.retrieveMenuImageFromDB(mid, version);

        if (imageBase64) {
            console.log("imagine presa dal db");
            setImage(imageBase64);
        } else if ( imageBase64 === null ) {
            fetchMenuImage(mid).then((base64Image) => {
                console.log("imagine presa dal server");
                dbController.saveMenu(mid, version, base64Image);
                setImage(base64Image);
            });
        }
    } catch (error) {
        console.error("Errore nell'apertura del database:", error);
    }
}