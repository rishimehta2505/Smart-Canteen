const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// 18-Item Database
const menu = [
    { id: 1, name: "Chole Bhature", cat: "Breakfast", price: 60, desc: "Fluffy bhature with spicy chickpeas", img: "https://images.unsplash.com/photo-1626132646540-3486df890b23?w=300" },
    { id: 2, name: "Masala Dosa", cat: "Breakfast", price: 50, desc: "Crispy crepe with potato masala", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300" },
    { id: 3, name: "Aloo Paratha", cat: "Breakfast", price: 35, desc: "Fresh curd and spicy pickle", img: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?w=300" },
    { id: 4, name: "Veg Burger", cat: "Snacks", price: 40, desc: "Crunchy patty with lettuce", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300" },
    { id: 5, name: "Samosa (2 pcs)", cat: "Snacks", price: 20, desc: "Classic spicy potato filling", img: "https://images.unsplash.com/photo-1601050638917-3d0240999391?w=300" },
    { id: 6, name: "Rajma Chawal", cat: "Lunch", price: 55, desc: "Kidney beans and steamed rice", img: "https://images.unsplash.com/photo-1610444583737-25e4236a213e?w=300" },
    { id: 7, name: "Veg Thali", cat: "Lunch", price: 80, desc: "Full meal with 2 Roti, Rice, Dal", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300" },
    { id: 8, name: "Paneer Butter Masala", cat: "Lunch", price: 90, desc: "Cubes in rich creamy gravy", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300" },
    { id: 9, name: "Dal Makhani", cat: "Lunch", price: 70, desc: "Slow cooked black lentils", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300" },
    { id: 10, name: "Veg Hakka Noodles", cat: "Chinese", price: 45, desc: "Stir-fry with crunchy veggies", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300" },
    { id: 11, name: "Schezwan Momos", cat: "Chinese", price: 50, desc: "6 pieces in spicy sauce", img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?w=300" },
    { id: 12, name: "Manchurian Dry", cat: "Chinese", price: 50, desc: "Veg balls in tangy sauce", img: "https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=300" },
    { id: 13, name: "Cold Coffee", cat: "Drinks", price: 40, desc: "Chilled with milk and foam", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300" },
    { id: 14, name: "Oreo Shake", cat: "Drinks", price: 65, desc: "Thick cookies & cream shake", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300" },
    { id: 15, name: "Lemon Tea", cat: "Drinks", price: 20, desc: "Hot refreshing tea", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300" },
    { id: 16, name: "Gulab Jamun", cat: "Desserts", price: 30, desc: "2 pcs of soft sweets in syrup", img: "https://images.unsplash.com/photo-1589113103503-49ef84668e72?w=300" },
    { id: 17, name: "Choco Lava Cake", cat: "Desserts", price: 50, desc: "Warm cake with molten center", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300" },
    { id: 18, name: "Fruit Salad", cat: "Desserts", price: 50, desc: "Fresh seasonal fruit bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300" }
];

let orders = [];

// API Endpoints
app.get('/api/menu', (req, res) => res.json(menu));
app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/order', (req, res) => {
    const newOrder = {
        token: Math.floor(Math.random() * 900) + 100,
        items: req.body.items,
        total: req.body.total,
        status: "pending",
        payment: req.body.paymentMethod,
        rating: null,
        time: new Date().toLocaleTimeString()
    };
    orders.push(newOrder);
    res.json(newOrder);
});

app.post('/api/order/update', (req, res) => {
    const { token, status } = req.body;
    const order = orders.find(o => o.token == token);
    if (order) { order.status = status.toLowerCase(); res.json({ success: true }); }
    else res.status(404).send("Not found");
});

app.post('/api/order/rate', (req, res) => {
    const { token, rating } = req.body;
    const order = orders.find(o => o.token == token);
    if (order) { order.rating = rating; res.json({ success: true }); }
    else res.status(404).send("Not found");
});

app.get('/api/order/status/:token', (req, res) => {
    const order = orders.find(o => o.token == req.params.token);
    res.json({ status: order ? order.status : "none" });
});

app.listen(3000, () => console.log("Cravely Server Live: http://localhost:3000"));