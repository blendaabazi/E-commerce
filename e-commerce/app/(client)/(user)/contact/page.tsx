// app/contact/page.tsx

"use client";

import FooterTop from "@/components/FooterTop";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto space-y-12">

      {/* Forma e kontaktit */}
      <div className="mt-10">
        <ContactForm />
      </div>

    
    </div>
  );
}
