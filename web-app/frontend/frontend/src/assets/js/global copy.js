//category is D-->Daily, S->Semestral, M->Monthly, A->Anual
const API_INFO = {
  España: {
    id: 0,
    name: "España",
    Economic: {
      "IPC255678" : {
          title: "Indice IPC #1",
          category: "M"
      },
      "EDES123" : {
        title: "Indice IPC #2",
        category: "M"
      },
      "IPC255894" : {
        title: "Indice IPC #3",
        category: "M"
      }
    },
    Health: {
      "EDES123": {
        title: "Total Deaths. All Causes",
        isCovid: false,
        category: "M"
      },
      "CumulativeCases": {
        title:  "Cumulative Cases",
        isCovid: true,
        category: "D"
      },
    },
    Sociodemographic: {
      "EMN37": {
        title: ["Nacimientos"],
        category: "M",
      }
    },
  },
  Andalucia: {
    id: 5,
    name: "Andalucia",
    Economic: {
      "IPC255678" : {
          title: "Indice IPC #1",
          category: "M"
      },
      "EDES123" : {
        title: "Indice IPC #2",
        category: "M"
      },
      "IPC255894" : {
        title: "Indice IPC #3",
        category: "M"
      }
    },
    Health: {
      "EDES123": {
        title: "Total Deaths. All Causes",
        isCovid: false,
        category: "M"
      },
      "CumulativeCases": {
        title:  "Cumulative Cases",
        isCovid: true,
        category: "D"
      },
    },
    Sociodemographic: {
      "EMN37": {
        title: ["Nacimientos"],
        category: "M",
      }
    },
  }
};

export { API_INFO };
