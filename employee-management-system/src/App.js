// Importing necessary modules and components from react-router-dom
import { Route, Routes } from "react-router-dom";

// Importing components from their respective files
import EmployeeDirectory from "./Components/EmployeeDirectory/EmployeeDirectory";
import Navigation from "./routes/navigation/navigation";
import EmployeeCreate from "./Components/EmployeeCreate/EmployeeCreate";
import EmployeeEditForm from "./Components/EmployeeEditForm/EmployeeEditForm";
import EmployeeDetails from "./Components/EmployeeDetails/EmployeeDetails";
import EmployeeUpComingRetirement from "./Components/EmployeeUpComingRetirement";

// The main App component
function App() {
  return (
    <div className="App">
      {/* Defining routes using react-router-dom's Routes and Route components */}
      <Routes>
        {/* The root route, where Navigation component is always rendered */}
        <Route path="/" element={<Navigation />}>
          {/* Sub-routes for different pages */}
          <Route index element={<EmployeeDirectory />} /> {/* Default route */}
          <Route path="/employee_create" element={<EmployeeCreate />} />
          <Route path="/employee_edit" element={<EmployeeEditForm />} />
          <Route path="/employee_details/:id" element={<EmployeeDetails />} />
          <Route
            path="/upcoming_retirement/"
            element={<EmployeeUpComingRetirement />}
          />
        </Route>
      </Routes>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
