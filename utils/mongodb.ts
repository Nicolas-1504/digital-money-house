import { Db, MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// Verifica la URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// Verifica la base de datos
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
    // Verifica la caché
    if (cachedClient && cachedDb) {
        // cargar desde caché
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // Conectar el cluster
    let client = new MongoClient(MONGODB_URI as string);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // setear caché
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
