import React from 'react';
import '../../pages/Legal/TermsAndConditions.css'; // Update the path if necessary
import Header from '../../components/Header'; // Update the path if necessary
import Footer from '../../components/Footer'; // Update the path if necessary
import { Link } from 'react-router-dom'; // Import if you're using React Router

const TermsAndConditions = () => {
  const isAuthenticated = true;
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="legal-page">
        
        <main className="content">
        <div className="legal-links">
            <Link to="/legal/terms">Terms and Conditions</Link> |{" "}
            <Link to="/legal/privacy">Privacy Policy</Link>
          </div>
          <h1>Terms and Conditions</h1>
          <p className="effective-date">Effective starting Sep 12, 2024</p>

          <section>
            <p>
              This website ("Site") is operated by Millet, Inc. ("we", "our" or "us"). It is available at:{' '}
              <a href="https://www.app.getmillet.com">https://www.app.getmillet.com</a> and may be available through
              other addresses or channels.
            </p>
          </section>

          <section>
            <h2>Consent</h2>
            <p>
              By accessing and/or using our Site, you agree to these terms of use and our Privacy Policy ("Terms").
              Please read these Terms carefully and immediately cease using our Site if you do not agree to them.
            </p>
          </section>

          <section>
            <h2>Variations</h2>
            <p>
              We may, at any time and at our discretion, vary these Terms by publishing the varied terms on our Site.
              We recommend you check our Site regularly to ensure you are aware of our current terms. Materials and
              information on this Site ("Content") are subject to change without notice. We do not undertake to keep
              our Site up-to-date and we are not liable if any Content is inaccurate or out-of-date.
            </p>
          </section>

          <section>
            <h2>License to Use Our Site</h2>
            <p>
              We grant you a non-exclusive, royalty-free, revocable, worldwide, non-transferable license to use our
              Site in accordance with these Terms. All other uses are prohibited without our prior written consent.
            </p>
          </section>

          <section>
            <h2>Prohibited Conduct</h2>
            <p>
              You must not do or attempt to do anything that is unlawful; prohibited by any laws applicable to our
              Site; which we would consider inappropriate; or which might bring us or our Site into disrepute,
              including (without limitation):
            </p>
            <ul>
              <li>
                Anything that would constitute a breach of an individual’s privacy (including uploading private or
                personal information without an individual's consent) or any other legal rights.
              </li>
              <li>Using our Site to defame, harass, threaten, menace, or offend any person.</li>
              <li>Interfering with any user using our Site.</li>
              <li>
                Tampering with or modifying our Site, knowingly transmitting viruses or other disabling features, or
                damaging or interfering with our Site, including (without limitation) using trojan horses, viruses or
                piracy or programming routines that may damage or interfere with our Site.
              </li>
              <li>Using our Site to send unsolicited email messages.</li>
              <li>Facilitating or assisting a third party to do any of the above acts.</li>
            </ul>
          </section>

          <section>
            <h2>Exclusion of Competitors</h2>
            <p>
              You are prohibited from using our Site, including the Content, in any way that competes with our
              business.
            </p>
          </section>

          <section>
            <h2>Information</h2>
            <p>
              The Content is not comprehensive and is for general information purposes only. It does not take into
              account your specific needs, objectives, or circumstances, and it is not advice. While we use reasonable
              attempts to ensure the accuracy and completeness of the Content, we make no representation or warranty
              in relation to it, to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2>Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, we own or license all rights, title, and interest (including intellectual
              property rights) in our Site and all of the Content. Your use of our Site and your use of and access to
              any Content does not grant or transfer to you any rights, title, or interest in relation to our Site or
              the Content.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Copy or use, in whole or in part, any Content.</li>
              <li>
                Reproduce, retransmit, distribute, disseminate, sell, publish, broadcast, or circulate any Content to
                any third party.
              </li>
              <li>
                Breach any intellectual property rights connected with our Site or the Content, including (without
                limitation) altering or modifying any of the Content, causing any of the Content to be framed or
                embedded in another website or platform, or creating derivative works from the Content.
              </li>
            </ul>
          </section>

          <section>
            <h2>User Content</h2>
            <p>
              You may be permitted to post, upload, publish, submit, or transmit relevant information and content
              ("User Content") on our Site. We claim no ownership of the intellectual property rights in User Content
              you provide to the Site. Your profile and materials uploaded remain yours. However, by setting your
              pages to be shared publicly or making available any User Content on or through our Site, you agree to
              allow others to view and share your User Content and you grant to us a worldwide, irrevocable,
              perpetual, non-exclusive, transferable, royalty-free license to use the User Content, with the right to
              use, view, copy, adapt, modify, communicate, publicly display, publicly perform, transmit, stream,
              broadcast, and access such User Content on, through, or by means of our Site.
            </p>
            <p>You agree that you are solely responsible for all User Content that you make available on or through our Site. You represent and warrant that:</p>
            <ul>
              <li>
                You are either the sole and exclusive owner of all User Content or you have all rights, licenses,
                consents, and releases that are necessary to grant to us the rights in such User Content (as
                contemplated by these Terms).
              </li>
              <li>
                Neither the User Content nor the posting, uploading, publication, submission, or transmission of the
                User Content or our use of the User Content on, through, or by means of our Site will infringe,
                misappropriate, or violate a third party’s intellectual property rights, or rights of publicity or
                privacy, or result in the violation of any applicable law or regulation.
              </li>
            </ul>
            <p>
              We do not endorse or approve, and are not responsible for, any User Content. We may, at any time (at our
              sole discretion), remove any User Content.
            </p>
          </section>

          <section>
            <h2>Third-Party Sites</h2>
            <p>
              Our Site may contain links to websites operated by third parties. Unless expressly stated otherwise, we
              do not control, endorse, or approve, and are not responsible for, the content on those websites. You
              should make your own investigations with respect to the suitability of those websites.
            </p>
          </section>

          <section>
            <h2>Discontinuance</h2>
            <p>
              We may, at any time and without notice to you, discontinue our Site, in whole or in part. We may also
              exclude any person from using our Site, at any time and at our sole discretion. We are not responsible
              for any Liability you may suffer arising from or in connection with any such discontinuance or
              exclusion.
            </p>
          </section>

          <section>
            <h2>Warranties and Disclaimers</h2>
            <p>
              To the maximum extent permitted by law, we make no representations or warranties about our Site or the
              Content, including (without limitation) that:
            </p>
            <ul>
              <li>They are complete, accurate, reliable, up-to-date, and suitable for any particular purpose.</li>
              <li>Access will be uninterrupted, error-free, or free from viruses.</li>
              <li>Our Site will be secure.</li>
            </ul>
            <p>You read, use, and act on our Site and the Content at your own risk.</p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not responsible for any loss, damage, or expense,
              howsoever arising, whether direct or indirect and/or whether present, unascertained, future, or
              contingent ("Liability") suffered by you or any third party, arising from or in connection with your use
              of our Site and/or the Content and/or any inaccessibility of, interruption to, or outage of our Site
              and/or any loss or corruption of data and/or the fact that the Content is incorrect, incomplete, or
              out-of-date.
            </p>
          </section>

          <section>
            <h2>Indemnity</h2>
            <p>
              To the maximum extent permitted by law, you must indemnify us, and hold us harmless, against any
              Liability suffered or incurred by us arising from or in connection with your use of our Site or any
              breach of these Terms or any applicable laws by you. This indemnity is a continuing obligation,
              independent from the other obligations under these Terms, and continues after these Terms end. It is not
              necessary for us to suffer or incur any Liability before enforcing a right of indemnity under these
              Terms.
            </p>
          </section>

          <section>
            <h2>Termination</h2>
            <p>
              These Terms are effective until terminated by us, which we may do at any time and without notice to you.
              In the event of termination, all restrictions imposed on you by these Terms and limitations of liability
              set out in these Terms will survive.
            </p>
          </section>

          <section>
            <h2>Disputes</h2>
            <p>
              In the event of any dispute arising from, or in connection with, these Terms ("Dispute"), the party
              claiming there is a Dispute must give written notice to the other party setting out the details of the
              Dispute and proposing a resolution. Within 7 days after receiving the notice, the parties must, by their
              senior executives or senior managers (who have the authority to reach a resolution on behalf of the
              party), meet at least once to attempt to resolve the Dispute or agree on the method of resolving the
              Dispute by other means, in good faith. All aspects of every such conference, except the fact of the
              occurrence of the conference, will be privileged. If the parties do not resolve the Dispute, or (if the
              Dispute is not resolved) agree on an alternate method to resolve the Dispute, within 21 days after
              receipt of the notice, the Dispute may be referred by either party (by notice in writing to the other
              party) to litigation.
            </p>
          </section>

          <section>
            <h2>Severance</h2>
            <p>
              If a provision of these Terms is held to be void, invalid, illegal, or unenforceable, that provision
              must be read down as narrowly as necessary to allow it to be valid or enforceable. If it is not possible
              to read down a provision (in whole or in part), that provision (or that part of that provision) is
              severed from these Terms without affecting the validity or enforceability of the remainder of that
              provision or the other provisions in these Terms.
            </p>
          </section>

          <section>
            <h2>Jurisdiction</h2>
            <p>
              Your use of our Site and these Terms are governed by the laws of the United States. You irrevocably and
              unconditionally submit to the exclusive jurisdiction of the courts operating in the United States and
              any courts entitled to hear appeals from those courts and waive any right to object to proceedings being
              brought in those courts.
            </p>
            <p>
              Our Site may be accessed throughout the United States and overseas. We make no representation that our
              Site complies with the laws (including intellectual property laws) of any country outside the United
              States. If you access our Site from outside the United States, you do so at your own risk and are
              responsible for complying with the laws of the jurisdiction where you access our Site.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For any questions and notices, please contact us at:</p>
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

export default TermsAndConditions;
