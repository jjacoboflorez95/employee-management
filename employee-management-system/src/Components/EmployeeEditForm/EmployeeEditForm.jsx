import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./EmployeeEditForm.css";
import API_URL from "../../config";

const EmployeeEditForm = () => {
  // useNavigate hook for navigation
  const navigate = useNavigate();

  // useLocation() hook to get the props passed from the EmployeeTable component.
  const location = useLocation();
  const editedEmployee = location.state;

  // Parsing to Date and getting only the date to show it in the form
  if (editedEmployee.dateOfJoining instanceof Date) {
    const dateOfJoiningFormatted = editedEmployee.dateOfJoining
      .toISOString()
      .split("T")[0];
    editedEmployee.dateOfJoining = dateOfJoiningFormatted;
  }

  // Define state variables and functions to update them
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(editedEmployee);

  // Variable for displaying success or error message
  let alertMessage = null;
  if (showMessage) {
    alertMessage = (
      <Alert variant={error ? "danger" : "success"} className="mb-3 mt-3">
        {message}
      </Alert>
    );
  }

  // Function to handle the save action on the edit form
  const onSaveEdit = (e) => {
    e.preventDefault();

    if (!API_URL) {
      console.error("The environment variable REACT_APP_API_URL is not defined.");
      return Promise.reject("Error: API_URL is not defined.");
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateEmployee($id: String, $employee: EmployeeInput) {
          updateEmployee(id: $id, employee: $employee) {
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
          id: formData.id,
          employee: formData,
        },
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        const updatedEmployee = body.data.updateEmployee;

        // Reset the error, showMessage, and message
        setError(false);
        setShowMessage(true);
        setMessage(
          `Employee ${updatedEmployee.firstName} ${updatedEmployee.lastName} updated successfully!`
        );

        // Hides the success message after 3 seconds and Navigates to home page
        setTimeout(() => {
          setShowMessage(false);
          setMessage("");
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        // Handle error updating employee
      });
  };

  // Function to handle input changes in the form
  const onEditInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Rendering the component
  return (
    <Container className="edit-employee-form modal-content">
      <h3 className="mb-4">Edit Employee Data</h3>
      <Form name="editForm">
        {/* Form input fields */}
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={formData.age}
            placeholder="Age should be between 20-70"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="dateOfJoining">
          <Form.Label>Date of Joining</Form.Label>
          <Form.Control
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            as="select"
            name="title"
            value={formData.title}
            onChange={onEditInputChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={onEditInputChange}
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="employeeType">
          <Form.Label>Employee Type</Form.Label>
          <Form.Control
            as="select"
            name="employeeType"
            value={formData.employeeType}
            disabled
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Intern">Intern</option>
            <option value="Contract">Contract</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="currentStatus">
          <Form.Label>Current Status</Form.Label>
          <Form.Control
            as="select"
            name="currentStatus"
            value={formData.currentStatus}
            onChange={onEditInputChange}
          >
            <option value="Working">Working</option>
            <option value="Retired">Retired</option>
          </Form.Control>
        </Form.Group>

        {alertMessage}
        {/* Button group for Save and Cancel actions */}
        <div className="button-group">
          <Button
            type="submit"
            variant="info"
            className="me-3"
            onClick={onSaveEdit}
          >
            Save
          </Button>
          <Button type="button" variant="info" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EmployeeEditForm;
