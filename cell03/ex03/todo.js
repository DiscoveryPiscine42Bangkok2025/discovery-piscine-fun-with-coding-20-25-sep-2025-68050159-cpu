document.addEventListener('DOMContentLoaded', () => {
    const ftList = document.getElementById('ft_list');
    const newButton = document.getElementById('new-button');

    // ฟังก์ชันสำหรับโหลด To-Do จากคุกกี้เมื่อเปิดหน้าเว็บ
    const loadTodosFromCookie = () => {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));

        if (todoCookie) {
            try {
                // Decode และ Parse ข้อมูลจากคุกกี้ (ที่เก็บเป็น JSON string)
                const encodedTodos = todoCookie.split('=')[1];
                const decodedTodos = decodeURIComponent(encodedTodos);
                const todos = JSON.parse(decodedTodos);

                // สร้าง element ของแต่ละ to-do แล้วใส่ลงใน list
                if (Array.isArray(todos)) {
                    todos.forEach(todoText => createTodoElement(todoText));
                }
            } catch (e) {
                console.error("Could not parse To-Do cookie:", e);
            }
        }
    };

    // ฟังก์ชันสำหรับบันทึก To-Do List ปัจจุบันลงในคุกกี้
    const saveTodosToCookie = () => {
        const todoElements = ftList.querySelectorAll('.todo-item');
        const todos = [];
        todoElements.forEach(element => {
            todos.push(element.textContent);
        });

        // แปลง array เป็น JSON string แล้ว encode เพื่อเก็บในคุกกี้
        const jsonTodos = JSON.stringify(todos);
        const encodedTodos = encodeURIComponent(jsonTodos);

        // ตั้งค่าให้คุกกี้มีอายุ 1 ปี
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        
        document.cookie = `todos=${encodedTodos};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
    };

    // ฟังก์ชันสำหรับสร้าง To-Do element ใหม่
    const createTodoElement = (text) => {
        if (!text || text.trim() === '') return;

        const newTodo = document.createElement('div');
        newTodo.className = 'todo-item';
        newTodo.textContent = text.trim();

        // เพิ่ม Event Listener สำหรับการลบเมื่อคลิก
        newTodo.addEventListener('click', () => {
            if (confirm(`Do you want to remove this TO DO: "${newTodo.textContent}"?`)) {
                ftList.removeChild(newTodo);
                saveTodosToCookie(); // อัปเดตคุกกี้หลังลบ
            }
        });
        
        // เพิ่ม element ใหม่เข้าไปใน DOM (วางไว้บนสุด)
        // เนื่องจาก CSS กำหนดเป็น flex-direction: column-reverse, appendChild จะแสดงผลด้านบนสุด
        ftList.appendChild(newTodo);
    };

    // Event Listener สำหรับปุ่ม 'New'
    newButton.addEventListener('click', () => {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== '') {
            createTodoElement(todoText);
            saveTodosToCookie(); // อัปเดตคุกกี้หลังเพิ่ม
        }
    });

    // เริ่มโหลด To-Do จากคุกกี้เมื่อหน้าเว็บโหลดเสร็จ
    loadTodosFromCookie();
});