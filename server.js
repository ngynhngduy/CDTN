// server.js
const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// --- MỚI: Middleware để đọc JSON từ body của request ---
// Rất quan trọng cho API đăng ký/đăng nhập
app.use(express.json());

// --- Dữ liệu Sản phẩm giả lập ---
const products = [
    { id: 1, name: 'Áo thun cơ bản', price: 150000, description: 'Áo thun cotton 100%, có nhiều màu.' },
    { id: 2, name: 'Quần Jeans Slim Fit', price: 450000, description: 'Quần jeans co giãn, form slim fit hiện đại.' },
    { id: 3, name: 'Váy maxi hoa', price: 320000, description: 'Váy chất liệu voan, họa tiết hoa nhí.' }
];

// --- MỚI: Dữ liệu Người dùng giả lập (Thay thế cho Database) ---
const users = []; // Bắt đầu với mảng rỗng để lưu người dùng

// --- API Sản phẩm (Giữ nguyên) ---

// 1. Endpoint để lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
    console.log('API: Yêu cầu lấy danh sách sản phẩm');
    res.json(products);
});

// 2. Endpoint để lấy chi tiết sản phẩm theo ID
app.get('/api/products/:id', (req, res) => {
    // ... (code giữ nguyên)
});


// --- MỚI: API Đăng ký (Register) ---
app.post('/api/register', (req, res) => {
    // Lấy username và password từ body request
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Vui lòng nhập đủ username và password' });
    }

    // Kiểm tra xem user đã tồn tại chưa
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).send({ message: 'Username này đã tồn tại' });
    }

    // Tạo user mới và lưu vào mảng (trong thực tế, bạn PHẢI mã hóa mật khẩu)
    const newUser = { id: users.length + 1, username: username, password: password };
    users.push(newUser);

    console.log('User mới đã đăng ký:', newUser);
    console.log('Danh sách users hiện tại:', users);
    
    // Trả về thông báo thành công
    res.status(201).send({ message: 'Đăng ký thành công', user: { id: newUser.id, username: newUser.username } });
});

// --- MỚI: API Đăng nhập (Login) ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Vui lòng nhập đủ username và password' });
    }

    // Tìm user trong mảng
    const user = users.find(u => u.username === username);

    // Kiểm tra user và mật khẩu
    // (Trong thực tế, bạn phải so sánh mật khẩu đã mã hóa)
    if (!user || user.password !== password) {
        return res.status(401).send({ message: 'Username hoặc password không đúng' });
    }

    console.log('User đã đăng nhập:', user.username);
    
    // Gửi về thông báo thành công (trong thực tế sẽ gửi về JSON Web Token - JWT)
    res.send({ message: 'Đăng nhập thành công', user: { id: user.id, username: user.username } });
});


// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    console.log(`API sản phẩm: http://localhost:${port}/api/products`);
    console.log(`API đăng ký: http://localhost:${port}/api/register`);
    console.log(`API đăng nhập: http://localhost:${port}/api/login`);
});
