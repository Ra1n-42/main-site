import { createCards } from "./functions.js";

var DB = [
  // {
  //   id: 1,

  //   description: {
  //     owner: 1,
  //     title: "The beyond horse",
  //     game: ["Metin2"],
  //   },
  //   assets: {
  //     img: ["https://plechito.com/wp-content/uploads/2022/10/mount1.jpg"],
  //     source:
  //       "https://mega.nz/file/H85xnazT#MKbgOdPx3HdbdCN_iGT6yPJzGDnEYc9dj9AhHX_ex7I",
  //   },
  //   price: 0,
  // },

  {
    id: 1,
    description: {
      owner: 2,
      title: "Axe Bastion",
      game: ["World of Warcraft", "Metin2"],
    },
    assets: {
      img: [
        "https://p.turbosquid.com/ts-thumb/uY/DFzKFj/w7D4WZ7o/1/jpg/1594807852/1920x1080/fit_q87/8f9a4f547cdf550f27c10e48af5e19d9d9b1bd14/1.jpg",
      ],
      source: "",
    },
    price: 0,
  },
  {
    id: 2,
    description: {
      owner: 1,
      title: "Traveler bird",
      game: ["Metin2"],
    },
    assets: {
      img: [
        "https://i0.wp.com/plechito.com/wp-content/uploads/2021/05/pet_traveler_bird.jpg",
      ],
      source:
        "https://mega.nz/file/mhRBTaSQ#DyPQ1XZGxZ7aDzOH2oYGP52GAIkA22S9v0ZI48emLN0",
    },
    price: 0,
  },
  {
    id: 3,
    description: {
      owner: 1,
      title: "Undead mage pet",
      game: ["Metin2"],
    },
    assets: {
      img: [
        "https://i0.wp.com/plechito.com/wp-content/uploads/2023/10/pet_skull_necromancer.jpg",
      ],
      source: "https://plechito.com/pets/",
    },
    price: 7.0,
  },
  {
    id: 4,
    description: {
      owner: 1,
      title: "Royal phoenix wings",
      game: ["Metin2"],
    },
    assets: {
      img: [
        "https://i0.wp.com/plechito.com/wp-content/uploads/2021/10/wings_royal_phoenix.jpg",
      ],
      source:
        "https://mega.nz/file/G5gBHKgD#6ebsNYuMOdbTa76w5j0obl1CmP1cpHSBI7S_hEcTMg4",
    },
    price: 25,
  },
  {
    id: 5,
    description: {
      owner: 1,
      title: "Jiangshi's phoenix",
      game: ["Metin2"],
    },
    assets: {
      img: [
        "https://i0.wp.com/plechito.com/wp-content/uploads/2023/10/pet15.jpg",
      ],
      source:
        "https://mega.nz/file/SgoFQCJR#0FExmP4UXBl4zVvPdpKZt9ppMPHKtYJ6P_Q7YdKN2CQ",
    },
    price: 0,
  },
];

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
