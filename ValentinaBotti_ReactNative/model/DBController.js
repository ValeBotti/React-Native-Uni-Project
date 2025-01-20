import * as SQLite from 'expo-sqlite';

export default class DBController {
    constructor() {
        this.db = null;
    }

    async openDB() {
        try {
            this.db = await SQLite.openDatabaseAsync('userDB');
            const query = "CREATE TABLE IF NOT EXISTS Images (mid INTEGER PRIMARY KEY, imageVersion INTEGER NOT NULL, imageBase64 TEXT NOT NULL)";
            try {
                 await this.db.execAsync(query); 
            } catch (error) {
                console.error("Errore nella creazione della tabella:", error);
                
            }
        } catch (error) {
            console.error("Errore nell'apertura del database:", error);
        }
    }

    async delateTable() {
        try {
            const query ="DROP TABLE IF EXISTS Images";
            try {
                await this.db.execAsync(query)
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async saveMenu(mid, imageVersion, imageBase64) {
        try {
            const query = "INSERT INTO Images (mid, imageVersion, imageBase64) VALUES (?, ?, ?)";
            const parameters = [mid, imageVersion, imageBase64];
            await this.delateOldMenuFromDB(mid);
            try {
                await this.db.runAsync(query, parameters);
            } catch (error) {
                console.error("Errore nel salvataggio dell'immagine:", error);
            }
        } catch (error) {
            console.error("Errore nell'apertura del database:", error);
        }
    }

    async retrieveMenu() {
        try {
            const query = "SELECT * FROM Images";
            try {
                const result = await this.db.getAllAsync(query);
                return result;
            } catch (error) {
                console.error("Errore nel recupero dell'immagine:", error);
            }
        } catch (error) {
            console.error("Errore nell'apertura del database:", error);
        }
    }

    async delateOldMenuFromDB(mid) {
        try {
            const query = "DELETE FROM Images WHERE mid = ?";
        
            try {
                await this.db.runAsync(query, [mid]);
            } catch (error) {
                console.error("Errore nella cancellazzione dell'immagine:", error);
            }
        } catch (error) {
            console.error("Errore nell'apertura del database:", error);
        };
    }

    async retrieveMenuImageFromDB(mid, version) {
        try {
            const query = "SELECT imageBase64, imageVersion FROM Images WHERE mid = ?";
        
            try {
                const result = await this.db.getFirstAsync(query, [mid]);
                
                if (result == null ||result.imageVersion !== version) {
                    return null;
                }
                return result.imageBase64;
            } catch (error) {
                console.error("Errore nel recupero dell'immagine:", error);
            }
        } catch (error) {
            console.error("Errore nell'apertura del database:", error);
        };
    }
}