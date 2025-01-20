export default class CommunicationController {
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425/";

    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
        //console.log("genericRequest called");

        const queryParamsFormatted = new URLSearchParams(queryParams).toString();
        let url = "";
        
        if (queryParamsFormatted != "") {
            url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
        } else {
            url = this.BASE_URL + endpoint;
        }

        //console.log("Sending " + verb + " request to: " + url);

        let fetchData = {
            method: verb,//GET o POST
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        if (verb !== "GET") {
            fetchData.body = JSON.stringify(bodyParams);
        }

            let httpResponse;
        try {
            httpResponse = await fetch(url, fetchData);
        } catch (error) {
            console.error("Error during fetch request: ", error);
            throw error;
        }

            const status = httpResponse.status;
            //console.log("HTTP response status: ", status);
        if (status === 200) {
            // 200 means that the request was successful.
            // The server responded with the data requested in JSON format.
            let deserializedObject = await httpResponse.json();
            return deserializedObject;
        } else if (status === 204) {
            // 204 means that the server has successfully processed the request
            // but that there is no content to send back.
            return null;
        } else if (status === 403) {
            const errorObject = await httpResponse.json();
            console.log("Error message from the server: ", errorObject);
            return null;
        } else {
            const errorObject = await httpResponse.json();
            console.error("Error message from the server:", errorObject);
            throw errorObject;
        }
    }

    //crea una GET generica con i dati passati
    static async genericGetRequest(endpoint, queryParams) {
        //console.log("genericGetRequest called");
        return await this.genericRequest(endpoint, "GET", queryParams, {});
    }
    
    //crea una POST generica con i dati passati
    static async genericPostRequest(endpoint, queryParams, bodyParams) {
        console.log("genericPostRequest called");
        return await this.genericRequest(endpoint, "POST", queryParams, bodyParams);
    }

    //la put sovrascrive risorse esistenti o le crea (idempotente, quindi non crea la stessa risorsa più volte, posso ripeterla un sacco di volte senza fare danni)
    //crea una PUT generica con i dati passati
    static async genericPutRequest(endpoint, queryParams, bodyParams) {
        console.log("genericPutRequest called");
        return await this.genericRequest(endpoint, "PUT", queryParams, bodyParams);
    }
}