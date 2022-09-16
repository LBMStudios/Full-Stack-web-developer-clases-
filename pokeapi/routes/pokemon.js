const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pokemonFetch = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    const pokemonesApi = pokemonFetch.data.results;
    const pokemones = [];

    for (let i = 0; i < pokemonesApi.length; i++) {
      const abilitiesFetch = await axios.get(pokemonesApi[i].url);
      const abilitiesApi = abilitiesFetch.data;

      abilitiesApi.type[({}, {})];

      const pokemon = {
        name: pokemonesApi[i].name,
        caracteristicas: {
          abilities: abilitiesApi.abilities,
          weight: abilitiesApi.weight,
          height: abilitiesApi.height,
          type1: abilitiesApi.type[0].name,
          type2: abilitiesApi.type.length > 1 ? abilitiesApi.type[1].name : "",
        },
      };

      pokemones.push(pokemon);
    }

    return res.status(200).json({
      data: pokemones,
      success: true,
      message: "Get de pokemones",
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
