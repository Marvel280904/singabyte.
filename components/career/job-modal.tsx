"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Job } from "@/config/jobs-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface JobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobModal({ job, isOpen, onClose }: JobModalProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    linkedin: "",
    salary: "",
    experience: "",
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error sebelum validasi
    setErrorMessage(""); 

    // Cek Experience Selection
    if (!formData.experience) {
        setStatus('error');
        setErrorMessage("Please select your experience");
        return; // Hentikan proses jika kosong
    }

    // Validasi Resume (Optional: biar konsisten)
    if (!resumeFile) {
        setStatus('error');
        setErrorMessage("Please upload your resume");
        return;
    }

    setStatus('submitting');

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("location", formData.location);
    data.append("linkedin", formData.linkedin);
    data.append("salary", formData.salary);
    data.append("experience", formData.experience);
    data.append("jobTitle", job.title);
    data.append("resume", resumeFile);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage("Failed to send. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const experienceOptions = [
    { value: "< 1 year", label: "Less than 1 year" },
    { value: "1 - 2 years", label: "1 - 2 years" },
    { value: "3 - 4 years", label: "3 - 4 years" },
    { value: "> 5 years", label: "More than 5 years" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content Wrapper */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-7xl h-[85vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* GLOBAL CLOSE BUTTON (Floating) */}
            <div className="absolute top-4 right-4 z-20 xl:hidden">
                <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-white shadow-lg border border-zinc-700">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* LAYOUT CONTAINER */}
            <div className="h-full w-full overflow-y-auto xl:overflow-hidden flex flex-col xl:flex-row custom-scrollbar">
              
              {/* --- LEFT SIDE: Job Details --- */}
              <div className="w-full bg-zinc-900/20 p-3 pt-14 xl:pt-10 xl:p-10 border-b border-zinc-800 xl:border-b-0 xl:border-r xl:flex-1 xl:h-full xl:overflow-y-auto custom-scrollbar">
                 {/* Header Job */}
                 <div className="mb-8">
                    <span className="text-blue-500 text-xs font-mono uppercase tracking-widest mb-2 block">
                        [{job.type}] &nbsp;•&nbsp; [{job.location}]
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{job.title}</h2>
                    <p className="text-zinc-500 text-sm font-mono mb-4">Stack: {job.stack}</p>
                 </div>

                 {/* Sections */}
                 <div className="space-y-8 text-zinc-300 leading-relaxed">
                    {/* About Company */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2 border-l-2 border-blue-500 pl-3">About Company</h3>
                        <p className="text-sm md:text-base text-zinc-400">
                            Singabyte is a forward-thinking software house dedicated to building scalable and innovative digital solutions. We believe in code quality, user-centric design, and fostering a culture of continuous learning.
                        </p>
                    </div>

                    {/* About Role */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2 border-l-2 border-blue-500 pl-3">About the role</h3>
                        <p className="text-sm md:text-base text-zinc-400">{job.about_role}</p>
                    </div>

                    {/* To Do */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2 border-l-2 border-blue-500 pl-3">What you'll do</h3>
                        <ul className="list-disc list-outside ml-5 space-y-1 text-sm md:text-base text-zinc-400">
                            {job.to_do?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Qualifications */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2 border-l-2 border-blue-500 pl-3">Qualifications</h3>
                        <ul className="list-disc list-outside ml-5 space-y-1 text-sm md:text-base text-zinc-400">
                            {job.qualifications?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                     {/* Offer */}
                     <div>
                        <h3 className="text-lg font-bold text-white mb-2 border-l-2 border-blue-500 pl-3">What we can offer</h3>
                        <ul className="list-disc list-outside ml-5 space-y-1 text-sm md:text-base text-zinc-400">
                            {job.offer?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                 </div>
              </div>

              {/* --- RIGHT SIDE: Application Form --- */}
              <div className="w-full xl:w-[500px] bg-zinc-950 xl:h-full xl:flex xl:flex-col border-t border-zinc-800 xl:border-t-0">
                  
                  {/* Header Form */}
                  <div className="flex justify-between items-center p-3 xl:p-6 mt-6 xl:mt-0 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-10">
                      <h3 className="font-bold text-white text-2xl">Apply for this position</h3>
                      
                      {/* Close Button Internal - Hanya muncul di XL (Desktop) */}
                      <button onClick={onClose} className="hidden xl:block text-white hover:text-blue-500 transition-colors">
                          <X className="w-6 h-6" />
                      </button>
                  </div>

                  {/* Form Container */}
                  <div className="p-3 xl:p-6 xl:flex-1 xl:overflow-y-auto custom-scrollbar">
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {status === 'success' ? (
                             <div className="flex flex-col items-center justify-center h-full py-10 space-y-4 text-center">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-white">Application Sent!</h4>
                                <p className="text-zinc-400 text-sm">Thank you for applying. We will review your application and get back to you shortly.</p>
                                <Button type="button" variant="primary" onClick={onClose} className="mt-4">close window</Button>
                             </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase text-white">Full Name</label>
                                    <Input required placeholder="ex. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase text-white">Email Address</label>
                                    <Input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase text-white">Current Location</label>
                                    <Input required placeholder="ex. Jakarta, Indonesia" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="mt-1" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase text-white">LinkedIn Profile</label>
                                    <Input required placeholder="linkedin.com/in/johndoe" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="mt-1" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase text-white">Experience</label>
                                    <Select 
                                        options={experienceOptions} 
                                        value={formData.experience} 
                                        onChange={(val) => setFormData({...formData, experience: val})}
                                        placeholder="Select experience..."
                                        className="mt-1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase text-white">Salary Expectation ($)</label>
                                    <Input required placeholder="ex. $4000" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="mt-1" />
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-xs uppercase text-white mb-2 block">Resume / CV (PDF)</label>
                                    <div className="relative border-2 border-dashed border-blue/30 hover:border-blue rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer bg-zinc-900/50 group">
                                        <input 
                                            type="file" 
                                            accept=".pdf" 
                                            required
                                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <UploadCloud className="w-8 h-8 text-zinc-600 group-hover:text-blue mb-2 transition-colors" />
                                        <p className="text-sm text-zinc-400 text-center">
                                            {resumeFile ? (
                                                <span className="text-blue-400 font-medium">{resumeFile.name}</span>
                                            ) : (
                                                "Click to upload or drag and drop"
                                            )}
                                        </p>
                                        <p className="text-xs text-zinc-600 mt-1">PDF max 5MB</p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 pb-4">
                                    <Button 
                                        type="submit" 
                                        disabled={status === 'submitting'}
                                        variant="primary" 
                                        className="w-full font-bold"
                                    >
                                        {status === 'submitting' ? (
                                            <span className="flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> submitting...</span>
                                        ) : "submit application"}
                                    </Button>
                                    {status === 'error' && (
                                        <p className="text-red-500 text-xs text-center mt-2 flex items-center justify-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> 
                                            {errorMessage || "Failed to send. Please try again."}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                      </form>
                  </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}