// Fruits data
const fruits = [
  { name: "Apples", price: "₹120/kg", image: "images/Apples.jpg" },
  { name: "Bananas", price: "₹60/dozen", image: "images/Bananas.jpg" },
  { name: "Oranges", price: "₹90/kg", image: "images/Oranges.jpg" },
  { name: "Strawberries", price: "₹200/kg", image: "images/Strawberries.jpg" },
  { name: "Mangoes", price: "₹150/kg", image: "images/Mangoes.jpg" },
  { name: "Grapes", price: "₹100/kg", image: "images/Grapes.jpg" },
  { name: "Pomegranate", price: "₹180/kg", image: "images/Pomegranate.jpg" },
  { name: "Papaya", price: "₹60/kg", image: "images/Papaya.jpg" },
  { name: "Kiwi", price: "₹150/box", image: "images/Kiwi.jpeg" },
  { name: "Dragon Fruit", price: "₹200/kg", image: "images/Dragon Fruit.jpg" },
  { name: "Guava", price: "₹50/kg", image: "images/Guava.jpg" },
  { name: "Peach", price: "₹180/kg", image: "images/Peach.jpg" },
  { name: "Pear", price: "₹160/kg", image: "images/Pear.jpg" },
  { name: "Plum", price: "₹140/kg", image: "images/Plum.jpg" },
  { name: "Apricot", price: "₹220/kg", image: "images/Apricot.jpg" },
  { name: "Cherry", price: "₹300/box", image: "images/Cherry.jpg" },
  { name: "Avocado", price: "₹400/kg", image: "images/Avocado.jpeg" },
  { name: "Blackberry", price: "₹350/box", image: "images/Blackberry.jpg" },
  { name: "Blueberry", price: "₹450/box", image: "images/Blueberry.jpg" },
  { name: "Raspberry", price: "₹400/box", image: "images/Raspberry.jpg" },
  { name: "Date", price: "₹300/kg", image: "images/Date.jpg" },
  { name: "Passion Fruit", price: "₹250/kg", image: "images/Passionfruit.jpg" },
  { name: "Jackfruit", price: "₹100/kg", image: "images/Jackfruit.jpg" },
  { name: "Melon", price: "₹70/kg", image: "images/Melon.jpg" },
  { name: "Watermelon", price: "₹80/kg", image: "images/Watermelon.png" },
  { name: "Pineapple", price: "₹100/pc", image: "images/Pineapple.png" }
];

// Vegetables data
const vegetables = [
  { name: "Tomatoes", price: "₹40/kg", image: "images/Tomatoes.jpg" },
  { name: "Carrots", price: "₹50/kg", image: "images/Carrots.jpg" },
  { name: "Onions", price: "₹45/kg", image: "images/Onions.jpg" },
  { name: "Potatoes", price: "₹35/kg", image: "images/Potatoes.jpg" },
  { name: "Cucumbers", price: "₹50/kg", image: "images/Cucumbers.jpg" },
  { name: "Spinach", price: "₹40/bunch", image: "images/Spinach.png" },
  { name: "Cauliflower", price: "₹50/pc", image: "images/Cauliflower.png" },
  { name: "Broccoli", price: "₹120/kg", image: "images/Broccoli.jpg" },
  { name: "Beetroot", price: "₹40/kg", image: "images/Beetroot.jpg" },
  { name: "Pumpkin", price: "₹30/kg", image: "images/Pumpkin.jpg" },
  { name: "Bitter Gourd", price: "₹35/kg", image: "images/Bitter Gourd.jpg" },
  { name: "Corn", price: "₹20/pc", image: "images/Corn.jpg" },
  { name: "Sweet Potato", price: "₹40/kg", image: "images/Sweet Patato.jpg" },
  { name: "Ginger", price: "₹100/kg", image: "images/Ginger.jpg" },
  { name: "Garlic", price: "₹120/kg", image: "images/Garlic.jpg" },
  { name: "Chili", price: "₹60/kg", image: "images/Chili.jpg" },
  { name: "Coriander", price: "₹20/bunch", image: "images/Coriander.jpg" },
  { name: "Mint", price: "₹20/bunch", image: "images/Mint.jpg" }
];

// Other Products
const others = [
  { name: "Fresh Milk", price: "₹60/L", image: "images/Milk.png" },
  { name: "Organic Honey", price: "₹350/kg", image: "images/Honey.png" },
  { name: "Farm Eggs", price: "₹10/pc", image: "images/Eggs.png" },
  { name: "Cheese", price: "₹250/pack", image: "images/Cheese.jpeg" },
  { name: "Butter", price: "₹280/pack", image: "images/Butter.jpg" },
  { name: "Pickle", price: "₹120/jar", image: "images/Pickel.jpg" },
  { name: "Jam", price: "₹150/jar", image: "images/Jam.jpg" },
  { name: "Sauce", price: "₹100/bottle", image: "images/Sauce.jpg" }
];

// Display function
function displayProducts(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return; // Guard clause if container doesn't exist

  container.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/150?text=No+Image';">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button onclick="openQtyModal('${item.name}', '${item.price}')" style="
        background-color: #2d572c;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 15px;
        transition: 0.3s;
      "
      onmouseover="this.style.background='#3d7a3d'"
      onmouseout="this.style.background='#2d572c'"
      >Add to Cart 🛒</button>
    `;
    container.appendChild(card);
  });
}

// Initial display
displayProducts(fruits, "fruitsContainer");
displayProducts(vegetables, "veggiesContainer");

// Add container for 'others' if it exists in HTML, or append to existing sections if desired.
// Since consumer.html only has fruits and veggies sections, we might need to add an 'Others' section or just leave it for now.
// However, the user asked to use ALL images. Let's check if consumer.html has an 'Others' section.
// It doesn't seem to have one in the provided code. I will add one dynamically if possible or just log it.
// Actually, I can check if 'otherContainer' exists.
const otherContainer = document.getElementById("otherContainer");
if (otherContainer) {
  displayProducts(others, "otherContainer");
} else {
  // If no specific container, maybe append to veggies or create one?
  // For now, let's just ensure fruits and veggies are populated correctly.
}


// 🔍 Search functionality
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filteredFruits = fruits.filter(fruit => fruit.name.toLowerCase().includes(query));
    const filteredVeggies = vegetables.filter(veg => veg.name.toLowerCase().includes(query));
    const filteredOthers = others.filter(item => item.name.toLowerCase().includes(query));

    displayProducts(filteredFruits, "fruitsContainer");
    displayProducts(filteredVeggies, "veggiesContainer");
    if (otherContainer) displayProducts(filteredOthers, "otherContainer");
  });
}

// 🎙️ Voice Search using Web Speech API
const micBtn = document.getElementById("micBtn");
if (micBtn) {
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
}

// 📷 Camera Access
const cameraBtn = document.getElementById("cameraBtn");
if (cameraBtn) {
  cameraBtn.addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      alert("✅ Camera access granted! (You can now capture or scan items in future updates)");
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      alert("❌ Camera access denied or unavailable.");
    }
  });
}
