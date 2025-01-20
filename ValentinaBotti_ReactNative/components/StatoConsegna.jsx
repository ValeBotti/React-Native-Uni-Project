import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, StatusBar, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { setStatus } from "../viewmodel/DeliveryHandler";
import { formatOrderStatus, formatISODate, formatISOTime } from "../viewmodel/GUIFormatter";

const StatoConsegna = ({ setPage, location, datiProfilo, setDatiProfilo }) => {
    console.log("Stato consegna location: ",location);
    console.log("Stato consegna datiProfilo: ",datiProfilo);

    const [menu, setMenu] = useState();
    const [count, setCount] = useState(0);
    const [datiOrdine, setDatiOrdine] = useState();

    useEffect(() => {
        console.log("Counter: ", count);
        if (datiProfilo.orderStatus === "ON_DELIVERY") {
            setTimeout(() => {
                setStatus(datiProfilo.lastOid, setDatiOrdine, setMenu, setDatiProfilo);
                setCount((count) => count + 1);
            }, 5000);
        }
    }, [count]);

    console.log("StatoConsegna menu: ",menu);
    console.log("Stato consegna dati ordine: ",datiOrdine);

    return (
        <SafeAreaView style={styles.containerSafe}>
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={() => setPage("listaMenu")}
                >
                    <View style={styles.containerLogo}>
                        <Icon name="pizza" size={30} color="#629934" />
                        <Text style={styles.navbarText}>Mangia e tàs</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonProfilo}
                    onPress={() => setPage("modificaProfilo")}
                >
                <Icon name="person-circle-outline" size={35} color="#000" />
                </TouchableOpacity>
            </View>

            {datiProfilo.orderStatus === "COMPLETED" && datiOrdine !== undefined && menu !== undefined  && (
                <View style={styles.cellaInformazioniConsegna}>
                    <Text style={styles.informazioniConsegna}>{"Richiesta d'acquisto effettuata oggi: " + formatISODate(datiOrdine.deliveryTimestamp)}</Text>
                    <Text style={styles.informazioniConsegna}>{"Nome menu: " + menu.name}</Text>
                    <Text style={styles.informazioniConsegna}>{"Stato consegna: " + formatOrderStatus(datiOrdine.status)}</Text>
                    <Text style={styles.informazioniConsegna}>{"Orario di consegna: " + formatISOTime(datiOrdine.deliveryTimestamp)}</Text>
                </View>
            )}

            {datiProfilo.orderStatus === "ON_DELIVERY" && datiOrdine !== undefined && menu !== undefined  && (
                <View style={styles.cellaInformazioniConsegna}>
                    <Text style={styles.informazioniConsegna}>{"Acquisto effettuato oggi: " + formatISODate(datiOrdine.expectedDeliveryTimestamp)}</Text>
                    <Text style={styles.informazioniConsegna}>{"Nome menu: " + menu.name}</Text>
                    <Text style={styles.informazioniConsegna}>{"Stato consegna: " + formatOrderStatus(datiOrdine.status)}</Text>
                    <Text style={styles.informazioniConsegna}>{"Orario di consegna: " + formatISOTime(datiOrdine.expectedDeliveryTimestamp)}</Text>
                </View>
            )}

            {datiProfilo.orderStatus === "ON_DELIVERY" && datiOrdine !== undefined && menu !== undefined  && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MapView
                        style={styles.map}
                        //showsUserLocation={true}
                        initialRegion = {{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.lat,
                                longitude: location.lng,
                            }}
                            title={"Punto di consegna!"}
                            description={"La tua posizione attuale"}
                        />
                        <Marker
                            coordinate={{
                                latitude: menu.location.lat,
                                longitude: menu.location.lng,
                            }}
                            title={"Ristorante da cui hai ordinato!"}
                            description={"La tua posizione del ristorante"}
                        />
                        <Marker
                            coordinate={{
                                latitude: datiOrdine.currentPosition.lat,
                                longitude: datiOrdine.currentPosition.lng,
                            }}
                            title={"Posizione del drone!"}
                            description={"La posizione in cui si trova il drone in questo momento"}
                        />
                    </MapView>
                </View>
            )}
            {(datiProfilo.orderStatus === "COMPLETED" || datiOrdine === undefined)  && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MapView
                        style={styles.map}
                        //showsUserLocation={true}
                        initialRegion = {{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.lat,
                                longitude: location.lng,
                            }}
                            title={"Punto di consegna!"}
                            description={"Questa è la posizione di consegna"}
                        />
                    </MapView>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerSafe: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },

    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        zIndex: 5,
        paddingHorizontal: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#629934',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    containerLogo: {
        flexDirection: 'row',
        alignItems: 'right',
        paddingTop: 10,
    },

    navbarText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        paddingBottom: 7,
    },

    buttonProfilo: {
        flexDirection: 'row',
        padding: 5,
        paddingTop: 5,
        paddingLeft: 50,
        justifyContent: 'center',
        alignItems: 'left',
    },

    informazioniConsegna: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    cellaInformazioniConsegna: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 5,
        backgroundColor: '#4e0ce8',
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
export default StatoConsegna;