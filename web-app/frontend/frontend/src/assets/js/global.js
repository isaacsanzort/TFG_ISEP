//category is D-->Daily, S->Semestral, M->Monthly, A->Anual
const API_INFO = {
  España: {
    id: 0,
    name: "España",
    codes: {
      IPC255678: {
        type: "Economic",
        title: "Indice IPC #1",
        isCovid: false,
        category: "M",
      },
      IPC255894: {
        type: "Economic",
        title: "Indice IPC #3",
        isCovid: false,
        category: "M",
      },
      EDES123: {
        type: "Health",
        title: "Total Deaths. All Causes",
        isCovid: false,
        category: "M",
      },
      CumulativeCases: {
        type: "Health",
        title: "Cumulative Cases",
        isCovid: true,
        category: "D",
      },
      CumulativeDeaths: {
        type: "Health",
        title: "Cumulative Deaths",
        isCovid: true,
        category: "D",
      },
      DailyCases: {
        type: "Health",
        title: "Daily Cases",
        isCovid: true,
        category: "D",
      },
      DailyDeaths: {
        type: "Health",
        title: "Daily Deaths",
        isCovid: true,
        category: "D",
      },
      DosesAdministered: {
        type: "Health",
        title: "Doses Administered",
        isCovid: true,
        category: "D",
      },
      PercentageCompletedVaccinated: {
        type: "Health",
        title: "Percentage of people fully vaccinated (2 dosis)",
        isCovid: true,
        category: "D",
      },
      EMN37: {
        type: "Sociodemographic",
        title: "Nacimientos",
        isCovid: false,
        category: "M",
      },

    },
  },
  Andalucia: {
    id: 5,
    name: "Andalucia",
    codes: {
      IPC255678: {
        type: "Economic",
        title: "Indice IPC #1",
        isCovid: false,
        category: "M",
      },
      IPC255894: {
        type: "Economic",
        title: "Indice IPC #3",
        isCovid: false,
        category: "M",
      },
      EDES123: {
        type: "Health",
        title: "Total Deaths. All Causes",
        isCovid: false,
        category: "M",
      },
      CompletedVaccinated: {
        type: "Health",
        title: "Total Vaccinated people",
        isCovid: true,
        category: "D",
      },
      CumulativeCases: {
        type: "Health",
        title: "Cumulative Cases",
        isCovid: true,
        category: "D",
      },
      CumulativeDeaths: {
        type: "Health",
        title: "Cumulative Deaths",
        isCovid: true,
        category: "D",
      },
      DailyCases: {
        type: "Health",
        title: "Daily Cases",
        isCovid: true,
        category: "D",
      },
      DailyDeaths: {
        type: "Health",
        title: "Daily Deaths",
        isCovid: true,
        category: "D",
      },
      DosesAdministered: {
        type: "Health",
        title: "Doses Administered",
        isCovid: true,
        category: "D",
      },
      PercentageCompletedVaccinated: {
        type: "Health",
        title: "Percentage of people fully vaccinated (2 dosis)",
        isCovid: true,
        category: "D",
      },
      EMN37: {
        type: "Sociodemographic",
        title: "Nacimientos",
        isCovid: false,
        category: "M",
      },
    },
  },
};

export { API_INFO };
