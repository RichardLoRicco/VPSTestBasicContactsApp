import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "contactbook",
  password: "password",
  port: 5432,
});


(async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query("SELECT NOW()");
    console.log('PostgreSQL connected successfully!');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } finally {
    if (client) {
      client.release();
    }
  }
})();

const createContact = async (contact: { name: string }) => {
    const res = await pool.query('INSERT INTO contacts (name) VALUES ($1)', [contact.name]);
    return res.rows;
}

const retrieveContacts = async () => {
    const res = await pool.query('SELECT * FROM contacts');
    return res.rows;
}
const retrieveContactById = async (id: string) => {
    const res = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return res.rows;
}

const updateContact = async (id: string, contact: { name: string }) => {
    const res = await pool.query('UPDATE contacts SET name = $1 WHERE id = $2', [contact.name, id]);
    return res.rows;
}

const deleteContact = async (id: string) => {
    const res = await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    return res.rows;
}

const resetDatabase = async () => {
    const client = await pool.connect();
    await client.query('DROP TABLE IF EXISTS contacts');
    await client.query('CREATE TABLE contacts (id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL)');
    await client.query('INSERT INTO contacts (name) VALUES (\'John Doe\')');
    await client.query('INSERT INTO contacts (name) VALUES (\'Jane Doe\')');
    await client.query('INSERT INTO contacts (name) VALUES (\'Jim Beam\')');
    client.release();
}

export { createContact, retrieveContacts, retrieveContactById, updateContact, deleteContact, resetDatabase };
