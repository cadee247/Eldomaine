import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSearch } from 'react-icons/ai';
import '../css/FAQ.css';
import coverImg from '../assets/cover.png';
import Hero from '../Components/Hero';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "When do admissions open?",
      answer:
        "Admissions for the new academic year open every September. Application forms are available at the school’s main office and online on our Admissions page.",
    },
    {
      question: "What time does the school dismiss?",
      answer: "Mon-Thurs: 14:45, Fridays: 12:45.",
    },
    {
      question: "How much is school fees?",
      answer: "Eldomaine Secondary is a non-fee paying school.",
    },
    {
      question: "Where can I buy uniform?",
      answer:
        "Seedats Schoolwear, Kliptown, 22 Union Road, Shop No.8, Kliptown 1812.",
    },
    {
      question: "Is there a feeding scheme?",
      answer: "Yes, we have a feeding scheme available.",
    },
    {
      question: "What is the EMIS number?",
      answer: "EMIS: 700120030.",
    },
    {
      question: "Who is the current principal?",
      answer: "Ashley Pienaar.",
    },
    {
      question: "Is Eldomaine Secondary School a public school?",
      answer:
        "Yes, Eldomaine Secondary School is a public no-fee school located in Eldorado Park, Johannesburg. We proudly serve our local community.",
    },
    {
      question: "What grades does the school cater for?",
      answer:
        "We offer education from Grade 8 to Grade 12, preparing learners for the National Senior Certificate (NSC).",
    },
    {
      question: "What subjects are available?",
      answer:
        "Our curriculum offers academic and technical streams, including Mathematics, Physical Science, Business Studies, Tourism, and more. Visit the Curriculum page for full details.",
    },
    {
      question: "Does the school offer extracurricular activities?",
      answer:
        "Yes! Learners can join various sports, cultural, and academic clubs to develop their talents and leadership skills.",
    },
    {
      question: "How can I contact the school?",
      answer:
        "You can reach us via the Contact page or visit the school’s administrative office during working hours for in-person assistance.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Hero
        image={coverImg}
        title="Frequently Asked Questions — Learn more about Eldomaine Secondary School."
        type="faq"
      />

      <section className="faq-intro">
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to the most common questions about Eldomaine Secondary School
        </p>
      </section>

      <section className="faq-section">
        <div className="faq-search">
          <AiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="faq-container">
          {filteredFaqs.length === 0 ? (
            <p>No FAQs match your search.</p>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                key={index}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {openIndex === index ? (
                      <AiOutlineMinus />
                    ) : (
                      <AiOutlinePlus />
                    )}
                  </span>
                </button>

                <div
                  className="faq-answer"
                  style={{
                    maxHeight: openIndex === index ? '300px' : '0',
                    opacity: openIndex === index ? '1' : '0',
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default FAQ;
