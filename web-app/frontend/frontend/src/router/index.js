import { createRouter, createWebHistory } from "vue-router";
import SelectionView from "../views/SelectionView.vue";
import IndividualView from "../views/IndividualView.vue";
import CompareView from "../views/CompareView.vue";

const routes = [
  {
    path: "/",
    name: "SelectionView",
    component: SelectionView,
  },
  {
    path: "/individual/:type/:id/:startDate/:endDate",
    name: "IndividualView",
    component: IndividualView,
  },
  {
    path: "/compare/:id/:startDate/:endDate",
    name: "CompareView",
    component: CompareView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
