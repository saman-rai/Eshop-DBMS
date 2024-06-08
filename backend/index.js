const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/registerUser', (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO user (fname, lname, email, password) VALUES (?, ?, ?, ?)';
    db.execute(query, [fname, lname, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

app.post('/loginUser', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    db.execute(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'User logged in successfully!', user: result[0] });
    });
});

// Register a new product (POST)
app.post('/registerProduct', (req, res) => {
    const { seller_id, product_name, price, description } = req.body;
  
    if (!seller_id || !product_name || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO product (seller_id, product_name, price, description) VALUES (?, ?, ?, ?)';
    db.execute(query, [seller_id, product_name, price, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        
        res.status(200).json({ message: 'Product registered successfully!', product: result[0]});
    });
});
// Get all products (GET)
app.get('/products', (req, res) => {
    const query = 'select * from product';
    db.execute(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    })
  });


// Get a specific product by ID (GET)
// app.get('/products/:id', async (req, res) => {
//     const productId = req.params.id;
  
//     try {
//       const query = 'SELECT * FROM product WHERE product_id = ?';
//       const [rows] = await db.execute(query, [productId]);
//       if (rows.length === 0) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.status(200).json(rows[0]);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error getting product' });
//     }
//   });



app.post('/addSales', (req, res) => {
    const { seller_id, product_id, user_id } = req.body;
  
    if (!seller_id || !product_id || !user_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO sales (seller_id, product_id, user_id) VALUES (?, ?, ?)';
    db.execute(query, [seller_id, product_id, user_id],(err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        
        res.status(200).json({ message: 'Product registered successfully!', product: result[0]});
    });
});

app.delete('/deleteProduct/:id', async (req, res) => {
    const productId = req.params.id;
  
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
  
   
    const query = 'DELETE FROM product WHERE product_id = ?';
    db.execute(query, [productId], (err, result)=>{
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Product deleted successfully!', product: result[0]});
    }); // Use prepared statements for security
      
  });
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
