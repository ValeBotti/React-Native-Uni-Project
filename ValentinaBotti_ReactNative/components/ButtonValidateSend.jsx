import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { storeUserProfileData } from '../model/AsyncStorageController';
import { putUser } from '../model/APICalls';

const ButtonValidateSendData = ({ datiProfilo, setPage, setDatiProfilo }) => {

    const validateInput = () => {
        if (
            !datiProfilo.firstName ||
            !datiProfilo.lastName ||
            !datiProfilo.cardFullName ||
            !datiProfilo.cardNumber ||
            !datiProfilo.cardExpireMonth ||
            !datiProfilo.cardExpireYear ||
            !datiProfilo.cardCVV
        ) {
            Alert.alert("Errore", "Inserisci tutti i dati");
            return;
        } else {

            if (!/^[a-zA-Z]+$/.test(datiProfilo.firstName)) {
                Alert.alert("Il nome deve essere composto esclusivamente da lettere");
                return;
            }

            if (!/^[a-zA-Z]+$/.test(datiProfilo.lastName)) {
                Alert.alert("Il cognome deve essere composto esclusivamente da lettere");
                return;
            }

            if (!/^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(datiProfilo.cardFullName)) {
                Alert.alert("Il nome sulla carta deve essere composto solo da lettere e separato da spazi.");
                return;
            }     
            
            if (!/^\d{16}$/.test(datiProfilo.cardNumber)) {
                Alert.alert("Il numero della carta deve essere composto da 16 cifre");
                return;
            }

            if (!/^\d{2}$/.test(datiProfilo.cardExpireMonth)) {
                Alert.alert("Il mese di scadenza deve essere composto da 2 cifre");
                return;
            }

            if (!/^\d{4}$/.test(datiProfilo.cardExpireYear)) {
                Alert.alert("L'anno di scadenza deve essere composto da 4 cifre");
                return;
            }

            const cardCVV = datiProfilo.cardCVV;
            if (!/^\d{3}$/.test(cardCVV)) {
                Alert.alert("Il CVV deve essere composto da 3 cifre");
                return;
            }
            console.log("Dati profilo Button: ", datiProfilo);
            storeUserProfileData(datiProfilo);
            putUser(datiProfilo);
            setDatiProfilo(datiProfilo);
            setPage("listaMenu");
            Alert.alert("Dati di consegna aggiornati correttamente");
        }
    };

    return (
        <SafeAreaView>
            <TouchableOpacity
                style={styles.buttonRight}
                title="Salva"
                onPress={validateInput}
            >
            <Text style={styles.buttonText}>Salva</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    buttonRight: {
        paddingInline: 20,
        marginHorizontal: 20,
        alignItems: 'center',
    },

    buttonText: {
        color: '#629934',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ButtonValidateSendData;
