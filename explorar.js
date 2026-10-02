// Paso N°1
const respuesta1 = fetch("https://pokeapi.co");
console.log(respuesta1);

async function pokemon() {
  const respuesta1 = await fetch("https://pokeapi.co/api/v2/pokemon/squirtle");

  if (!respuesta1.ok) {
    console.log("Algo salió mal. Pokemon No Encontrado:", respuesta1.status);
    return;
  }

  const datos = await respuesta1.json();
  console.log("Pokemon:", datos.name);
}
await pokemon();

// Ejercicio 1


