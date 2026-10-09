import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before submitting.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "info",
        message:
          "Thank you for reaching out! (EmailJS credentials are pending configuration in environment variables).",
      });
      setForm({ name: "", email: "", message: "" });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: name,
          to_name: "Minte",
          from_email: email,
          to_email: "mintesinottamene0917@gmail.com",
          message: message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: "success",
            message: "Thank you! I will get back to you as soon as possible.",
          });
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setStatus({
            type: "error",
            message: "Something went wrong sending the message. Please try again later.",
          });
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {status.message && (
          <div
            className={`mt-4 p-4 rounded-lg text-sm font-medium ${
              status.type === "success"
                ? "bg-green-900/40 text-green-300 border border-green-500/30"
                : status.type === "info"
                ? "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                : "bg-red-900/40 text-red-300 border border-red-500/30"
            }`}
            role="alert"
          >
            {status.message}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-12"
          noValidate
        >
          <div className="flex flex-col">
            <label htmlFor="contact-name" className="mb-4 font-medium text-white">
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary focus:ring-2 focus:ring-[#915EFF]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact-email" className="mb-4 font-medium text-white">
              Your Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary focus:ring-2 focus:ring-[#915EFF]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact-message" className="mb-4 font-medium text-white">
              Your Message
            </label>
            <textarea
              id="contact-message"
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary focus:ring-2 focus:ring-[#915EFF]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 font-bold text-white shadow-md outline-none bg-tertiary rounded-xl w-fit shadow-primary hover:bg-[#1a143d] transition-colors focus:ring-2 focus:ring-[#915EFF] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

const ContactSection = SectionWrapper(Contact, "contact");
export default ContactSection;
