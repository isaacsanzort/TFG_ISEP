<template>
  <div>
    <p>{{ flaskCall }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      flaskCall: "Aqui se mostrarán datos",
    };
  },
  created: async function () {
    // const getResponse = await fetch("http://127.0.0.1:5000/covid");
    // const gObject = await getResponse.json();
    // this.flaskCall = gObject;
    // const prueba = gObject.Fecha;
    // console.log(prueba)
  },
};
</script>
