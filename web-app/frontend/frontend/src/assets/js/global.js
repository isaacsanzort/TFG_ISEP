//cod y title van emparejados por lo que su longitud debería ser siempre la misma
const API_INFO = {
  España: {},
  Andalucia: {
    id: 5,
    name: "Andalucia",
    Economic: {
      cod: [
        "IPC255678",
        "EDES123",
        "IPC255840",
        "IPC255894",
        "IPC256217",
        "IPC256271",
        "IPC255948",
        "IPC255732",
        "IPC256110",
        "IPC255786",
        "IPC255624",
        "IPC256325",
        "IPC256433",
        "IPC255462",
        "IPC256002",
        "IPC255516",
        "IPC256164",
        "IPC256379",
        "IPC255570",
        "IPC256056",
      ],
      title: [
        "Indice IPC #1",
        "Indice IPC #2",
        "Indice IPC #3",
        "Indice IPC #4",
        "Indice IPC #5",
        "Indice IPC #6",
        "Indice IPC #7",
        "Indice IPC #8",
      ],
    },
    Health: {
      cod: ["EDES123","COVID-CumulativeCases"],
      title: ["Total Deaths. All Causes", "Cumulative Cases"],
    },
    Sociodemographic: {
      cod: ["EMN37"],
      title: ["Nacimientos"],
    },
  },
};

export { API_INFO };
