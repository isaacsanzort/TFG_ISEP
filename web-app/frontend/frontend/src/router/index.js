import { createRouter, createWebHistory } from "vue-router";
import SelectionView from "../views/SelectionView.vue";
import IndividualView from "../views/IndividualView.vue";

const routes = [
  {
    path: "/",
    name: "SelectionView",
    component: SelectionView,
  },
  {
    path: "/individual/:type/:id",
    name: "IndividualView",
    component: IndividualView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
