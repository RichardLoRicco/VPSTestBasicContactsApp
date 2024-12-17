import express from 'express';
import cors from 'cors';
import * as db from './sql/db';
import path from 'path';
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', async (_req, res) => {
  try {
    const contacts = await db.retrieveContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/contacts', async (_req, res) => {
  try {
    const contacts = await db.retrieveContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await db.retrieveContactById(req.params.id);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const newContact = await db.createContact(req.body);
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await db.updateContact(req.params.id, req.body);
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const deletedContact = await db.deleteContact(req.params.id);
    res.json(deletedContact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// reset the database
app.post('/reset', async (_req, res) => {
  try {
    await db.resetDatabase();
    res.json({ message: 'Database reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});