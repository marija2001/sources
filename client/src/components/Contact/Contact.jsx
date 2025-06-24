import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from 'react-icons/hi2'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_uwopeyk', 'template_fithv1x', form.current, '7mZAWx2rAKb1BPKGd')
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Something went wrong, please try again.");
        }
      );
  };
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Our Contact Us</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.

            {" "}
          </span>
          <form ref={form} onSubmit={sendEmail} className="contactForm">
            <label htmlFor="user_email" className="primaryText">Your Email</label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="message" className="primaryText">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Type your message here..."
              required
            />

            <button type="submit" className="button">Send</button>
          </form>



        </div>
      </div>
    </div>

  );
};

export default Contact;
