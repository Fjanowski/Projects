const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));


// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Collections'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Handle form submissions
app.post('/add-item', (req, res) => {
    const { itemName, dateReceived, dateReleased } = req.body;
    const insertItemQuery = `
        INSERT INTO Collection1 (name, date_received, date_released) VALUES (?, ?, ?)`;
    connection.query(insertItemQuery, [itemName, dateReceived, dateReleased], (err, results) => {
        if (err) throw err;
        console.log('New item inserted into the database');
        res.redirect('/');
    });
});

// Handle request for deleting an item
app.post('/delete-item', (req, res) => {
    const itemId = req.body.itemId; 
    const deleteItemQuery = `DELETE FROM Collection1 WHERE id = ?`;
    connection.query(deleteItemQuery, [itemId], (err, results) => {
        if (err) throw err;
        console.log('Item deleted from the database');
        res.redirect('/');
    });
});

// Handle form submission for updating an existing item
app.post('/edit-item', (req, res) => {
    const { itemId, itemName, dateReceived, dateReleased } = req.body;

    // Build the SQL UPDATE query dynamically based on which fields were provided in the form
    let updateItemQuery = 'UPDATE Collection1 SET ';
    const updateValues = [];
    if (itemName) {
        updateItemQuery += 'name = ?, ';
        updateValues.push(itemName);
    }
    if (dateReceived) {
        updateItemQuery += 'date_received = ?, ';
        updateValues.push(dateReceived);
    }
    if (dateReleased) {
        updateItemQuery += 'date_released = ?, ';
        updateValues.push(dateReleased);
    }
    // Remove the trailing comma and space
    updateItemQuery = updateItemQuery.slice(0, -2);

    updateItemQuery += ' WHERE id = ?';
    updateValues.push(itemId);

    connection.query(updateItemQuery, updateValues, (err, results) => {
        if (err) {
            console.error('Error updating item in database: ' + err.message);
            res.status(500).send('Error updating item in database');
            return;
        }
        console.log('Item updated in the database');
        res.redirect('/');
    });
});

app.get('/items', (req, res) => {
    const getAllItemsQuery = 'SELECT * FROM Collection1';
    connection.query(getAllItemsQuery, (err, results) => {
        if (err) {
            console.error('Error fetching items from database: ' + err.message);
            res.status(500).json({ error: 'Error fetching items from database' });
            return;
        }
        res.json(results); // send as json
    });
});

app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    const searchItemsQuery = `
        SELECT * FROM Collection1
        WHERE id LIKE '%${searchQuery}%' OR name LIKE '%${searchQuery}%' OR date_received LIKE '%${searchQuery}%' OR date_released LIKE '%${searchQuery}%'`;

    connection.query(searchItemsQuery, (err, results) => {
        if (err) throw err;

        res.render('search-results', { searchQuery: searchQuery, items: results });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port`+port);
});
