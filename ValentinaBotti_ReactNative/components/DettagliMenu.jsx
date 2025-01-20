import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, ScrollView, StatusBar, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { formatTime } from "../viewmodel/GUIFormatter";
import { handleAcquista } from "../viewmodel/PurchaseHandler";

import { fetchMenu } from "../viewmodel/MenuHandler";
import { retrieveAppStateMenuId } from "../viewmodel/AppStateHandler";

const DettagliMenu = ({ location, setPage, menuId, datiProfilo, setDatiProfilo, setMenuId }) => {

    const [menu, setMenu] = useState({});
    const [image, setImage] = useState();

    useEffect(() => {
        if (menuId) {
            fetchMenu(menuId, location, setMenu, setImage);
        } else {
            retrieveAppStateMenuId(setMenuId);
        }
    }, [menuId]);

    return (
        <SafeAreaView style={styles.containerSafe}>
            <View style={styles.navbar}>
                <View style={styles.containerLogo}>
                    <Icon name="pizza" size={30} color="#629934" />
                    <Text style={styles.navbarText}>Mangia e tàs</Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonProfilo}
                    onPress={() => setPage("modificaProfilo")}
                >
                <Icon name="person-circle-outline" size={35} color="#000" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.scegliMenu}
                onPress={() => setPage("listaMenu")}
            >
                <Icon style="arrow" name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.container}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.title}>{menu.name}</Text>
                    <Text style={styles.testo}>{menu.shortDescription}</Text>
                    <Text style={styles.testo}>{menu.longDescription}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.informazioneImportante}>{"Prezzo: " + menu.price + " €"}</Text>
                        <Text style={styles.informazioneImportante}>{"Tempo di consegna: " + formatTime(menu.deliveryTime)}</Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                    style={styles.acquista}
                    //onPress={handleAcquista} -> se non ho parametri da passare
                    onPress={() => handleAcquista(datiProfilo, setPage, menuId, location, setDatiProfilo)}//se ho parametri da passare
            >
                <Text style={styles.acquistaText}>Acquista</Text>
            </TouchableOpacity>
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

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    image: {
        width: 400,
        height: 400,
        borderRightWidth: 1,
        borderRadius: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
    },

    testo: {
        fontSize: 15,
        margin: 5,
        paddingInline: 10,
    },

    rowContainer: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        margin: 3,
    },

    informazioneImportante: {
        fontSize: 13,
        fontWeight: 'bold',
        backgroundColor: '#d9e0c8',
        marginTop: 15,
        marginHorizontal: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
        padding: 2,
    },

    scegliMenu: {
        color: '#fff',
        paddingTop: 10,
        margin: 10,
    },

    arrow: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 30,
    },

    acquista: {
        backgroundColor: '#629934',
        borderRadius: 15,
        margin: 30,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    acquistaText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },    
});

export default DettagliMenu;