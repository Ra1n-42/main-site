let IconMap = {
  Metin2: "/img/Metin2.webp",
  "World of Warcraft": "/img/WoW_icon.svg",
};
let UserDB = [
  {
    id: 1,
    name: "Plechito",
    img: "https://cdn.discordapp.com/avatars/504640690190417920/9f274fd92445165a9fa5f69dec115301.webp?size=80",
  },
  {
    id: 2,
    name: "Joe",
    img: "http://localhost:3001/profileimg/64b9a83b6aedd96435295134",
  },
];
function createImage(parent, name, image) {
  const img = document.createElement("img");
  img.src = image;
  if (name !== "") {
    img.classList.add(name);
  }
  parent.appendChild(img);
  return img;
}
function createDivContainer(parent, name) {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add(name);
  parent.appendChild(imgContainer);
  return imgContainer;
}

export function createCards(DATABASE) {
  // Container-Element aus dem DOM holen
  const container = document.querySelector(".card");
  container.innerHTML = "";
  // Für jedes Objekt in DB eine Karte erstellen
  DATABASE.forEach((item) => {
    // li-Element erstellen
    const listItem = document.createElement("li");
    listItem.classList.add("ListItem");

    listItem.dataset.games = item.description.game;

    // Bildcontainer
    const imgContainer = createDivContainer(listItem, "ImageContainer");

    // Bild hinzufügen
    createImage(imgContainer, "Image", item.assets.img[0]);
    // Container für jedes untere element hinzufügen

    const ItemDescription = createDivContainer(listItem, "ItemDescription");

    // Titel hinzufügen

    const title = createDivContainer(ItemDescription, "CardTitle");
    title.textContent = item.description.title;
    const gameList = createDivContainer(title, "ImplementedIn");

    item.description.game.forEach((gameTitle, i) => {
      createImage(gameList, "game", IconMap[gameTitle]);
    });

    // Besitzerinformationen suchen
    const ownerMatch = UserDB.find(
      (user) => user.id === item.description.owner
    );
    if (ownerMatch) {
      // Container erstellen

      const OwnerContainer = createDivContainer(
        ItemDescription,
        "OwnerContainer"
      );

      // Avatar erstellen
      createImage(OwnerContainer, "", ownerMatch.img);

      // Besitzer-Name erstellen
      createDivContainer(OwnerContainer, "OwnerName").textContent =
        ownerMatch.name;

      // Besitzer-Element zum Container hinzufügen
      ItemDescription.appendChild(OwnerContainer);
    }

    // Preis hinzufügen
    const price = document.createElement("p");
    price.textContent = `Price: ${
      item.price === 0 ? "Free" : item.price + "€"
    }`;

    ItemDescription.appendChild(price);

    // Knopf für kaufen oder Downloaden hinzufügen

    const dob = createDivContainer(ItemDescription, "DobButton");
    dob.textContent = item.price === 0 ? "Download" : "Buy";
    dob.dataset.link = item.assets.source;

    // li-Element zur Liste hinzufügen
    container.appendChild(listItem);
  });
}
// Click Events
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("DobButton")) {
    window.location.href = event.target.dataset.link;
  }
});
