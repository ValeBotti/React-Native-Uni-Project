import { getOrder, getSecificMenu } from "../model/APICalls.js";

export const collectOrderDataToShow = async (oid, setDatiDaMostrare) => {
    try {
        const datiOrdine = await getOrder(oid);

        const menu = await getSecificMenu(datiOrdine.mid, datiOrdine.deliveryLocation.lat, datiOrdine.deliveryLocation.lng);

        setDatiDaMostrare({
            tempoCreazione: datiOrdine.creationTimestamp,
            nomeMenu: menu.name,
            prezzoMenu: menu.price
        })
        
    } catch (error) {
        
    }
}