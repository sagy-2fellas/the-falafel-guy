import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <Link to={createPageUrl('Home')}>
          <Button
            variant="outline"
            className="mb-8 border-2 text-white font-semibold px-6 py-3 text-sm rounded-none transition-all duration-300"
            style={{ borderColor: '#F8D09F', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8D09F';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center border-2" style={{ background: 'linear-gradient(to bottom right, #F8D09F20, #F8D09F05)', borderColor: '#F8D09F50' }}>
            <Shield className="w-8 h-8" style={{ color: '#F8D09F' }} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-4">
            PRIVACY <span className="font-bold" style={{ color: '#F8D09F' }}>POLICY</span>
          </h1>
          <p className="text-white/60 text-lg">
            Protection of Personal Information Act (POPIA) Compliance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black border-2 rounded-lg p-8 space-y-8"
          style={{ borderColor: '#F8D09F30' }}
        >
          <div>
            <p className="text-white/80 text-base leading-relaxed mb-4">
              <strong style={{ color: '#F8D09F' }}>Last Updated:</strong> January 2025
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              The Falafel Guy ("we", "us", or "our") is committed to protecting your personal information in accordance with the Protection of Personal Information Act, 2013 (POPIA). This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              1. Information We Collect
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-3">
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside text-white/80 text-base leading-relaxed space-y-2 ml-4">
              <li>Name and contact details (email, phone number)</li>
              <li>Delivery address for online orders</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Order history and preferences</li>
              <li>Loyalty program information</li>
              <li>Communications with our customer service team</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              2. How We Use Your Information
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-3">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-white/80 text-base leading-relaxed space-y-2 ml-4">
              <li>Processing and fulfilling your orders</li>
              <li>Communicating with you about your orders and our services</li>
              <li>Managing your loyalty program account</li>
              <li>Improving our products and services</li>
              <li>Sending promotional communications (with your consent)</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              3. Legal Basis for Processing
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              We process your personal information based on:
            </p>
            <ul className="list-disc list-inside text-white/80 text-base leading-relaxed space-y-2 ml-4">
              <li><strong>Consent:</strong> You have given clear consent for us to process your personal information for specific purposes</li>
              <li><strong>Contract:</strong> Processing is necessary for the performance of a contract with you</li>
              <li><strong>Legal obligation:</strong> Processing is necessary for compliance with a legal obligation</li>
              <li><strong>Legitimate interests:</strong> Processing is necessary for our legitimate interests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              4. Information Sharing and Disclosure
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-3">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-white/80 text-base leading-relaxed space-y-2 ml-4">
              <li>Service providers who assist in operating our business (e.g., payment processors, delivery services)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
            <p className="text-white/80 text-base leading-relaxed mt-3">
              We will never sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              5. Data Security
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and access controls.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              6. Your Rights Under POPIA
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-white/80 text-base leading-relaxed space-y-2 ml-4">
              <li><strong>Right to Access:</strong> Request access to your personal information</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Right to Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Object:</strong> Object to the processing of your personal information</li>
              <li><strong>Right to Restrict Processing:</strong> Request restriction of processing</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              7. Data Retention
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              9. Children's Privacy
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              11. Contact Information
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-3">
              If you have any questions about this Privacy Policy or wish to exercise your rights under POPIA, please contact us:
            </p>
            <div className="bg-black/50 border rounded-lg p-6" style={{ borderColor: '#F8D09F30' }}>
              <p className="text-white/80 text-base leading-relaxed">
                <strong style={{ color: '#F8D09F' }}>The Falafel Guy</strong><br />
                152 Main Road, Sea Point<br />
                Cape Town, 8005<br />
                South Africa<br />
                <br />
                <strong style={{ color: '#F8D09F' }}>Email:</strong> hello@thefalafelguy.co.za<br />
                <strong style={{ color: '#F8D09F' }}>Phone:</strong> 021 015 0090
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#F8D09F' }}>
              12. Information Regulator
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-3">
              If you believe we have not handled your personal information appropriately, you have the right to lodge a complaint with the Information Regulator:
            </p>
            <div className="bg-black/50 border rounded-lg p-6" style={{ borderColor: '#F8D09F30' }}>
              <p className="text-white/80 text-base leading-relaxed">
                <strong style={{ color: '#F8D09F' }}>Information Regulator (South Africa)</strong><br />
                JD House, 27 Stiemens Street<br />
                Braamfontein, Johannesburg, 2001<br />
                <br />
                <strong style={{ color: '#F8D09F' }}>Email:</strong> inforeg@justice.gov.za<br />
                <strong style={{ color: '#F8D09F' }}>Website:</strong> www.justice.gov.za/inforeg
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Home')}>
            <Button
              variant="outline"
              className="border-2 text-white font-semibold px-8 py-4 text-base rounded-none transition-all duration-300"
              style={{ borderColor: '#F8D09F', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8D09F';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}