import React from 'react';
import '../../pages/Legal/PrivatePolicy.css'; // Reuse the same CSS file as Terms and Conditions
import Header from '../../components/Header'; // Update the path if necessary
import Footer from '../../components/Footer'; // Update the path if necessary
import { Link } from 'react-router-dom'; // Import if you're using React Router

const PrivacyPolicy = () => {
  const isAuthenticated = true;

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="legal-page">
        <main className="content">
          {/* Inline Links similar to Terms and Conditions page */}
          <div className="legal-links">
            <Link to="/legal/terms">Terms and Conditions</Link> |{" "}
            <Link to="/legal/privacy">Privacy Policy</Link>
          </div>

          <h1>Privacy Policy</h1>
          <p className="effective-date">Effective starting Sep 12, 2024</p>

          <section>
            <p>
              Millet, Inc. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website <a href="https://www.app.getmillet.com">https://www.app.getmillet.com</a> or use our services. By accessing and/or using our Site, you agree to this Privacy Policy. If you do not agree, please do not use our Site.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect personal information that you provide directly to us, such as when you create an account, update your profile, or interact with our services. This may include your name, email address, company name, and other contact details.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to operate, maintain, and provide the features and functionality of our services, to communicate with you, and to improve our offerings.
            </p>
          </section>

          <section>
            <h2>Sharing of Information</h2>
            <p>
              We do not share your personal information with third parties except as necessary to provide our services or as required by law. We may share information with service providers who assist us in operating the Site, conducting our business, or servicing you.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We take reasonable steps to protect the information we collect from unauthorized access, alteration, disclosure, or destruction. However, no security measures are completely secure, and we cannot guarantee the security of your information.
            </p>
          </section>

          <section>
            <h2>Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We recommend that you review this page periodically to stay informed of any updates.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:aiden@getmillet.com">aiden@getmillet.com</a>
            </p>
            <p>Last update: Sep 12, 2024</p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
