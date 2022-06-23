import { createRouter, createWebHistory } from "vue-router";
import SelectionView from "../views/SelectionView.vue";
import IndividualView from "../views/IndividualView.vue";
import FeatureCompareView from "../views/FeatureCompareView.vue";
import RegionCompareView from "../views/RegionCompareView.vue";
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
    name: "FeatureCompare",
    component: FeatureCompareView,
  },
  {
    path: "/compareregion/:id/:startDate/:endDate",
    name: "RegionCompare",
    component: RegionCompareView,
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
