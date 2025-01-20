import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from "./CommunicationController";

//salva l'uid ed il sid nell'asyncstorage (prima controlla se siano già salvati)
export async function storeSidAndUid() {
    try {
        const existingSid = await AsyncStorage.getItem('sid');
        const existingUid = await AsyncStorage.getItem('uid');
        console.log(existingSid)
        console.log(existingUid)
    
        if (!existingSid || !existingUid) {
          try {
            const data = await postUser();
            await AsyncStorage.setItem('sid', data.sid);
            await AsyncStorage.setItem('uid', data.uid.toString());

            return false
          } catch (error) {
            console.log("Errore nel recuperare sid ed uid: ", error);
          }
        } else {
          return true
        }
        
      } catch (error) {
        console.error('Errore nel salvataggio:', error);
    }
}

//CHIAMATA API (UNICA FUORI DA API CALLS): questa funzione recupera il sid e l'uid da associare a user una volta che l'applicazione viene installata
export async function postUser() {
  console.log("postUser called");
  try {
      let endpoint = "user"
      let data = await CommunicationController.genericPostRequest(endpoint);
      return data;
  } catch (error) {
      console.log("Errore nella chiamata postUser: ", error);
  }
}

//salva i dati del profilo utente una volta che l'utente li cambia
export async function storeUserProfileData(userData) {
  try {

      await AsyncStorage.setItem('userData', JSON.stringify(userData));//l'asyncstorage prende solo stringhe

      console.log("Dati utente salvati nell'asyncstorage");
      
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
  }
}

//restituisce i dati del profilo utente, se non sono presenti restituisce un oggetto con i valori null
export async function retrieveUserData() {
  try {

    const userData = await AsyncStorage.getItem('userData');

    if (userData) {
      return JSON.parse(userData);
    } else {
      return {
        "firstName": null,
        "lastName": null,
        "cardFullName": null,
        "cardNumber": null,
        "cardExpireMonth": null,
        "cardExpireYear": null,
        "cardCVV": null,
        "uid": null,
        "lastOid": null,
        "orderStatus": null,
      }
    }

  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

//restituisce il sid dall'asyncstorage
export async function retrieveSid() {
    try {

      const sid = await AsyncStorage.getItem('sid');

      if (sid !== null) {
        //console.log("Sid retrieved successfully:");
        return sid;
      } else {
        console.log("No data found");
      }

    } catch (error) {
      console.error('Error retrieving data:', error);
    }
}

//restituisce l'uid dall'asyncstorage
export async function retrieveUid() {
    try {

      const uid = await AsyncStorage.getItem('uid');

      if (uid !== null) {
        console.log("Uid retrieved successfully:");
        return parseInt(uid);
      } else {
        console.log("No data found");
      }

    } catch (error) {
      console.error('Error retrieving data:', error);
    }
}

//salva la pagina corrente
export async function storeCurrentPage(page) {
  if (page !== undefined || page !== null) {
    try {
      await AsyncStorage.setItem('page', page);
    } catch (error) {
      console.log("Errore nel salvare la pagina corrente: ", error);
    }
  }
}

//restituisce la pagina corrente
export async function retrieveCurrentPage() {
  try {

    const pageStored = await AsyncStorage.getItem('page');

    if (pageStored) {
      console.log("page retrieved successfully:", pageStored);
      return pageStored;
    } else {
      console.log("No data found");
    }

  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

export async function storeCurrentMid(mid) {
  try {
    await AsyncStorage.setItem('mid', mid.toString());
  } catch (error) {
    console.log("Errore nel salvare il mid corrente: ", error);
  }
}

export async function retrieveCurrentMid() {
  try {

    const midStored = await AsyncStorage.getItem('mid');

    if (midStored) {
      console.log("mid retrieved successfully:", midStored);
      return parseInt(midStored);
    } else {
      console.log("No data found");
    }

  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

export async function deletePage() {
  try {

    await AsyncStorage.removeItem('page');

  } catch (error) {
    console.error('Error removing page:', error);
  }
}