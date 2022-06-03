import { createRouter, createWebHistory } from "vue-router";
import SelectionView from "../views/SelectionView.vue";
import IndividualView from "../views/IndividualView.vue";
import CompareView from "../views/CompareView.vue";
import RegionCompare from "../components/RegionCompare.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "SelectionView",
    component: SelectionView,
  },
  {
    path: "/individual/:id/:startDate/:endDate",
    name: "IndividualView",
    component: IndividualView,
  },
  {
    path: "/compare/:id/:startDate/:endDate",
    name: "CompareView",
    component: CompareView,
  },
  {
    path: "/compareregion/:id/:startDate/:endDate",
    name: "RegionCompare",
    component: RegionCompare,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
