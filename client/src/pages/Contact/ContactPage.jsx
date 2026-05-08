import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePhone, HiOutlineMail, HiOutlineMap } from "react-icons/hi";
import { toast } from "react-toastify";
import "../../styles/pageHero.css";
import "./ContactPage.css";

const SITE_CONTACT = {
  phoneDisplay: "+382 XX XXX XXX",
  phoneTel: "+382000000000",
  email: "sourcesystems@sourcesllc.com",
  addressLines: ["Mila Perunicica I/28", "Pljevlja 84210", "Montenegro"],
};

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company.trim() ? `Company: ${form.company}` : null,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(
      `Contact from ${form.name}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    toast.success("Opening your email client…");
  };

  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="page-hero__inner paddings innerWidth">
          <p className="page-hero__eyebrow">Contact</p>
          <h1 className="page-hero__title">Let&apos;s start a conversation</h1>
          <p className="page-hero__lede">
            Questions about projects, partnerships, or how we work — send a note
            and we&apos;ll respond as soon as we can.
          </p>
        </div>
      </section>

      <section className="contact-page__info paddings innerWidth" aria-label="Contact details">
        <div className="contact-page__info-grid">
          <article className="contact-card">
            <span className="contact-card__sticker" aria-hidden />
            <div className="contact-card__icon" aria-hidden>
              <HiOutlinePhone />
            </div>
            <h2 className="contact-card__label">Call us</h2>
            <a className="contact-card__value" href={`tel:${SITE_CONTACT.phoneTel}`}>
              {SITE_CONTACT.phoneDisplay}
            </a>
          </article>
          <article className="contact-card">
            <span className="contact-card__sticker" aria-hidden />
            <div className="contact-card__icon" aria-hidden>
              <HiOutlineMail />
            </div>
            <h2 className="contact-card__label">Mail</h2>
            <a
              className="contact-card__value"
              href={`mailto:${SITE_CONTACT.email}`}
            >
              {SITE_CONTACT.email}
            </a>
          </article>
          <div className="contact-page__location-slot">
            <article className="contact-card">
              <span className="contact-card__sticker" aria-hidden />
              <div className="contact-card__icon" aria-hidden>
                <HiOutlineMap />
              </div>
              <h2 className="contact-card__label">Location</h2>
              <address className="contact-card__address">
                {SITE_CONTACT.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-page__form-block">
        <div className="contact-page__form-shell paddings innerWidth">
          <div className="contact-page__form-intro">
            <h2 className="contact-page__form-heading">Get in touch!</h2>
            <p className="contact-page__form-sub secondaryText">
              And we will get back to you ASAP.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row contact-form__row--triple">
              <label className="contact-form__field">
                <span className="contact-form__label">
                  Name <abbr title="required">*</abbr>
                </span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="contact-form__input"
                />
              </label>
              <label className="contact-form__field">
                <span className="contact-form__label">
                  E-mail <abbr title="required">*</abbr>
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="contact-form__input"
                />
              </label>
              <label className="contact-form__field">
                <span className="contact-form__label">Company</span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  className="contact-form__input"
                />
              </label>
            </div>
            <label className="contact-form__field contact-form__field--full">
              <span className="contact-form__label">
                Message <abbr title="required">*</abbr>
              </span>
              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
                className="contact-form__textarea"
              />
            </label>
            <button type="submit" className="contact-form__submit button">
              Submit now
            </button>
          </form>
        </div>
      </section>

      <div className="contact-page__back-wrap paddings innerWidth">
        <Link className="contact-page__back" to="/">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

export default ContactPage;
