// //cod y title van emparejados por lo que su longitud debería ser siempre la misma
// const API_INFO = {
//   España: {
//     id: 0,
//     name: "España",
//     Economic: {
//       cod: [
//         "IPC255678",
//         "EDES123",
//         "IPC255840",
//         "IPC255894",
//         "IPC256217",
//         "IPC256271",
//         "IPC255948",
//         "IPC255732",
//         "IPC256110",
//         "IPC255786",
//         "IPC255624",
//         "IPC256325",
//         "IPC256433",
//         "IPC255462",
//         "IPC256002",
//         "IPC255516",
//         "IPC256164",
//         "IPC256379",
//         "IPC255570",
//         "IPC256056",
//       ],
//       title: [
//         "Indice IPC #1",
//         "Indice IPC #2",
//         "Indice IPC #3",
//         "Indice IPC #4",
//         "Indice IPC #5",
//         "Indice IPC #6",
//         "Indice IPC #7",
//         "Indice IPC #8",
//       ],
//     },
//     Health: {
//       cod: ["EDES123", "COVID-CumulativeCases"],
//       title: ["Total Deaths. All Causes", "Cumulative Cases"],
//     },
//     Sociodemographic: {
//       cod: ["EMN37"],
//       title: ["Nacimientos"],
//     },
//     Compare: {
//       cod: [
//         "EMN37",
//         "EDES123",
//         "COVID-CumulativeCases",
//         "IPC255678",
//         "EDES123",
//         "IPC255840",
//         "IPC255894",
//         "IPC256217",
//         "IPC256271",
//         "IPC255948",
//         "IPC255732",
//       ],
//       title: [
//         "Nacimientos",
//         "Total Deaths. All Causes",
//         "Cumulative Cases",
//         "Indice IPC #1",
//         "Indice IPC #2",
//         "Indice IPC #3",
//         "Indice IPC #4",
//         "Indice IPC #5",
//         "Indice IPC #6",
//         "Indice IPC #7",
//         "Indice IPC #8",
//       ],
//     },
//   },
//   Andalucia: {
//     id: 5,
//     name: "Andalucia",
//     Economic: {
//       cod: [
//         "IPC255678",
//         "EDES123",
//         "IPC255840",
//         "IPC255894",
//         "IPC256217",
//         "IPC256271",
//         "IPC255948",
//         "IPC255732",
//         "IPC256110",
//         "IPC255786",
//         "IPC255624",
//         "IPC256325",
//         "IPC256433",
//         "IPC255462",
//         "IPC256002",
//         "IPC255516",
//         "IPC256164",
//         "IPC256379",
//         "IPC255570",
//         "IPC256056",
//       ],
//       title: [
//         "Indice IPC #1",
//         "Indice IPC #2",
//         "Indice IPC #3",
//         "Indice IPC #4",
//         "Indice IPC #5",
//         "Indice IPC #6",
//         "Indice IPC #7",
//         "Indice IPC #8",
//       ],
//     },
//     Health: {
//       cod: ["EDES123", "COVID-CumulativeCases"],
//       title: ["Total Deaths. All Causes", "Cumulative Cases"],
//     },
//     Sociodemographic: {
//       cod: ["EMN37"],
//       title: ["Nacimientos"],
//     },
//     Compare: {
//       cod: [
//         "EMN37",
//         "EDES123",
//         "COVID-CumulativeCases",
//         "IPC255678",
//         "EDES123",
//         "IPC255840",
//         "IPC255894",
//         "IPC256217",
//         "IPC256271",
//         "IPC255948",
//         "IPC255732",
//       ],
//       title: [
//         "Nacimientos",
//         "Total Deaths. All Causes",
//         "Cumulative Cases",
//         "Indice IPC #1",
//         "Indice IPC #2",
//         "Indice IPC #3",
//         "Indice IPC #4",
//         "Indice IPC #5",
//         "Indice IPC #6",
//         "Indice IPC #7",
//         "Indice IPC #8",
//       ],
//     },
//   },
//   Cantabria: {
//     id: 0,
//     name: "Cantabria",
//     Economic: {
//       cod: [
//         "IPC255678",
//         "EDES123",
//         "IPC255840",
//         "IPC255894",
//         "IPC256217",
//         "IPC256271",
//         "IPC255948",
//         "IPC255732",
//         "IPC256110",
//         "IPC255786",
//         "IPC255624",
//         "IPC256325",
//         "IPC256433",
//         "IPC255462",
//         "IPC256002",
//         "IPC255516",
//         "IPC256164",
//         "IPC256379",
//         "IPC255570",
//         "IPC256056",
//       ],
//       title: [
//         "Indice IPC #1",
//         "Indice IPC #2",
//         "Indice IPC #3",
//         "Indice IPC #4",
//         "Indice IPC #5",
//         "Indice IPC #6",
//         "Indice IPC #7",
//         "Indice IPC #8",
//       ],
//     },
//     Health: {
//       cod: ["EDES123", "COVID-CumulativeCases"],
//       title: ["Total Deaths. All Causes", "Cumulative Cases"],
//     },
//     Sociodemographic: {
//       cod: ["EMN37"],
//       title: ["Nacimientos"],
//     },
//     Compare: {
//       cod: [
//         "EMN37",
//         "EDES123",
//         "COVID-CumulativeCases",
//         "IPC255678",
//         "EDES123",
//         "IPC255840",
//         "IPC255894",
//         "IPC256217",
//         "IPC256271",
//         "IPC255948",
//         "IPC255732",
//       ],
//       title: [
//         "Nacimientos",
//         "Total Deaths. All Causes",
//         "Cumulative Cases",
//         "Indice IPC #1",
//         "Indice IPC #2",
//         "Indice IPC #3",
//         "Indice IPC #4",
//         "Indice IPC #5",
//         "Indice IPC #6",
//         "Indice IPC #7",
//         "Indice IPC #8",
//       ],
//     },
//   },
// };

// export { API_INFO };

//category is D-->Daily, S->Semestral, M->Monthly, A->Anual
const API_INFO = {
  España: {
    id: 0,
    name: "España",
    codes: {
      "IPC255678" : {
          type: "Economic",
          title: "Indice IPC #1",
          isCovid: false,
          category: "M"
      },
      "IPC255894" : {
        type: "Economic",
        title: "Indice IPC #3",
        isCovid: false,
        category: "M"
      },
      "EDES123": {
        type: "Health",
        title: "Total Deaths. All Causes",
        isCovid: false,
        category: "M"
      },
      "CumulativeCases": {
        type: "Health",
        title:  "Cumulative Cases",
        isCovid: true,
        category: "D"
      },
      "EMN37": {
        type: "Sociodemographic",
        title: "Nacimientos",
        isCovid: false,
        category: "M",
      }
    },
  },
  Andalucia: {
    id: 5,
    name: "Andalucia",
    codes: {
      "IPC255678" : {
        type: "Economic",
        title: "Indice IPC #1",
        isCovid: false,
        category: "M"
      },
      "IPC255894" : {
        type: "Economic",
        title: "Indice IPC #3",
        isCovid: false,
        category: "M"
      },
      "EDES123": {
        type: "Health",
        title: "Total Deaths. All Causes",
        isCovid: false,
        category: "M"
      },
      "CumulativeCases": {
        type: "Health",
        title:  "Cumulative Cases",
        isCovid: true,
        category: "D"
      },
      "EMN37": {
        type: "Sociodemographic",
        title: "Nacimientos",
        isCovid: false,
        category: "M",
      }
    },
  }
};

export { API_INFO };