// Fruits data
const fruits = [
  { name: "Apples", price: "₹120/kg", image: "images/Apples.jpg" },
  { name: "Bananas", price: "₹60/dozen", image: "images/Bananas.jpg" },
  { name: "Oranges", price: "₹90/kg", image: "images/Oranges.jpg" },
  { name: "Strawberries", price: "₹200/kg", image: "images/Strawberries.jpg" },
  { name: "Mangoes", price: "₹150/kg", image: "images/Mangoes.jpg" },
  { name: "Grapes", price: "₹100/kg", image: "images/Grapes.jpg" }
  
];

// Vegetables data
const vegetables = [
  { name: "Tomatoes", price: "₹40/kg", image: "images/Tomatoes.jpg" },
  { name: "Carrots", price: "₹50/kg", image: "images/Carrots.jpg" },
  { name: "Onions", price: "₹45/kg", image: "images/Onions.jpg" },
  { name: "Potatoes", price: "₹35/kg", image: "images/Potatoes.jpg" },
  { name: "Cucumbers", price: "₹50/kg", image: "images/Cucumbers.jpg" }
];

// Display function
function displayProducts(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    `;
    container.appendChild(card);
  });
}

// Initial display
displayProducts(fruits, "fruitsContainer");
displayProducts(vegetables, "veggiesContainer");

// 🔍 Search functionality
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filteredFruits = fruits.filter(fruit => fruit.name.toLowerCase().includes(query));
  const filteredVeggies = vegetables.filter(veg => veg.name.toLowerCase().includes(query));

  displayProducts(filteredFruits, "fruitsContainer");
  displayProducts(filteredVeggies, "veggiesContainer");
});

// 🎙️ Voice Search using Web Speech API
const micBtn = document.getElementById("micBtn");
micBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    searchInput.dispatchEvent(new Event("input"));
  };
});

// 📷 Camera Access
const cameraBtn = document.getElementById("cameraBtn");
cameraBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    alert("✅ Camera access granted! (You can now capture or scan items in future updates)");
    stream.getTracks().forEach(track => track.stop());
  } catch (err) {
    alert("❌ Camera access denied or unavailable.");
  }
});
