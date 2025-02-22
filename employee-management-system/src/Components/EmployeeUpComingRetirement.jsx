import { Component } from "react";
import { Table } from "react-bootstrap";
import EmployeeRow from "./EmployeeRow";
import EmployeeRetirementSearch from "./EmployeeRetirementSearch";
import API_URL from "../config";

class EmployeeUpComingRetirement extends Component {

    constructor(){
        super();
        this.state = {
            name: "Employee Upcoming Retirement",
            employees: [],
            employeesFiltered: [],
            filterActivated: false,
            ageOfRetirement: 65,
        }
    }

    // Lifecycle method called after the component is mounted
    async componentDidMount() {
        const data = await this.getEmployees();        

        // Filter to get only the employees whose retirement is coming in next six months.
        const employeesFilter = data.filter((employee) => {
            // Years to retire
            const yearsToRetire = this.state.ageOfRetirement - employee.age;        
            
            // Date of retirement        
            const dateOfRetirement = employee.dateOfJoining;                
            dateOfRetirement.setDate(employee.dateOfJoining.getDate() - 1);        
            dateOfRetirement.setFullYear(employee.dateOfJoining.getFullYear() + yearsToRetire);
            dateOfRetirement.setHours(0, 0, 0, 0);            
            
            // Current Date + 6 months
            const currentDatePlusSixMotnhs = new Date();
            currentDatePlusSixMotnhs.setMonth(currentDatePlusSixMotnhs.getMonth() + 6);
            currentDatePlusSixMotnhs.setHours(0, 0, 0, 0);
            
            if(dateOfRetirement <= currentDatePlusSixMotnhs){                
                // Less than or equal to 6 months
                return true;
            } else {                
                // More than 6 months
                return false;
            }
        })
        
        this.setState({ employees : employeesFilter });
        
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
     * Function that performs the employee search when the user clicks on the Search button of the EmployeeRetirementSearch component.
     * @param {*} searchText Search text entered by the user.
     */
    employeeSearch = (searchText) => {              
        // Filters the employees based on the search text.
        const employeesFiltered = this.state.employees.filter((employee) => {                        
            return employee.employeeType.toLowerCase() === searchText.toLowerCase();
        });        

        this.setState({ employeesFiltered: employeesFiltered, filterActivated: true });
    };
    
    // Function to reset employee search and show all employees again.
    employeeSearchReset = () => {        
        this.setState({ employeesFiltered: [], filterActivated: false });
    };


    render() {
        let employeesRow = null;

        // If statement that validates if the table rows should be generate with the employee or the employeeFiltered array
        if(this.state.employeesFiltered.length === 0 && !this.state.filterActivated){
            employeesRow = this.state.employees.map((employee) => {
                return(
                  <EmployeeRow key={employee.id} employee={employee} 
                  showButtons={false} />
                );
            });
        } else {
            employeesRow = this.state.employeesFiltered.map((employee) => {
                return(
                  <EmployeeRow key={employee.id} employee={employee} 
                  showButtons={false} />
                );
            });
        }
        
        return (
            <div className="container-xl">
                <div className="mt-5">
                    <h1>{this.state.name}</h1>
                    <EmployeeRetirementSearch 
                        employeeSearch={this.employeeSearch}
                        employeeSearchReset={this.employeeSearchReset}
                    />
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
                        </tr>
                    </thead>
                    <tbody>{employeesRow}</tbody>
                    </Table>
                </div>
            </div>            
        )
    }
}

export default EmployeeUpComingRetirement;