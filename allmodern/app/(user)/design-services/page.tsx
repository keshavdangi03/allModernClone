"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function DesignServicesPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zip: "",
    phone: "",
    projectType: "",
    details: "",
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    { id: "multiple", label: "Multiple rooms or whole home", icon: "🏠" },
    { id: "single", label: "Single room or outdoor space", icon: "🛋️" },
    { id: "one_item", label: "Picking or customizing one item", icon: "🪑" },
    { id: "sample", label: "Sample Request", icon: "🎨" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const selectProjectType = (id: string) => {
    setFormData(prev => ({ ...prev, projectType: id }));
    if (formErrors.projectType) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.projectType;
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: Record<string, string> = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.projectType) errors.projectType = "Please select a project type";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="w-full flex flex-col md:flex-row">
        {/* Left: Blue Banner */}
        <div className="w-full md:w-1/2 bg-[#1c228a] flex flex-col justify-center px-8 sm:px-16 py-20 lg:px-24">
          <p className="text-white text-sm md:text-base font-bold tracking-widest uppercase mb-4">
            Bring Your Modern Style To Life
          </p>
          <h1 className="text-white text-5xl md:text-[70px] lg:text-[90px] font-bold leading-none tracking-tight mb-10">
            Free Design<br/>Services
          </h1>
          <Link href="#form-section" className="inline-flex items-center justify-center bg-white text-slate-950 font-bold px-8 py-4 text-sm md:text-base hover:bg-slate-100 transition w-fit">
            BOOK NOW <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
          <Image 
            src="/images/cat_dining.png" 
            alt="Modern Dining Room" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="relative aspect-square w-full bg-slate-100 flex flex-col justify-between p-6 sm:p-8 group overflow-hidden">
             <Image src="/images/cat_bedroom.png" alt="Share Your Vision" fill className="object-cover transition duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />
             <span className="relative z-10 text-white text-[120px] leading-none font-bold tracking-tighter">1</span>
             <div className="relative z-10 mt-auto">
               <h3 className="text-white text-2xl font-bold mb-2">Share Your Vision</h3>
               <p className="text-white/90 text-[15px]">Let's talk style and project goals — from small updates to a full home makeover.</p>
             </div>
          </div>
          {/* Step 2 */}
          <div className="relative aspect-square w-full bg-slate-100 flex flex-col justify-between p-6 sm:p-8 group overflow-hidden">
             <Image src="/images/hero.png" alt="Collaborate With a Designer" fill className="object-cover transition duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />
             <span className="relative z-10 text-white text-[120px] leading-none font-bold tracking-tighter">2</span>
             <div className="relative z-10 mt-auto">
               <h3 className="text-white text-2xl font-bold mb-2">Collaborate With a Designer</h3>
               <p className="text-white/90 text-[15px]">Connect one-on-one with a pro — virtually or in-store. Your pick.</p>
             </div>
          </div>
          {/* Step 3 */}
          <div className="relative aspect-square w-full bg-slate-100 flex flex-col justify-between p-6 sm:p-8 group overflow-hidden">
             <Image src="/images/cat_living_room.png" alt="See Your Space Come Together" fill className="object-cover transition duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />
             <span className="relative z-10 text-white text-[120px] leading-none font-bold tracking-tighter">3</span>
             <div className="relative z-10 mt-auto">
               <h3 className="text-white text-2xl font-bold mb-2">See Your Space Come Together</h3>
               <p className="text-white/90 text-[15px]">We'll curate mood boards, floor plans, and shopping lists, all for free.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Form Section */}
      <section id="form-section" className="mx-auto max-w-[1000px] px-4 sm:px-6 py-16">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-bold text-slate-950 mb-1 flex items-baseline">
              Let's work together. <span className="text-xs text-slate-500 ml-2 font-normal">Required fields*</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-12 mt-6">
              <div>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="*First Name" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.firstName ? 'border-red-500' : 'border-slate-300'} px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition`}
                />
                {formErrors.firstName && <span className="text-xs text-red-500 mt-1">{formErrors.firstName}</span>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="*Last Name" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.lastName ? 'border-red-500' : 'border-slate-300'} px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition`}
                />
                {formErrors.lastName && <span className="text-xs text-red-500 mt-1">{formErrors.lastName}</span>}
              </div>
              <div>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="*Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-slate-300'} px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition`}
                />
                {formErrors.email && <span className="text-xs text-red-500 mt-1">{formErrors.email}</span>}
              </div>
              <div>
                <input 
                  type="text" 
                  name="zip" 
                  placeholder="Zip" 
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition"
                />
              </div>
              <div className="sm:col-span-2">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="*Phone Number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-slate-300'} px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition`}
                />
                {formErrors.phone && <span className="text-xs text-red-500 mt-1">{formErrors.phone}</span>}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-950 mb-6">Tell us a little about your project.</h2>
            <p className="text-sm text-slate-900 mb-4">*Select your project type.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {projectTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => selectProjectType(type.id)}
                  className={`border cursor-pointer transition flex flex-col items-center justify-center p-6 text-center aspect-square ${
                    formData.projectType === type.id 
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' 
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <span className="text-4xl mb-4 grayscale opacity-80">{type.icon}</span>
                  <span className="text-[13px] font-medium text-slate-900">{type.label}</span>
                </div>
              ))}
            </div>
            {formErrors.projectType && <p className="text-xs text-red-500 mb-4 -mt-4">{formErrors.projectType}</p>}

            <p className="text-sm text-slate-900 mb-4">Give us a few more details — we'll do the rest.</p>
            <textarea 
              name="details"
              placeholder="*Additional Project Details"
              rows={4}
              value={formData.details}
              onChange={handleInputChange}
              className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-slate-900 transition mb-8 resize-y"
            />

            <div className="flex justify-center">
              <button 
                type="submit" 
                className="bg-slate-900 text-white font-bold px-12 py-3 text-sm hover:bg-slate-800 transition"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full bg-[#f6f4f0] p-12 flex flex-col items-center text-center border border-slate-200">
            <div className="w-16 h-16 bg-[#1c228a] rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-950 mb-2">Thank you!</h2>
            <p className="text-lg text-slate-700">
              We've received your request. A designer will be in touch with you shortly.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-sm font-bold underline hover:text-slate-600"
            >
              Submit another request
            </button>
          </div>
        )}
      </section>

      {/* 4. Showcase Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-16">Get Your Picks in Days, Not Weeks*</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl font-bold text-slate-950 mb-4">From Mood Board to Real Life</h3>
            <p className="text-slate-900 text-lg">Our experts will create a personalized design for your home.</p>
          </div>
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-square w-full bg-[#f6f4f0] p-8 flex items-center justify-center">
               <Image src="/images/cat_dining.png" alt="Mood Board" fill className="object-contain p-8 mix-blend-multiply" />
            </div>
            <div className="relative aspect-square w-full">
               <Image src="/images/cat_living_room.png" alt="Real Life Room" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Banner 1 */}
      <section className="w-full bg-[#1c228a] py-8 sm:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-tight">
            Start Your Free Design
          </h2>
          <Link href="#form-section" className="inline-flex items-center justify-center bg-white text-slate-950 font-bold px-8 py-3 text-sm md:text-base hover:bg-slate-100 transition shrink-0">
            BOOK NOW <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 6. Testimonial Section */}
      <section className="w-full flex flex-col md:flex-row">
        {/* Left: Blue Testimonial */}
        <div className="w-full md:w-1/2 bg-[#1c228a] flex flex-col justify-center px-8 sm:px-16 py-24 lg:px-24">
          <span className="text-[100px] text-[#2c34a8] leading-none font-serif -mb-10">"</span>
          <h2 className="text-white text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight tracking-tight mb-12 relative z-10">
            The spaces are turning out just as beautiful in real life as they did in Amanda's renderings.
          </h2>
          <p className="text-white text-sm md:text-base font-bold tracking-widest uppercase">
            — ZENOBIA | AM DESIGN SERVICES CUSTOMER
          </p>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
          <Image 
            src="/images/cat_bedroom.png" 
            alt="Customer Design Result" 
            fill 
            className="object-cover"
          />
        </div>
      </section>

      {/* 7. Banner 2 */}
      <section className="w-full bg-[#1c228a] py-8 sm:py-12 border-t border-[#2c34a8]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-tight">
            Free Design Services
          </h2>
          <Link href="#form-section" className="inline-flex items-center justify-center bg-white text-slate-950 font-bold px-8 py-3 text-sm md:text-base hover:bg-slate-100 transition shrink-0">
            BOOK NOW <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
      
    </main>
  );
}
