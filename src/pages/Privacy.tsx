import LegalPageLayout from '@/components/legal/LegalPageLayout';

const Privacy = () => (
  <LegalPageLayout title="Privacy Policy" lastUpdated="March 28, 2026">
    <p>
      Approvr, Inc. ("Approvr," "we," "us") builds tools that help agencies manage client approvals. This policy explains what data we collect, why we collect it, and how we handle it.
    </p>
    <p>
      We don't sell your data. We don't run ads. We collect what we need to run the service — nothing more.
    </p>

    <h2>What we collect</h2>

    <h3>Account and workspace data</h3>
    <p>
      When you sign up, we collect your name, email address, and workspace name. If you invite team members, we store their names and email addresses too.
    </p>

    <h3>Project and deliverable data</h3>
    <p>
      This includes project names, file uploads, version history, comments, approval decisions, and timestamps. This is the core of what Approvr does — we need it to run the service.
    </p>

    <h3>Client portal data</h3>
    <p>
      When your clients access a shared review link, we collect their name (if provided), comments, and approval actions. We log basic access information like IP address and browser type for security purposes.
    </p>

    <h3>Authentication and session data</h3>
    <p>
      We use session cookies and authentication tokens to keep you signed in and protect your account. These are strictly necessary for the service to work.
    </p>

    <h3>Support communications</h3>
    <p>
      If you email us or use in-app support, we keep those conversations to help resolve your issue and improve the product.
    </p>

    <h2>Why we collect it</h2>
    <ul>
      <li><strong>Service operation</strong> — to run Approvr and deliver the features you signed up for.</li>
      <li><strong>Communication</strong> — to send transactional emails (approval notifications, password resets) and respond to support requests.</li>
      <li><strong>Security and fraud prevention</strong> — to detect unauthorized access and protect your workspace.</li>
      <li><strong>Product improvement</strong> — to understand how features are used so we can make them better. We use aggregate, anonymized data for this — not individual browsing behavior.</li>
    </ul>

    <h2>Service providers</h2>
    <p>
      We use a small number of trusted third-party providers to run Approvr. These include infrastructure hosting, email delivery, authentication, and file storage. Each provider only receives the data they need to perform their specific function, and we choose providers with strong privacy and security practices.
    </p>

    <h2>Data retention</h2>
    <p>
      We keep your data for as long as your account is active and you're using the service. If you delete your account, we'll remove your personal data within 30 days. Some data may be retained longer if required by law or for legitimate business purposes (like resolving disputes or enforcing our terms).
    </p>

    <h2>Your rights</h2>
    <p>
      You can request access to, correction of, or deletion of your personal data at any time. Just email us at <a href="mailto:privacy@approvr.com">privacy@approvr.com</a> and we'll respond within 30 days.
    </p>
    <p>
      If you're in the EU/EEA or another jurisdiction with specific data protection rights, we'll honor the applicable requirements under your local law.
    </p>

    <h2>Cookies and tracking</h2>
    <p>
      Approvr uses only strictly necessary cookies — the kind that keep you logged in and make the app work. We don't use marketing cookies, advertising trackers, or third-party analytics cookies at this stage.
    </p>
    <p>
      If we ever introduce non-essential cookies (like analytics), we'll update this policy and give you a clear way to opt in or out before they're activated.
    </p>

    <h2>Policy updates</h2>
    <p>
      We may update this policy from time to time. If we make material changes, we'll notify you via email or a notice within the app. Continued use of Approvr after an update means you accept the revised policy.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about this policy or your data? Reach us at <a href="mailto:privacy@approvr.com">privacy@approvr.com</a>.
    </p>
  </LegalPageLayout>
);

export default Privacy;
