import appRoutes from '../constants/routes';
import Home from '../pages/Home';
import AddListing from '../pages/AddListing';
import ListingPage from '../pages/ListingPage';
const routes = [
  {
    path: appRoutes.home,
    Component: Home,
  },
  {
    path: appRoutes.listing,
    Component: ListingPage,
  },
  {
    path: appRoutes.addListing,
    Component: AddListing,
  },
];

export default routes;
