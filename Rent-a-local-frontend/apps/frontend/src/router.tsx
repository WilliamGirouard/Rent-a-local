import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout";

// Pages
import Homepage from "./pages/Home/Homepage";
import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/Login/SignUp";
import Contact from "./pages/Contact/Contact";
import Host from "./pages/Host/Host";
import Reservations from "./pages/Reservations/Reservations";
import ReservationDetails from "./pages/Reservations/ReservationDetails";
import EditReservation from "./pages/Reservations/EditReservation";
import LocalDetail from "./pages/LocalDetail/LocalDetail";
import Error from "./pages/Errors/Errors";
import ChangeRequest from "./pages/Reservations/ChangeRequest";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateLocal from "./pages/Admin/CreateLocal";


// Loaders
import mainLoader from "./loaders/main.loader";
import authLoader from "./loaders/auth.loader";
import hostLoader from "./loaders/host.loader";
import reservationsLoader from "./loaders/reservations.loader";
import reservationLoader from "./loaders/reservation.loader";
import editReservationLoader from "./loaders/editReservation.loader";
import localLoader from "./loaders/local.loader";
import localsLoader from "./loaders/locals.loader";
import adminLoader from "./loaders/adminDashboard.loader";
import createLocalLoader from "./loaders/createLocal.loader";

// Actions
import { loginAction } from "./actions/login.action";
import { registerAction } from "./actions/register.action";
import { contactAction } from "./actions/contact.action";
import { editReservationAction } from "./actions/editReservation.action";
import logoutAction from "./actions/logout.action";
import { reservationAction } from "./actions/reservation.action";
import { changeRequestAction } from "./actions/changeRequest.action";
import { createLocalAction } from "./actions/createLocal.action";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} loader={mainLoader} errorElement={<Error />}>
      <Route index element={<Homepage />} loader={localsLoader} />

      <Route path="signin" element={<SignIn />} action={loginAction} />
      <Route path="signup" element={<SignUp />} action={registerAction} />

      <Route
        path="contact"
        element={<Contact />}
        loader={authLoader}
        action={contactAction}
      />

      <Route
        path="host"
        element={<Host />}
        loader={hostLoader}
      />

      <Route
        path="locals/:id"
        element={<LocalDetail />}
        loader={localLoader}
        action={reservationAction}
      />

      <Route
        path="reservations"
        element={<Reservations />}
        loader={reservationsLoader}
      />

      <Route
        path="reservations/:id"
        element={<ReservationDetails />}
        loader={reservationLoader}
      />

      <Route
        path="reservations/:id/edit"
        element={<EditReservation />}
        loader={editReservationLoader}
        action={editReservationAction}
      />

      <Route
        path="reservations/:id/change-request"
        element={<ChangeRequest />}
        loader={reservationLoader}
        action={changeRequestAction}
      />

      <Route
        path="admin"
        element={<AdminDashboard />}
        loader={adminLoader}
      />

      <Route
        path="admin/create-local"
        element={<CreateLocal />}
        loader={createLocalLoader}
        action={createLocalAction}
      />

      <Route
        path="logout"
        action={logoutAction}
      />

      <Route 
        path="*" 
        element={<Error />}
      />
      
    </Route>
  )
);

export default router;