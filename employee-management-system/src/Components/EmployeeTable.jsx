import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import EmployeeRow from "./EmployeeRow";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedEmployee: null,
      shouldRedirect: false,
      pagetoRedirect: "",
    };
  }

  /**
   * Function to handle clicks on the edit button.
   *
   * @param {*} employee Employee to edit.
   */
  handleEditClick = (employee) => {
    this.setState({
      editedEmployee: { ...employee },
      shouldRedirect: true,
      pagetoRedirect: "edit",
    });
  };

  /**
   * Function to handle clicks on the details button.
   *
   * @param {*} employee Employee to edit.
   */
  handleDetailsClick = (employee) => {
    this.setState({
      editedEmployee: { ...employee },
      shouldRedirect: true,
      pagetoRedirect: "details",
    });
  };

  /**
   * Function that executes when the Delete button is clicked, gets the employee id to be deleted
   * and passes it to the deleteEmployee function of the EmployeeDirectory component.
   *
   * @param {*} employeeId Employee id to be deleted
   */
  handleDeleteEmployee = (employeeId, currentStatus) => {
    // Check if the current status is 'Working' before attempting to delete
    if (currentStatus === "Working") {
      alert("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
      return;
    }
    this.props.deleteEmployee({
      employeeId,
    });
  };

  render() {
    const { employees } = this.props;
    const { editedEmployee } = this.state;

    // If statement that validates if shouldRedirect is true to redirect to a new page.
    if (this.state.shouldRedirect) {
      const pagetoRedirect = this.state.pagetoRedirect;

      switch (pagetoRedirect) {
        case "edit":
          return <Navigate to="/employee_edit" state={editedEmployee} />;
        case "details":
          return <Navigate to={`/employee_details/${editedEmployee.id}`} />;
        default:
          break;
      }
    }

    const employeesRow = employees.map((employee) => {
      return (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          handleDetailsClick={this.handleDetailsClick}
          handleEditClick={this.handleEditClick}
          handleDeleteEmployee={() =>
            this.handleDeleteEmployee(employee.id, employee.currentStatus)
          }
          showButtons={true}
        />
      );
    });

    return (
      <div className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{employeesRow}</tbody>
        </Table>
      </div>
    );
  }
}

export default EmployeeTable;
