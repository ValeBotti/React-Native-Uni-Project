import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";

import { checkImageDBpresence_getImageOnServer_SetImage } from "../viewmodel/MenuHandler";
import { formatTime } from "../viewmodel/GUIFormatter";
import { saveAppStateMenuId } from "../viewmodel/AppStateHandler";

const ListaElementoMenu = ({ menu, setPage, setMenuId }) => {

    const [image, setImage] = useState();

    useEffect(() => {
        checkImageDBpresence_getImageOnServer_SetImage(menu.mid, menu.imageVersion, setImage);
    }, []);

    return (
        <SafeAreaView style={styles.containerSafe}>
            <TouchableOpacity
                onPress={() => {
                    saveAppStateMenuId(menu.mid, setMenuId);
                    setPage("dettagliMenu");
                }}
            >
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.columnContainer}>
                            <Text style={styles.title}>{menu.name}</Text>
                            <Text style={styles.shortDescription}>{menu.shortDescription}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.informazioneImportante}>{"Prezzo: " + menu.price + " €"}</Text>
                        <Text style={styles.informazioneImportante}>{"Tempo di consegna: " + formatTime(menu.deliveryTime)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerSafe: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    container: {
        flex: 1,
        width: 370,
        margin: 2,
        borderColor: '#d9e0c8',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    image: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    shortDescription: {
        fontSize: 13,
        width: 250,
        textAlign: 'justify',
    },

    rowContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        margin: 3,
    },

    columnContainer: {
        flexDirection: 'column',
        gap: 5,
    },

    informazioneImportante: {
        fontSize: 11,
        color: '#4e0ce8',
        borderRadius: 30,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    scegliMenu: {
        backgroundColor: '#629934',
        color: '#fff',
        borderRadius: 5,
        margin: 5,
    },
});

export default ListaElementoMenu;