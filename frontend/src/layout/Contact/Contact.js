import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    
    <div className="contactContainer">
      <MetaData title="Contact" />
      <a className="mailBtn" href="mailto:abdulhameed000650@gmail.com">
        <Button>Contact: abdulhameed000650@gmail.com</Button>
      </a>
    </div>
   
  );
};

export default Contact;