import { Component } from "react";
import EmployeeSearch from "../EmployeeSearch";
import EmployeeTable from "../EmployeeTable";
import "./EmployeeDirectory.css";
import API_URL from "../../config";

class EmployeeDirectory extends Component {
  constructor() {
    super();
    this.state = {
      name: "Employee Directory",
      employees: [],
      ageOfRetirement: 65,
      errorMessage: null,
    };
  }

  // Lifecycle method called after the component is mounted
  async componentDidMount() {
    const data = await this.getEmployees();
    this.setState({ employees: data });
  }

  /**
   * Function that consumes the API to fetch all the employees
   * @returns A promise with the data from the API, after processing
   */
  getEmployees = () => {
    if (!API_URL) {
      console.error("The environment variable REACT_APP_API_URL is not defined.");
      return Promise.reject("Error: API_URL is not defined.");
    }

    return fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          EmployeeDirectory {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        let data = body.data.EmployeeDirectory;
        data.forEach((employee) => {
          if (employee.dateOfJoining) {
            employee.dateOfJoining = new Date(employee.dateOfJoining);
          }
        });

        return data;
      });
  };

  /**
   * Function that performs the employee search when the user clicks on the Search button of the EmployeeSearch component.
   * @param {*} searchText Search text entered by the user.
   * @param {*} searchOption Search option selected by the user.
   */
  employeeSearch = async (searchText, searchOption) => {
    const employeesFetched = await this.getEmployees();

    // Validates the data type of the search option selected
    let dataTypeOfSearchOption = null;
    for (const employee of employeesFetched) {
      if (employee.hasOwnProperty(searchOption)) {
        dataTypeOfSearchOption = typeof employee[searchOption];
        if (
          dataTypeOfSearchOption === "object" &&
          employee[searchOption] instanceof Date
        ) {
          dataTypeOfSearchOption = "date";
        }
        break;
      }
    }

    // Filters the employees based on the search text and search option.
    const employeesFiltered = employeesFetched.filter((employee) => {
      const propertyValue = employee[searchOption];
      switch (dataTypeOfSearchOption) {
        case "string":
          return propertyValue.toLowerCase().includes(searchText.toLowerCase());
        case "number":
          return propertyValue.toString().includes(searchText);
        case "date":
          return propertyValue
            .toDateString()
            .toLowerCase()
            .includes(searchText.toLowerCase());
        default:
          return false;
      }
    });

    this.setState({ employees: employeesFiltered });
  };

  // Function to reset employee search and fetch all employees
  employeeSearchReset = async () => {
    const data = await this.getEmployees();
    this.setState({ employees: data });
  };

  /**
   * Function that deletes an employee
   * @param {*} param0 Id of the employee to be deleted.
   */
  deleteEmployee = ({ employeeId }) => {
    if (!API_URL) {
      console.error("The environment variable REACT_APP_API_URL is not defined.");
      return Promise.reject("Error: API_URL is not defined.");
    }

    // GraphQL query
    fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation DeleteEmployee($id: String) {
          deleteEmployee(id: $id) {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }`,
        variables: {
          id: employeeId,
        },
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.errors) {
          this.displayErrorMessage(body.errors[0].message);
        } else if (body.data.deleteEmployee) {
          const deletedEmployeeId = body.data.deleteEmployee.id;

          // Filter employees to remove the deleted employee from the employee array
          const updatedEmployees = this.state.employees.filter(
            (employee) => employee.id !== deletedEmployeeId
          );

          this.setState({ employees: updatedEmployees });
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  displayErrorMessage = (message) => {
    this.setState({ errorMessage: message });
    // Hide the success message after 3 seconds
    setTimeout(() => {
      this.setState({
        errorMessage: "",
      });
    }, 3000);
  };

  // Rendering the component
  render() {
    return (
      <div className="container-xl">
        {this.state.errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {this.state.errorMessage}
          </div>
        )}
        <h1>{this.state.name}</h1>
        {/* EmployeeSearch component for search functionality */}
        <EmployeeSearch
          employeeSearch={this.employeeSearch}
          employeeSearchReset={this.employeeSearchReset}
        />
        {/* EmployeeTable component for displaying employee data */}
        <EmployeeTable
          employees={this.state.employees}
          deleteEmployee={this.deleteEmployee}
        />
      </div>
    );
  }
}

// Exporting the component
export default EmployeeDirectory;
