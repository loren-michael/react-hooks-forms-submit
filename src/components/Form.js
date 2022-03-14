import React, { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("Sylvia");
  const [lastName, setLastName] = useState("Woods");
  // add this next variable for the display below
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors ] = useState([]);

  function handleSubmit(event) {
    event.preventDefault(); //prevent the automatic post
    if (firstName.length > 0) {
      const formData = {  //assemble the data from the form using the values from state
        firstName: firstName,
        lastName: lastName,
      };

      // props.sendFormDataSomewhere(formData);
          // since we don't have a backend set up, let's just display the data from state instead.

      const dataArray = [...submittedData, formData]; //add our new data onto the state

      setSubmittedData(dataArray); //update state with the new data

      setFirstName(""); //reset the forms to be blank (we can't use event.target.reset() here because that vanilla JS method doesn't update state!)
      setLastName("");
    } else {
      setErrors(["First name is required!"]);
    }
  };

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  };

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  };

  // map our data to be displayed below
  const listOfSubmissions = submittedData.map((data, index) => {
    return (
      <div key={index}>
        {data.firstName} {data.lastName}
      </div>
    )
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleFirstNameChange} value={firstName} />
        <input type="text" onChange={handleLastNameChange} value={lastName} />
        <button type="submit">Submit</button>
      </form>

      {/* Conditionally render error messages */}
      {errors.length > 0 ? errors.map((error, index) => (
        <p key={index} style={{color: "red"}}>
          {error}
        </p>
      ))
    : null }

      <h3>Submissions</h3>
      {listOfSubmissions}
    </div>
  );
}

export default Form;
