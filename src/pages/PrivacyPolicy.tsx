import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy of MasterClean — how we collect, use, and protect your personal data."
        canonical="/privacy-policy"
      />
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm mb-8">Last updated: 07/03/2026</p>

          <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 space-y-6">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">1. Introduction</h2>
              <p>Welcome to MasterClean 1885.</p>
              <p>We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
              <p>If you have any questions about this policy, you can contact us at <a href="mailto:sairus454@gmail.com" className="text-primary hover:underline">sairus454@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <h3 className="font-semibold text-foreground mt-4">Personal Information</h3>
              <p>Information you provide directly, such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Account information</li>
                <li>Payment information (if applicable)</li>
              </ul>
              <h3 className="font-semibold text-foreground mt-4">Usage Data</h3>
              <p>We may automatically collect certain information when you use the website, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Time spent on pages</li>
              </ul>
              <h3 className="font-semibold text-foreground mt-4">Cookies and Tracking Technologies</h3>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remember user preferences</li>
                <li>Analyze traffic</li>
                <li>Improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use collected data to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and operate our service</li>
                <li>Improve website functionality</li>
                <li>Communicate with users</li>
                <li>Process transactions</li>
                <li>Analyze usage and performance</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">4. AI Processing</h2>
              <p>Our service may use artificial intelligence technologies to process user inputs in order to provide requested features or functionality.</p>
              <p>User-provided content may be processed automatically to generate results, improve service performance, and enhance user experience.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">5. Sharing of Information</h2>
              <p>We do not sell your personal information.</p>
              <p>We may share information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service providers (hosting, analytics, payments)</li>
                <li>Legal authorities when required by law</li>
                <li>Partners necessary to operate the service</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">6. Data Storage and Security</h2>
              <p>We take reasonable technical and organizational measures to protect your data from unauthorized access, disclosure, or loss.</p>
              <p>However, no method of transmission over the Internet is completely secure.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">7. Data Retention</h2>
              <p>We retain personal data only as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide the service</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">8. Your Rights (GDPR)</h2>
              <p>If you are located in the European Economic Area (EEA), you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction</li>
                <li>Request deletion</li>
                <li>Object to processing</li>
                <li>Request data portability</li>
              </ul>
              <p>To exercise these rights, contact us at <a href="mailto:sairus454@gmail.com" className="text-primary hover:underline">sairus454@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">9. Third-Party Services</h2>
              <p>Our website may use third-party services such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Analytics providers</li>
                <li>Payment processors</li>
                <li>Hosting providers</li>
              </ul>
              <p>These services may collect information according to their own privacy policies.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">10. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time.</p>
              <p>Changes will be posted on this page with an updated "Last updated" date.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, contact us:</p>
              <ul className="list-none space-y-1">
                <li><strong>Email:</strong> <a href="mailto:sairus454@gmail.com" className="text-primary hover:underline">sairus454@gmail.com</a></li>
                <li><strong>Company:</strong> MasterClean 1885</li>
                <li><strong>Address:</strong> Wrocław, ul. Trawowa 14</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
