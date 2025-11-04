// server.js
const express = require('express');
const app = express();
const port = 3000;

// Cho phép tất cả các nguồn gốc (localhost:5500, v.v.) truy cập vào API của bạn
// Rất quan trọng khi chạy Frontend và Backend trên các cổng khác nhau
const cors = require('cors');
app.use(cors());

// --- Dữ liệu Sản phẩm giả lập (Thay thế cho Database) ---
const products = [
    { id: 1, name: 'Áo thun cơ bản', price: 150000, description: 'Áo thun cotton 100%, có nhiều màu.' },
    { id: 2, name: 'Quần Jeans Slim Fit', price: 450000, description: 'Quần jeans co giãn, form slim fit hiện đại.' },
    { id: 3, name: 'Váy maxi hoa', price: 320000, description: 'Váy chất liệu voan, họa tiết hoa nhí.' }
];

// --- Định nghĩa API Endpoint ---

// 1. Endpoint để lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
    console.log('API: Yêu cầu lấy danh sách sản phẩm');
    res.json(products);
});

// 2. Endpoint để lấy chi tiết sản phẩm theo ID (ví dụ: /api/products/1)
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    console.log(`API sản phẩm: http://localhost:${port}/api/products`);
});