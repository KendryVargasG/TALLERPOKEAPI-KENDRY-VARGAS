
const respuesta1 = fetch("https://pokeapi.co");


async function pokemon() {
  const respuesta1 = await fetch("https://pokeapi.co/api/v2/pokemon/squirtle");

  if (!respuesta1.ok) {
    console.log("Algo salió mal. Pokemon No Encontrado:", respuesta1.status);
    return;
  }

  const datos = await respuesta1.json();
  console.log("Pokemon:", datos.name);
  console.log(datos);

  
  for(const tipo of datos.types) {
    console.log("Tipo: " + tipo.type.name);
  }
  for(const stat of datos.stats) {
    console.log("Stat Nombre: " + stat.stat.name + " - Valor: " + stat.base_stat);
  }
  for(const ability of datos.abilities) {
    console.log("Habilidad: " + ability.ability.name);
  }
}
await pokemon();

// Respuesta de las preguntas formuladas en el texto:
//=====================================================
// Pregunta N° 1 (Página 3)
// Porque así cada función tiene su propia tarea: 
// una busca los datos del Pokémon y la otra los muestra. 
// Esto hace que el código sea más organizado, 
// fácil de entender y también más fácil de modificar si después necesitamos cambiar algo.
//=====================================================

