<template>
  <div class="prose dark:prose-invert container my-20">
    <h1>Terms & Conditions</h1>

    <p>
      {{ siteName }} (“us”, “we”, or “our”) operates the {{ domain }} website
      (the “Service”).
    </p>
    <p>
      This page informs you of our policies regarding the collection, use, and
      disclosure of Personal Information when you use our Service.
    </p>
    <p>
      We will not use or share your information with anyone except as described
      in this Privacy Policy.
    </p>

    <h2>Information Collection and Use</h2>
    <p>
      While using our Service, we may ask you to provide certain personally
      identifiable information, which may include:
    </p>
    <ul>
      <li>Name</li>
      <li>Email address</li>
      <li>Telephone number</li>
      <li>Address</li>
    </ul>

    <h2>How Do We Collect Your Data?</h2>
    <p>
      You provide us with most of the data we collect. This may happen when you:
    </p>
    <ul>
      <li>Register online or place an order for our products or services.</li>
      <li>
        Complete a survey or give feedback on message boards or via email.
      </li>
      <li>Use or view our website via your browser’s cookies.</li>
    </ul>
    <p>We may also receive data indirectly from sources like:</p>
    <ul>
      <li>Facebook</li>
      <li>Google</li>
      <li>YouTube advertisements</li>
      <li>Other social media platforms</li>
    </ul>

    <h2>Log Data</h2>
    <p>
      We collect Log Data, which may include your IP address, browser type,
      pages visited, and other statistics.
    </p>

    <h2>How Will We Use Your Data?</h2>
    <p>Our Company collects data to:</p>
    <ul>
      <li>Understand usage of our Service and features.</li>
      <li>Improve our marketing efforts.</li>
      <li>
        Share data with partner companies (with your consent) for marketing
        purposes.
      </li>
    </ul>

    <h2>Data Storage</h2>
    <p>
      We securely store your data in our internal CRM database, accessible only
      to necessary personnel. Contact information is stored indefinitely; other
      data is stored for 180 days or as per third-party retention policies.
    </p>

    <h2>Marketing</h2>
    <p>
      We may send information about products and services we believe may
      interest you. You can opt out at any time by contacting us at privacy @
      {{ domain }}.
    </p>

    <h2>Cookies</h2>
    <p>
      We use cookies to enhance your experience. You can decline cookies through
      your browser settings. Visit allaboutcookies[dot]org for more information.
    </p>

    <h2>Service Providers</h2>
    <p>
      We may employ third-party companies to facilitate our Service. They have
      access to your data only to perform tasks on our behalf and are obligated
      not to disclose or use it otherwise.
    </p>

    <h2>Security</h2>
    <p>
      Your Personal Information's security is important, though no method is
      100% secure. We use commercially acceptable measures to protect your data.
    </p>

    <h2>Links to Other Sites</h2>
    <p>
      Our Service may contain links to external sites. We recommend reviewing
      the Privacy Policy of each third-party site you visit.
    </p>

    <h2>Children’s Privacy</h2>
    <p>
      Our Service is not directed to children under 18. If we discover such
      data, we will delete it immediately.
    </p>

    <h2>Compliance with Laws</h2>
    <p>
      We may disclose your Personal Information if required by law or subpoena.
    </p>

    <h2>Changes to This Privacy Policy</h2>
    <p>
      We may update our Privacy Policy periodically. You are advised to review
      this page for changes.
    </p>

    <h2>Facebook Advertising</h2>
    <p>
      We use Facebook’s custom audiences for targeted ads, following Facebook's
      terms and privacy practices. You can opt out of custom audiences at any
      time.
    </p>

    <h2>Your Data Protection Rights (California and EU)</h2>
    <p>
      If you are a resident of California or the EU, you may request access,
      correction, deletion, or restriction of your data. Contact us to exercise
      these rights.
    </p>

    <h2>Disclaimer and Limitation of Liability</h2>
    <p>
      All content is provided "as-is," and we disclaim all warranties.
      {{ domain }} is not liable for any damages resulting from your use of our
      website.
    </p>

    <h2>Contact Us</h2>
    <p>If you have any questions about these terms, please contact us.</p>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const domain = config.public.domain;
const siteName = config.public.siteName;

useSeoMeta({
  title: 'Terms & Conditions',
  description: 'Rules and guidelines for using this website and its services.'
});
</script>
