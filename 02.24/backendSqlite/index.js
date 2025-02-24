const express = require('express');
const sqlite3 = require('sqlite3');
const cors=require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const db = new sqlite3.Database('./ingatlan.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ingatlan database.');
});

// Ingatlanok lekérdezése
app.get('/api/ingatlan', (req, res) => {
  const sql = `
    SELECT ingatlanok.*, kategoriak.nev AS kategoriaNev
    FROM ingatlanok
    JOIN kategoriak ON ingatlanok.kategoria = kategoriak.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Ingatlan hozzáadása
app.post('/api/ujingatlan', (req, res) => { // /api/ujingatlan végpont
  const { kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl } = req.body;
  db.run(
    'INSERT INTO ingatlanok (kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl) VALUES (?, ?, ?, ?, ?, ?)',
    [kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Ingatlan törlése
app.delete('/api/ingatlan/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM ingatlanok WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (this.changes === 0) {
      res.status(404).send("Nincs ilyen ingatlan az adatbázisban.");
      return;
    }
    res.json({ message: "Ingatlan sikeresen törölve!", deletedId: id });
  });
});

// Ingatlan módosítása
app.put('/api/ingatlan/:id', (req, res) => {
  const { id } = req.params;
  const { kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl } = req.body;

  const sql = `
    UPDATE ingatlanok 
    SET kategoria = ?, leiras = ?, hirdetesDatuma = ?, tehermentes = ?, ar = ?, kepUrl = ?
    WHERE id = ?
  `;

  db.run(sql, [kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl, id], function (err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (this.changes === 0) {
      res.status(404).send("Nincs ilyen ingatlan az adatbázisban.");
      return;
    }
    res.json({ message: "Ingatlan sikeresen frissítve!", updatedId: id });
  });
});


// Kategóriák lekérdezése
app.get('/api/kategoriak', (req, res) => { // /api/kategoriak végpont
  db.all('SELECT * FROM kategoriak', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});