import { Button } from "react-bootstrap";

const EmployeeRow = ({
  employee,
  handleDetailsClick,
  handleEditClick,
  handleDeleteEmployee,
  showButtons,
}) => {
  const buttonsTable = () => {
    if (showButtons) {
      return (
        <td>
          <Button
            variant="outline-info"
            className="me-2"
            onClick={() => handleDetailsClick(employee)}
          >
            Details
          </Button>
          <Button
            variant="outline-info"
            className="me-2"
            onClick={() => handleEditClick(employee)}
          >
            Edit
          </Button>
          <Button
            variant="outline-info"
            onClick={() =>
              handleDeleteEmployee(employee.id, employee.currentStatus)
            }
          >
            Delete
          </Button>
        </td>
      );
    }
  };

  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.age}</td>
      <td>
        {employee.dateOfJoining != null
          ? employee.dateOfJoining.toDateString()
          : ""}
      </td>
      <td>{employee.title}</td>
      <td>{employee.department}</td>
      <td>{employee.employeeType}</td>
      <td>{employee.currentStatus}</td>
      {buttonsTable()}
    </tr>
  );
};

export default EmployeeRow;
