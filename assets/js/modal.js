const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const attacksList = document.querySelector(".attack-list");
const typesList = document.querySelector(".desc-types");
const modalDescription = document.querySelector(".modal-description");
const pokemonPhoto = document.querySelector(".pokemon-desc-photo");

function showPokemonModal(pokemon) {
  // Atualizar conteúdo do modal
  document.querySelector(".pokemon-name").textContent = pokemon.name;
  document.querySelector(".number").textContent = `${pokemon.number}`;

  // Limpar classes anteriores e adicionar a nova classe do tipo
  modalDescription.className = "modal-description";
  modalDescription.classList.add(pokemon.type);

  // Atualizar a imagem do Pokémon no modal
  pokemonPhoto.src = pokemon.img;
  pokemonPhoto.alt = pokemon.name;

  // Limpar lista de tipos antes de adicionar novos
  typesList.innerHTML = "";

  // Buscar os tipos do Pokémon e adicionar no modal
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then((response) => response.json())
    .then((pokemonDetails) => {
      console.log(pokemonDetails); // Verifique o conteúdo da resposta

      const types = pokemonDetails.types.map((type) => type.type.name);

      // Adicionar tipos à lista de tipos no modal
      types.forEach((type) => {
        const li = document.createElement("li");
        li.textContent = type;
        li.classList.add(`type`, `${type}`); // Adiciona uma classe para estilo, se necessário
        typesList.appendChild(li);
      });

      // Buscar as habilidades do Pokémon e adicionar na lista
      const abilities = pokemonDetails.abilities.map(
        (ability) => ability.ability.name
      );

      // Limpar lista anterior de habilidades
      attacksList.innerHTML = "";

      // Adicionar habilidades na lista
      abilities.forEach((ability) => {
        const li = document.createElement("li");
        li.textContent = ability;
        attacksList.appendChild(li);
      });

      // Mostrar modal
      modalOverlay.style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao buscar os detalhes do Pokémon:", error);
    });
}

// Adicionar evento para cada Pokémon
pokemonList.addEventListener("click", (event) => {
  const clickedItem = event.target.closest("button.pokemon");
  if (!clickedItem) return; // Ignorar cliques fora dos botões

  // Recuperar dados do Pokémon
  const pokemonName = clickedItem.querySelector(".name").textContent;
  const pokemonNumber = clickedItem.querySelector(".numberId").textContent;
  const pokemonType = clickedItem.querySelector(".type").textContent;
  const pokemonImage = clickedItem.querySelector("img").src;

  console.log({
    name: pokemonName,
    number: pokemonNumber,
    type: pokemonType,
    img: pokemonImage,
  });

  // Chamar a função para mostrar o modal
  showPokemonModal({
    name: pokemonName,
    number: pokemonNumber,
    type: pokemonType,
    img: pokemonImage, // Passando a imagem corretamente
  });
});

// Evento para fechar o modal
closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  attacksList.innerHTML = ""; // Limpar a lista de habilidades
  typesList.innerHTML = ""; // Limpar a lista de tipos
});
