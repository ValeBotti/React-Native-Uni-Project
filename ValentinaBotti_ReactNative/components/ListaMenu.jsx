import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import ListaElementoMenu from "./ListaElementoMenu";

import { fetchMenuList } from "../viewmodel/MenuHandler";

const ListaMenu = ({ setPage, location, setMenuId, datiProfilo }) => {
    
    const [menuList, setMenuList] = useState({});

    useEffect(() => {
        fetchMenuList(location, setMenuList);
    }, [location])

    return (
        
        <SafeAreaView style={styles.container}>
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

            {datiProfilo.orderStatus === "ON_DELIVERY" && (
                <View style={styles.statoConsegna}>
                    <TouchableOpacity
                        onPress={() => setPage("statoConsegna")}
                    >
                        <Text style={styles.deliveryText}>Ordine in consegna</Text>
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    {Array.isArray(menuList) && menuList.length > 0 ? (
                        menuList.map((menu) => (
                            <ListaElementoMenu
                                key={menu.mid}
                                menu={menu}
                                setPage={setPage}
                                setMenuId={setMenuId}
                            />
                        ))
                    ) : (
                        <Text style={styles.scrittaNonImportante}>Ricerca menu disponibili nella tua zona...</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9e0c8',
    },

    scrollContainer: {
        padding: 1,
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

    deliveryText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
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

    statoConsegna: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        paddingVertical: 15,
        backgroundColor: '#4e0ce8',
        borderColor: '#d9e0c8',
        borderWidth: 3,
        borderRadius: 10,
    },

    content: {
        flex: 1,
        marginTop: 25,
        paddingBottom: 10,
        padding:10,
        alignItems: 'center',
        backgroundColor: '#f8faf2',
    },

    scrittaNonImportante: {
        marginTop: 35,
        marginTop: 35,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#bac7af',
        textAlign: 'left',
        width: '100%',
        paddingBottom: 5,
    }
});

export default ListaMenu;
