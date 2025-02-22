import React, { Component } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import "./EmployeeCreate.css"; // Importing your CSS file
import { Navigate } from "react-router-dom";
import API_URL from "../../config";

// EmployeeCreate component
class EmployeeCreate extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      showMessage: false,
      shouldRedirect: false,
      message: "",
      maxDateOfJoining: "",
    };
  }

  // Lifecycle method called after the component is mounted
  componentDidMount() {
    // Getting the current date to configure the max attribute on the input text of date of joining.
    const currentDate = new Date();        
    const currentDateSplitted = currentDate.toLocaleDateString('en-CA');    
    this.setState({ maxDateOfJoining : currentDateSplitted });
  }

  /**
   * Function responsible for validating the user entries and, if they are valid, creating the new employee.
   * @param {*} e - Event object
   */
  handleSubmit = (e) => {
    e.preventDefault();

    // Validate age range
    if (
      parseInt(e.target.age.value) >= 20 &&
      parseInt(e.target.age.value) <= 64
    ) {
      // Create employee object from form data
      const employee = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age: parseInt(e.target.age.value),
        dateOfJoining: new Date(e.target.dateOfJoining.value).toDateString(),
        title: e.target.title.value,
        department: e.target.department.value,
        employeeType: e.target.employeeType.value,
        currentStatus: "Working",
      };

      if (!API_URL) {
        console.error("The environment variable REACT_APP_API_URL is not defined.");
        return Promise.reject("Error: API_URL is not defined.");
      }    

      // GraphQL mutation to add a new employee
      fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation AddEmployee($employee: EmployeeInput) {
            addEmployee(employee: $employee) {
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
            employee,
          },
        }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.data.addEmployee) {
            // Display success message and reset form
            const newEmployee = body.data.addEmployee;
            this.setState({
              error: false,
              showMessage: true,
              message: `Employee ${newEmployee.firstName} ${newEmployee.lastName} created successfully!`,
            });

            // Hide the success message after 3 seconds and navigates to Home page.
            setTimeout(() => {
              this.setState({
                showMessage: false,
                message: "",
                shouldRedirect: true,
              });
            }, 2000);

            // Clear the form inputs
            e.target.reset();
          } else {
            // Display error message
            this.setState({
              error: true,
              showMessage: true,
              message: "An error occurred, please try again.",
            });
          }
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    } else {
      // Display error message for invalid age range
      this.setState({
        error: true,
        showMessage: true,
        message: "The age must be between 20 and 64.",
      });
    }
  };

  render() {
    // Display success or error message
    let alertMessage = null;
    if (this.state.showMessage) {
      alertMessage = (
        <Alert
          variant={this.state.error ? "danger" : "success"}
          className="mb-3 mt-3"
        >
          {this.state.message}
        </Alert>
      );
    }

    // If statement that validates if shouldRedirect is true to redirect to a new page.
    if (this.state.shouldRedirect) {
      return <Navigate to="/" />;
    }

    // Render the form
    return (
      <Container className="employee-form">
        <h1>Create New Employee</h1>
        <Form name="EmployeeCreate" onSubmit={this.handleSubmit}>
          {/* Form input fields for various employee details */}
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" required />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" required />
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="age"
              placeholder="Age should be between 20-64"
              required
            />
          </Form.Group>

          <Form.Group controlId="dateOfJoining">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control type="date" name="dateOfJoining" max={this.state.maxDateOfJoining} required />
          </Form.Group>

          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control as="select" name="title">
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control as="select" name="department">
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="employeeType">
            <Form.Label>Employee Type</Form.Label>
            <Form.Control as="select" name="employeeType">
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Intern">Intern</option>
              <option value="Contract">Contract</option>
            </Form.Control>
          </Form.Group>
          <br />
          {alertMessage}
          <div className="form-group d-flex justify-content-center">
            <Button type="submit" variant="primary">
              Add new Employee
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

// Exporting the EmployeeCreate component as the default export
export default EmployeeCreate;
