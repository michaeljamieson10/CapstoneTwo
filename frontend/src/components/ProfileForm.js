import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button
} from "reactstrap";
import { useSelector } from 'react-redux';
import { decode } from "jsonwebtoken";

/**
 * user logged in profile form to send data to dbs
 */
const ProfileForm = ({ updateUser }) => {
  const userLoggedIn = useSelector(state => state.authentication);
  const { username } = decode(userLoggedIn.user)
  const handleSubmit = evt => {
    evt.preventDefault();
    
    // update data from form data

    updateUser(formData)
    setFormData({
      first_name: "",
      last_name: "",
      photo_url:"",
      password:""
    });
  };
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    photo_url: "",
    password: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };
  // end handleChange
  return (
    <div>
    <h3>Profile</h3>
    <section className="col-md-10">
    <Card>
      <CardBody>
    <form onSubmit={handleSubmit}>
  
      <p>
      <label htmlFor="first_name">First Name:</label>
      <input
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      </p>
      <p>
      <label htmlFor="lastname">Last Name:</label>
      <input
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      </p>
      <p>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      </p>
      <p>
      <label htmlFor="photo_url">Photo URL:</label>
      <input
        id="photo_url"
        name="photo_url"
        value={formData.photo_url}
        onChange={handleChange}
      />
      </p>
      <p>
      <label htmlFor="password">Reenter password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      </p>
      <Button color="primary">Save Changes</Button>
    </form>
      </CardBody>
      </Card>
    </section>
    </div>
  );
};
// end

export default ProfileForm;
