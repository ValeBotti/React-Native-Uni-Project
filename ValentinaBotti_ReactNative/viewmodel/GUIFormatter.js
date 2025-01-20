//queste funzioni sono comuni a tutti i campi in cui sono mostrati i dati
export const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};

export const formatOrderStatus = (orderStatus) => {
    if (orderStatus === 'ON_DELIVERY') {
        return "In consegna";
    } else if (orderStatus === 'COMPLETED') {
        return "Consegnato";
    } else {
        return "Nessun ordine";
    }
};

export const formatISODate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
};

export const formatISOTime = (isoString) => {
    const date = new Date(isoString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
};


export const formatNumericEntry = (number) => {
    if (number != null && number != undefined)
        return String(number);
};