import { retrieveUserData } from '../model/AsyncStorageController';

//controlla se i dati dell'utente sono già stati salvati e li recupera, poi aggiorna lo stato
export const fetchUserData = async (setDatiProfilo) => {
  try {
    const userAsyncStorageData = await retrieveUserData();
    console.log("dati utente: ", userAsyncStorageData);
    setDatiProfilo(userAsyncStorageData);
  } catch (error) {
    console.log(error);
  }
};