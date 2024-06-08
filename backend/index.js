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
    let { seller_id, product_name, price, description } = req.body;
    let sql = `INSERT INTO product (seller_id, product_name, price, description) VALUES (?, ?, ?, ?)`;
    db.query(sql, [seller_id, product_name, price, description], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Product added successfully!');
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


app.get('/api/products/:userId', (req, res) => {
    let userId = req.params.userId;
    let sql = `SELECT product.* FROM sales JOIN product ON sales.product_id = product.product_id WHERE sales.user_id = ${userId}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.post('/addSeller', (req, res) => {
    let userId = req.body.userId;
    let sql = `SELECT seller_id FROM seller WHERE user_id = ${userId}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            // If the user_id already exists, return the associated seller_id
            res.send(result[0].seller_id.toString());
        } else {
            // If the user_id does not exist, insert it and return the new seller_id
            sql = `INSERT INTO seller (user_id) VALUES (${userId})`;
            db.query(sql, (err, result) => {
                if(err) throw err;
                res.send(result.insertId.toString()); // This assumes seller_id is an auto-increment field
            });
        }
    });
});



app.get('/api/sellerProducts/:sellerId', (req, res) => {
    let sellerId = req.params.sellerId;
    let sql = `SELECT product.*, COUNT(sales.product_id) as sales_count 
               FROM product LEFT JOIN sales 
               ON product.product_id = sales.product_id 
               WHERE product.seller_id = ${sellerId} 
               GROUP BY product.product_id`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        let response = results.map(result => {
            return {
                product_details: {
                    product_id: result.product_id,
                    seller_id: result.seller_id,
                    product_name: result.product_name,
                    price: result.price,
                    description: result.description
                },
                sales_count: result.sales_count
            };
        });
        res.send(response);
    });
});

app.delete('/api/products/:productId', (req, res) => {
    let productId = req.params.productId;
    let sql = `DELETE FROM product WHERE product_id = ?`;
    db.query(sql, [productId], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Product deleted successfully!');
    });
});


app.post('/loginStaff', (req, res) => {
    const { userId } = req.body;

   
    console.log(userId)
    const query = 'SELECT * FROM staff WHERE user_id=?';
    db.execute(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        

        res.send(result[0])
    });
});






app.put('/api/products/:productId', (req, res) => {
    let { seller_id, product_name, price, description } = req.body;
    let productId = req.params.productId;
    let sql = `UPDATE product SET seller_id = ?, product_name = ?, price = ?, description = ? WHERE product_id = ?`;
    db.query(sql, [seller_id, product_name, price, description, productId], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Product updated successfully!');
    });
});


app.get('/staffProductDetails/:id', async (req, res) => {
    const productId = req.params.id;
    
    
    const query = 'SELECT * FROM product WHERE product_id = ?';
    db.query(query, [productId], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result[0]);
    });
});

// API endpoint to update a product
app.put('/api/products/:productId', (req, res) => {
    let { seller_id, product_name, price, description } = req.body;
    let productId = req.params.productId;
    let sql = `UPDATE product SET seller_id = ?, product_name = ?, price = ?, description = ? WHERE product_id = ?`;
    db.query(sql, [seller_id, product_name, price, description, productId], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Product updated successfully!');
    });
})

// Fetch products and number of sales
app.get('/staff/salesData', (req, res) => {
    let sql = `SELECT p.product_name, COUNT(s.product_id) as sales_count 
               FROM product p 
               JOIN sales s ON p.product_id = s.product_id 
               GROUP BY p.product_name`;

    db.query(sql, (err, result) => {
        if(err) throw err;

        // Send data to frontend
        res.json(result);
    });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

