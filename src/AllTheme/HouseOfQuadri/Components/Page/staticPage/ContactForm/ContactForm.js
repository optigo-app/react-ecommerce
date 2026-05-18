import React, { useEffect, useState } from "react";
import "./ContactForm.scss";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { BespokeAPI } from "../../../../../../utils/API/Bespoke/BespokeAPI";
import { ContactUsAPI } from "../../../../../../utils/API/ContactUs/ContactUsAPI";
import PageLoader from "../../../../../../utils/Glob_Functions/PageLoaderComponent/PageLoader";

// Set to 0 to show Sonasons (Cosmic Kepler-186f Branch), 1 to show Shantha Jewellers
const contactFormMode = 0;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    FullName: '',
    InQuiryCompanyName: '',
    EmailId: '',
    mobileno: '',
    InQuirySubject: '',
    Be_In_Message: '',
    Themeno: '7'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.FullName) {
      errors.FullName = 'Please enter your full name';
    }
    if (!formData.InQuiryCompanyName) {
      errors.InQuiryCompanyName = 'Please enter your company name';
    }
    if (!formData.EmailId) {
      errors.EmailId = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.EmailId)) {
      errors.EmailId = 'Please enter a valid email address';
    }
    if (!formData.mobileno) {
      errors.mobileno = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.mobileno)) {
      errors.mobileno = 'Phone must be a 10-digit number';
    }
    if (!formData.InQuirySubject) {
      errors.InQuirySubject = 'Please enter the subject';
    }
    if (!formData.Be_In_Message) {
      errors.Be_In_Message = 'Please enter your message';
    }

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await ContactUsAPI(formData).then((res) => {
        if (res?.stat_msg === 'success') {
          toast.success("Got it! We've received your query. We'll be in touch shortly.")
          setLoading(false);
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        } else {
          toast.error("Something went wrong");
          setLoading(false);
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        }
      })
      setFormData({
        FullName: '',
        InQuiryCompanyName: '',
        EmailId: '',
        mobileno: '',
        InQuirySubject: '',
        Be_In_Message: '',
        Themeno: '7'
      });
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    })
  }, [])

  return (
    <div className="hoq_contactfrom">
      <div className="details">
        <h1>We’re here to Help</h1>
        <p>
          Have a question, need support, or just want to say hello? We’d love ❤️ to hear <br />
          from you. Reach out to us anytime and our team will get back to you as soon as <br />
          possible.
        </p>
        <span>Email : {contactFormMode === 0 ? "galaxy@sonasons.com" : "shantha.jewellers@gmail.com"}</span>
        <p>Phone: {contactFormMode === 0 ? "+91 99999 88888" : "+91 9962040229"}</p>
        <address>
          Address: {contactFormMode === 0
            ? <>Plot 42, Nebula Boulevard, Sector 9, <br />Stardust City, Kepler-186f, Mars 99999</>
            : <>68, N Usman Rd, near State Bank of Travancore, <br />Postal Colony, T. Nagar, Chennai, Tamil Nadu 600017</>
          }
        </address>
      </div>
      <div className="contact_from">
        <h1>Contact us</h1>
        <div className="layout">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <div className="box_input">
                <label htmlFor="name">Name</label>
                <input
                  type='text'
                  name='FullName'
                  value={formData.FullName}
                  onChange={handleChange}
                />
                {errors.FullName && <p className='error'>{errors.FullName}</p>}
              </div>
              <div className="box_input">
                <label htmlFor="name">Company Name</label>
                <input
                  type='text'
                  name='InQuiryCompanyName'
                  value={formData.InQuiryCompanyName}
                  onChange={handleChange}
                />
                {errors.InQuiryCompanyName && <p className='error'>{errors.InQuiryCompanyName}</p>}
              </div>
            </div>
            <div className="input">
              <div className="box_input">
                <label htmlFor="email">Email</label>
                <input
                  type='email'
                  name='EmailId'
                  value={formData.EmailId}
                  onChange={handleChange}
                />
                {errors.EmailId && <p className='error'>{errors.EmailId}</p>}
              </div>
              <div className="box_input">
                <label htmlFor="mobile">Phone Number</label>
                <input
                  type='text'
                  name='mobileno'
                  maxLength={10}
                  pattern="{0-9}[10]"
                  value={formData.mobileno}
                  onChange={handleChange}
                />
                {errors.mobileno && <p className='error'>{errors.mobileno}</p>}
              </div>
            </div>
            <div className="input-last">
              <div className="box_input">
                <label htmlFor="subject">Subject</label>
                <input
                  type='text'
                  name='InQuirySubject'
                  value={formData.InQuirySubject}
                  onChange={handleChange}
                />
                {errors.InQuirySubject && <p className='error'>{errors.InQuirySubject}</p>}
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="msg">Message</label>
              <textarea
                type='text'
                name='Be_In_Message'
                value={formData.Be_In_Message}
                onChange={handleChange}
              />
              {errors.Be_In_Message && <p className='error'>{errors.Be_In_Message}</p>}
            </div>

            <div className="btn_form">
              <button type="submit" disabled={loading === true}>{loading === true ? 'Sending' : 'Send'}</button>
            </div>
          </form>
        </div>
      </div>

      <Box
        sx={{
          width: '100%',
          height: '450px'
        }}
      >
        <iframe title="google_map"
          src={contactFormMode === 0
            ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.2828242419437!2d72.8191344!3d21.1809209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e438cc948fb%3A0x5712a989b70ef3a2!2sOrail%20Services%20-%20OptigoApps!5e0!3m2!1sen!2sin!4v1734596370112!5m2!1sen!2sin"
            : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.948469280785!2d80.2266454841771!3d13.038952080624663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266ff599f70c7%3A0xf6cba3a6a7e273!2sShantha%20Jewellers!5e0!3m2!1sen!2sin!4v1769235133829!5m2!1sen!2sin"
          }
          style={{
            border: '0',
            width: '100%',
            height: '100%'
          }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </Box>
      <PageLoader loading={loading} />
    </div>
  );
};

export default ContactForm;
