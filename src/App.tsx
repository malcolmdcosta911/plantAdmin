import { Routes, Route } from "react-router-dom";
import AuthenticatedRoute from "./components/common/AuthenticatedRoute";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import ForgotPasswordPage from "./routes/forgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlantsPage from "./routes/plants";
import UsersPage from "./routes/users";
import SideBarLayout from "./components/SideBarLayout";
import NotFound from "./routes/notFound";
import PlantForm from "./components/PlantForm";
import Notifcation from "./components/Notifcation";

function App() {
  return (
    <>
      {/* <AuthenticatedRoute> */}
        <Notifcation />
      {/* </AuthenticatedRoute> */}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <SideBarLayout>
                <HomePage />
              </SideBarLayout>
            </AuthenticatedRoute>
          }
        />

        <Route path="/plants">
          <Route
            index
            element={
              <AuthenticatedRoute>
                <SideBarLayout>
                  <PlantsPage />
                </SideBarLayout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthenticatedRoute>
                <SideBarLayout>
                  <PlantForm />
                </SideBarLayout>
              </AuthenticatedRoute>
            }
          />
        </Route>
        <Route
          path="/users"
          element={
            <AuthenticatedRoute>
              <SideBarLayout>
                <UsersPage />
              </SideBarLayout>
            </AuthenticatedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot" element={<ForgotPasswordPage />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
