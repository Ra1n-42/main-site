import { createCards } from "./functions.js";
import { DB } from "./DATABASE.js";

// initialisiere filterobjekt
var filters = {
  tags: [],
  game: null,
};
function FilterGame(DATABASE, gameName) {
  return DATABASE.filter((item) => item.description.game.includes(gameName));
}

function search() {
  let copyCat = [...DB];
  if (filters.game) {
    copyCat = copyCat.filter((item) =>
      item.description.game.includes(filters.game)
    );
  }
  filters.tags.forEach((tag) => {
    if (tag.includes("free")) {
      copyCat = copyCat.filter((item) => item.price === 0);
    }
    if (tag.includes("highlow")) {
      copyCat = copyCat.sort((a, b) => b.price - a.price);
    }
    if (tag.includes("lowhigh")) {
      copyCat = copyCat.sort((a, b) => a.price - b.price);
    }
  });
  createCards(copyCat);
  console.log(copyCat);
}

export default { filters, search };
