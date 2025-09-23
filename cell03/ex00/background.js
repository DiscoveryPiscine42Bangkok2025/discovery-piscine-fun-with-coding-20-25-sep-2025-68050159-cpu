function getRandomColor() {
  // สร้างค่าสี hex แบบสุ่ม เช่น #3FA9F5
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById("changeBtn").addEventListener("click", function() {
  document.body.style.backgroundColor = getRandomColor();
});
