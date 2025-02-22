import { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";


class EmployeeRetirementSearch extends Component {

    constructor() {
        super();
        this.state = {
          searchText: "Full-Time",          
        };
    }

    // Function to update the search text as the user types
    updateSearchText = (e) => {
        this.setState({ searchText: e.target.value });
    };

    // Function to trigger the employee search with the current search text and option
    filterEmployee = () => {
        this.props.employeeSearch(this.state.searchText);        
    };

    // Function to reset the search and reload all employees
    resetSearch = () => {
        this.setState({
            searchText: "",
        });
        this.props.employeeSearchReset();        
    };

    render() {
        return (
            <div className="container-xl">
                <div className="mt-5">
                    <h1>{this.state.name}</h1>
                    <InputGroup className="mb-3">
                        <Form.Select
                            className="form-select"                            
                            onChange={this.updateSearchText}
                        >                            
                            <>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Intern">Intern</option>
                            <option value="Contract">Contract</option>
                            </>                            
                        </Form.Select>
                        &nbsp;
                        <Button
                            variant="info"
                            onClick={this.filterEmployee}                            
                        >
                            Search
                        </Button>
                        &nbsp;
                        <Button
                            variant="info"
                            onClick={this.resetSearch}                            
                        >
                            Reset
                        </Button>
                    </InputGroup>                    
                </div>
            </div>            
        )
    }
}

export default EmployeeRetirementSearch;