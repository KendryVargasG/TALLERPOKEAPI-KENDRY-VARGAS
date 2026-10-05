import promptSync from "prompt-sync";

const prompt = promptSync();

async function buscarPokemon(nombrePokemon) {
  const respuesta1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

  if (!respuesta1.ok && respuesta1 != null) {
    console.log("Algo salió mal. Pokemon No Encontrado:", respuesta1.status);
    return;
  }

  const datos = await respuesta1.json();
  return datos;
}

mostrarFicha(await buscarPokemon("pikachu"));
mostrarFicha(await buscarPokemon("charmander"));

function mostrarFicha(datos) {
    if(!datos){
        console.log("No se encontraron datos del Pokemon.");
        return;
    }
    console.log("Nombre: "+ datos.name.toUpperCase() + " - ID: " + datos.id);

    for(const tipo of datos.types) {
      console.log("Tipo: " + tipo.type.name);
    }

    console.log("Altura: " + (datos.height * 10) + " cm");
    console.log("Peso: " + (datos.weight / 10) + " kg");

    for(const stat of datos.stats) {
      console.log("Stat nombre: " + stat.stat.name + " - Valor: " + stat.base_stat);
    }
    for(const ability of datos.abilities) {
      console.log("Habilidad: " + ability.ability.name);
    }
    console.log("=====================================");
}

function obtenerStat(datos, nombreStat){
   for(const stat of datos.stats) {
      if(stat.stat.name === nombreStat){
        return stat.base_stat;
      }
   }
   return null;
}

async function compararPokemon(nombre1, nombre2, stat){
    const pokemon1 = await buscarPokemon(nombre1);
    const pokemon2 = await  buscarPokemon(nombre2);

    if(pokemon1 == null || pokemon2 == null){
        console.log("No se puede comparar");
        return;
    }

    let stat1 = obtenerStat(pokemon1, stat);
    let stat2 = obtenerStat(pokemon2, stat);

    if(stat1 > stat2){
        console.log(`El ${nombre1} tiene un ${stat} mayor que el ${nombre2}`);
    } else if(stat1 < stat2){
        console.log(`El ${nombre2} tiene un ${stat} mayor que el ${nombre1}`);
    } else {
        console.log(`Ambos Pokémon tienen el mismo ${stat}`);
    }
    console.log("=====================================");
}

await compararPokemon("snorlax", "machamp", "defense");

let pokemones = ["pikachu", "charmander", "bulbasaur", "squirtle", "snorlax", "machamp"];

async function pokemonMasFuerte(listaNombres, stat){
    let pokemonMasFuerte = null;
    let statMaximo = -1;

    for(const nombre of listaNombres){
        const pokemon = await buscarPokemon(nombre);
        const statActual = obtenerStat(pokemon, stat);

        if(statActual > statMaximo){
            statMaximo = statActual;
            pokemonMasFuerte = pokemon;
        }
    }

    return pokemonMasFuerte;
}

let pokemonMasAtaque = await pokemonMasFuerte(pokemones, "attack");
await pokemonMasFuerte(pokemones, "defense");

console.log("<======= Pokemon mas fuerte ========>");
console.log("<===================================>");
mostrarFicha(pokemonMasAtaque);