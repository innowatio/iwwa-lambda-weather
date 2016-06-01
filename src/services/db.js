import PgAsync from "pg-async";

const connectionString = "postgres://postgres:postgres@localhost:5432/innowatio";

var db;

export default function getClient () {
    if (!db) {
        db = new PgAsync(connectionString);
    }
    return db;
}