import appRoutes from '../constants/routes';
import Home from '../pages/Home';
import AddListing from '../pages/AddListing';
const routes = [
  {
    path: appRoutes.home,
    Component: Home,
  },
  // {
  //   path: appRoutes.listing,
  //   Component: Home,
  // },
  {
    path: appRoutes.addListing,
    Component: AddListing,
  },
];

export default routes;
