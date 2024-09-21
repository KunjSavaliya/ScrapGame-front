'use client'; 
import React, { Suspense } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

function Privacy() { 
  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-full max-w-screen-lg">
        <h1 className='text-2xl mt-2 text-[#69a2ff] mb-2'>Privacy</h1>
        <hr className="w-full border-gray-300 border-t-1" />
        <div className="mt-2">
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-2">
          At onlinegameforyou, we take your privacy seriously and are committed to protecting your personal information while providing a seamless and engaging gaming experience. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
          We collect both personal and non-personal information to enhance your experience. Personal information may include your name, email address, and user preferences, collected when you register or interact with features on our website. Non-personal information, such as IP addresses, browser types, and usage data, is gathered automatically to help us understand how users engage with our platform.
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
          We use the information collected to:
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
          &bull; Personalize your gaming experience by tailoring content and recommendations to your preferences.
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
          &bull;Send important updates, promotional offers, and notifications that might interest you.
            </h2>
            
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
          &bull;Monitor site performance, improve our services, and ensure smooth functionality.
          </h2>
         
         <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
        &bull; Provide customer support and address your inquiries in a timely manner.
        </h2>    
        <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
        Our website is not intended for children under the age of 13. We do not knowingly collect personal information from minors. If we become aware that a child has provided us with personal data, we will take steps to delete such information.
        </h2>   <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
        You have the right to review, update, or request the deletion of your personal information at any time. Simply contact us, and we will respond to your request as quickly as possible. Additionally, you may opt-out of receiving marketing communications by following the instructions in the emails we send or by contacting us directly.
        </h2>
        <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
        We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Any significant updates will be communicated to users through email notifications or site announcements. Continued use of the website after changes implies your acceptance of the revised policy.
          </h2>
          <h2 className="font-light text-[#696969] flex items-center gap-2 text-sm md:text-base mt-4">
          Our website may contain links to third-party websites or services. Please note that we are not responsible for the privacy practices of these external platforms. We encourage you to review their privacy policies before sharing any personal information.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function GameDescription() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <AiOutlineLoading className="text-4xl animate-spin" />
        </div>
      }
    >
      <Privacy />
    </Suspense>
  );
}
