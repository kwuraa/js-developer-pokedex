const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const limit = 8;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
        <button class="pokemon ${pokemon.type}" type="button">
        <span class="numberId">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
        <ol class="types">${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}" />
        </div>
        </button>
          `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  loadPokemonItens(offset, limit);
});
