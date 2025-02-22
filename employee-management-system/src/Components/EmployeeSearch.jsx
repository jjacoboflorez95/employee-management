import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  FormGroup,
} from "react-bootstrap";

class EmployeeSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      searchOption: "firstName",
      placeholder: "Search",
    };
  }

  // Function to update the selected search option
  updateSearchOption = (e) => {
    const searchOptionSelected = e.target.value.trim();
    this.setState({ searchOption: searchOptionSelected });

    // Switch statement to set default values for specific search options
    switch (searchOptionSelected) {
      case "employeeType":
        this.setState({ searchText: "Full-Time" });
        break;
      case "currentStatus":
        this.setState({ searchText: "Working" });
        break;
      default:
        this.setState({ searchText: "" });
        return false;
    }

    // Update the placeholder text based on the selected option
    if (e.target.value === "dateOfJoining") {
      this.setState({ placeholder: "Examples: Sun or 12 or Sun Jun 13 2021" });
    } else {
      this.setState({ placeholder: "Search" });
    }
  };

  // Function to update the search text as the user types
  updateSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  // Function to trigger the employee search with the current search text and option
  filterEmployee = () => {
    const { employeeSearch } = this.props;
    employeeSearch(this.state.searchText, this.state.searchOption);
  };

  // Function to reset the search and reload all employees
  resetSearch = () => {
    this.setState({
      searchText: "",
      searchOption: "firstName",
      placeholder: "Search",
    });
    const { employeeSearchReset } = this.props;
    employeeSearchReset();
  };

  render() {
    let searchElement = null;

    // Check the selected search option to determine the type of input element
    if (
      this.state.searchOption === "employeeType" ||
      this.state.searchOption === "currentStatus"
    ) {
      // Render a dropdown for employeeType and currentStatus options
      searchElement = (
        <Form.Select
          className="form-select"
          name={this.state.searchOption}
          onChange={this.updateSearchText}
        >
          {/* Options for employeeType and currentStatus */}
          {this.state.searchOption === "employeeType" ? (
            <>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Intern">Intern</option>
              <option value="Contract">Contract</option>
            </>
          ) : (
            <>
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </>
          )}
        </Form.Select>
      );
    } else {
      // Render a text input for other search options
      searchElement = (
        <FormControl
          className="form-control"
          type="text"
          value={this.state.searchText}
          placeholder={this.state.placeholder}
          onChange={this.updateSearchText}
        />
      );
    }

    return (
      <div className="mt-5">
        <p className="fs-5">Select option to filter your search results</p>
        {/* Render radio buttons for search options */}
        {[
          "firstName",
          "lastName",
          "age",
          "dateOfJoining",
          "title",
          "department",
          "employeeType",
          "currentStatus",
        ].map((option) => (
          <FormGroup key={option} className="form-check form-check-inline">
            <Form.Check
              type="radio"
              id={option}
              label={option.charAt(0).toUpperCase() + option.slice(1)}
              value={option}
              checked={this.state.searchOption === option}
              onChange={this.updateSearchOption}              
            />
          </FormGroup>
        ))}
        {/* Input group for search and reset buttons */}
        <InputGroup className="mb-3">
          {searchElement}
          &nbsp;
          <Button
            variant="info"
            onClick={this.filterEmployee}
            disabled={!this.state.searchText.trim()}
          >
            Search
          </Button>
          &nbsp;
          <Button
            variant="info"
            onClick={this.resetSearch}
            disabled={!this.state.searchText.trim()}
          >
            Reset
          </Button>
        </InputGroup>
      </div>
    );
  }
}

export default EmployeeSearch;
