// ตั้งค่า Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA6DnFJSnlqCI49v8nG3Dcl0F4TIctSqRY",
    authDomain: "kpiwellwishes.firebaseapp.com",
    databaseURL: "https://kpiwellwishes-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "kpiwellwishes",
    storageBucket: "kpiwellwishes.firebasestorage.app",
    messagingSenderId: "490975940091",
    appId: "1:490975940091:web:c63cb83a7f90e84dc44f5e",
    measurementId: "G-HMSR4CT77R"
};

// เริ่มต้นการใช้งาน Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ฟังก์ชันการส่งคำอวยพรไปยัง Firebase
document.getElementById('wishForm').addEventListener('submit', function(e) {
    e.preventDefault(); // หยุดการรีเฟรชหน้าเว็บ

    // ดึงข้อมูลจากฟอร์ม
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const timestamp = Date.now();

    // ส่งข้อมูลไปยัง Firebase
    push(ref(database, 'messages'), {
        name: name,
        message: message,
        timestamp: timestamp
    }).then(() => {
        alert("ส่งคำอวยพรเรียบร้อยแล้ว!");
        document.getElementById('wishForm').reset(); // เคลียร์ฟอร์มหลังส่งเสร็จ
    }).catch((error) => {
        console.error("เกิดข้อผิดพลาดในการบันทึก: ", error);
    });
});

// ฟังก์ชันดึงและแสดงคำอวยพร
onValue(ref(database, 'messages'), function(snapshot) {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = ''; // เคลียร์รายการคำอวยพรเก่า

    snapshot.forEach(function(childSnapshot) {
        const data = childSnapshot.val();
        // ตรวจสอบว่า data.name และ data.message ไม่เป็น undefined
        if (data && data.name && data.message) {
            const messageItem = document.createElement('div');
            messageItem.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
            messagesList.appendChild(messageItem);
        } else {
            console.error("Data is undefined: ", data);
        }
    });
});
