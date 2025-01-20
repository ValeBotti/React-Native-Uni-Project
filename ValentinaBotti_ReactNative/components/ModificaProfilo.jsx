import { StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity, View,  KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { formatNumericEntry, formatOrderStatus } from "../viewmodel/GUIFormatter.js";

import ButtonValidateSendData from "./ButtonValidateSend";
import { useEffect, useState } from "react";

import { collectOrderDataToShow } from "../viewmodel/ModificaProfiloDatiOrdine.js";
import { formatISODate, formatISOTime } from "../viewmodel/GUIFormatter.js";

const ModificaProfilo = ({ setPage, datiProfilo, setDatiProfilo }) => {

    const [datiDaMostrare, setDatiDaMostrare] = useState();

    useEffect(() => {
        if (datiProfilo != undefined && datiProfilo != null && datiProfilo.lastOid != undefined && datiProfilo.lastOid != null) {
            collectOrderDataToShow(datiProfilo.lastOid, setDatiDaMostrare);
        }
        console.log("Dati profilo: ", datiProfilo);
    }, [datiProfilo]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.background}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Profilo</Text>
                        {datiDaMostrare != undefined && (
                            <View style={styles.sfondoOrdine}>
                                <Text style={styles.titoloGenerico}>{"Informazioni sull'ultimo ordine effettuato"}</Text>
                                <Text style={styles.testoGenerico}>{"Nome menu: " + datiDaMostrare.nomeMenu}</Text>
                                <Text style={styles.testoGenerico}>{"Prezzo menu: " + datiDaMostrare.prezzoMenu + " €"}</Text>
                                <Text style={styles.testoGenerico}>{"Data ed ora acquisto: " + formatISODate(datiDaMostrare.tempoCreazione) + ", " + formatISOTime(datiDaMostrare.tempoCreazione)}</Text>
                                <Text style={styles.testoGenerico}>{"Stato consegna: " + formatOrderStatus(datiProfilo.orderStatus)}</Text>
                            </View>
                        )}
                        {datiDaMostrare === undefined && (
                            <View style={styles.sfondoOrdine}>
                                <Text style={styles.titoloGenerico}>{"Informazioni sull'ultimo ordine effettuato"}</Text>
                                <Text style={styles.testoGenerico}>{"Nome menu: nessun ordine"}</Text>
                                <Text style={styles.testoGenerico}>{"Prezzo menu: nessun ordine"}</Text>
                                <Text style={styles.testoGenerico}>{"Data ed ora acquisto: nessun ordine"}</Text>
                                <Text style={styles.testoGenerico}>{"Stato consegna: nessun ordine"}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.navbar}>
                        <TouchableOpacity
                            style={styles.buttonLeft}
                            onPress={() => setPage("listaMenu")}
                        >
                        <Icon name="arrow-back" size={25} color="#000" />
                        </TouchableOpacity>

                        <ButtonValidateSendData
                            datiProfilo= {datiProfilo}
                            setDatiProfilo={setDatiProfilo}
                            setPage = {setPage}
                        />
                    </View>

                    <View style= {styles.form}>
                        <Text style={styles.scrittaImportante}>{"Modifica i dati personali:"}</Text>
                        <Text style={styles.scrittaNonImportante} >{"Nome"}</Text>
                        <TextInput style={styles.input} value={datiProfilo.firstName} placeholder="Nome" onChangeText={(text) => setDatiProfilo({ ...datiProfilo, firstName: text.trim() })}/>
                        <Text style={styles.scrittaNonImportante}>{"Cognome"}</Text>
                        <TextInput style={styles.input} value={datiProfilo.lastName} placeholder="Cognome" onChangeText={(text) => setDatiProfilo({ ...datiProfilo, lastName: text.trim() })}/>

                        <Text style={styles.scrittaImportante}>{"Dati carta di credito:"}</Text>
                        <Text style={styles.scrittaNonImportante}>{"Nominativo sulla carta"}</Text>
                        <TextInput style={styles.input} value={datiProfilo.cardFullName} placeholder="Nome Cognome" onChangeText={(text) => setDatiProfilo({ ...datiProfilo, cardFullName: text })}/>
                        <Text style={styles.scrittaNonImportante}>{"Numero della carta"}</Text>
                        <TextInput style={styles.input} value={datiProfilo.cardNumber} placeholder="Numero carta" keyboardType='numeric' onChangeText={(text) => setDatiProfilo({ ...datiProfilo, cardNumber: text.trim() })}/>
                        <Text style={styles.scrittaNonImportante}>{"Mese di scadenza"}</Text>
                        <TextInput style={styles.input} value={formatNumericEntry(datiProfilo.cardExpireMonth)} placeholder="Mese scadenza" keyboardType='numeric' onChangeText={(text) => setDatiProfilo({ ...datiProfilo, cardExpireMonth: text })}/>
                        <Text style={styles.scrittaNonImportante}>{"Anno di scadenza"}</Text>
                        <TextInput style={styles.input} value={formatNumericEntry(datiProfilo.cardExpireYear)} placeholder="Anno scadenza" keyboardType='numeric' onChangeText={(text) => setDatiProfilo({ ...datiProfilo, cardExpireYear: text })}/>
                        <Text style={styles.scrittaNonImportante}>{"CVV"}</Text>
                        <TextInput style={styles.input} value={datiProfilo.cardCVV} placeholder="CVV" keyboardType='numeric' onChangeText={(text) => setDatiProfilo({ ...datiProfilo, cardCVV: text.trim() })}/>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 15,
        paddingBottom: 25,
        justifyContent: 'center',
        zIndex: 2,
        backgroundColor: '#d1f29d',
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#d1f29d',
        marginHorizontal: 50,
        paddingBottom: 8,
        alignSelf: 'center',
    },

    sfondoOrdine: {
        backgroundColor: '#9999FF',
        marginTop: 15,
        marginInline: 10,
        borderRadius: 20,
        padding: 5,
    },

    titolo: {
        fontSize: 16,
        color: '#9999FF',
        textAlign: 'center',
        marginHorizontal: 50,
        backgroundColor: '#f9f9f9',
        borderColor: '#4e0ce8',
        borderWidth: 1, 
        borderRadius: 20,
        padding: 20,
        margin: 20,
    },

    titoloGenerico: {
        fontSize: 17,
        color: '#f9f9f9',
        textAlign: 'center',
        marginHorizontal: 50,
        backgroundColor: '#4e0ce8', 
        borderRadius: 20,
        borderColor: '#4e0ce8',
        borderWidth: 1,
        marginInline: 0,
    },

    testoGenerico: {
        fontSize: 17,
        color: '#4e0ce8',
        textAlign: 'center',
        marginHorizontal: 50,
        backgroundColor: '#f9f9f9', 
        borderRadius: 20,
        borderColor: '#4e0ce8',
        borderWidth: 1,
        marginInline: 0,
    },

    sfondoElementoInEvidenza: {
        backgroundColor: '#71b507',
        padding: 50,
        paddingTop: 50,
        paddingBottom: 20,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: -1,
    },

    form: {
        marginTop: 10,
        marginHorizontal: 40,
        backgroundColor: '#ffffff',
        padding: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#f9f9f9',
        padding: 12,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#f9f9f9',
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#629934',
        marginTop: 225,
        zIndex: 0,
    },

    buttonLeft: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginLeft: 10,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    scrittaImportante: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#629934',
        borderBottomWidth: 1,
        borderBottomColor: '#629934',
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
        paddingBottom: 5,
    },

    scrittaNonImportante: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#bac7af',
        textAlign: 'left',
        width: '100%',
        paddingBottom: 5,
    }
    
});

export default ModificaProfilo;