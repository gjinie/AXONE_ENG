
import React, { useState } from 'react';
import { UserInfo } from '../types';
import { Briefcase, Building2, Clock, ArrowRight, BrainCircuit, UserCircle, Calendar } from 'lucide-react';

interface SetupFormProps {
  onComplete: (info: UserInfo) => void;
}

const INDUSTRIES = ["IT & Software", "Finance / Fintech", "Manufacturing", "Retail / E-commerce", "Education", "Healthcare", "Media / Content", "Others"];
const JOBS = ["Strategy / Planning", "Engineering", "Marketing / Sales", "Design / Creative", "HR / Management", "R&D", "Data Analysis", "Others"];
const YEARS = ["New (0-1y)", "Junior (2-4y)", "Middle (5-9y)", "Senior (10y+)", "Executive"];
const GENDERS = ["Male", "Female", "Non-binary"];
const BIRTH_YEARS = Array.from({ length: 60 }, (_, i) => (new Date().getFullYear() - 15 - i).toString());

const SetupForm: React.FC<SetupFormProps> = ({ onComplete }) => {
  const [info, setInfo] = useState<UserInfo>({
    industry: '',
    job: '',
    years: '',
    gender: '',
    birthYear: ''
  });

  const isValid = info.industry && info.job && info.years && info.gender && info.birthYear;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onComplete(info);
  };

  const SelectionGroup = ({ label, icon: Icon, options, value, field }: { label: string, icon: any, options: string[], value: string, field: keyof UserInfo }) => (
    <div className="mb-10">
      <label className="flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
        <Icon size={14} className="text-purple-500" />
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setInfo(prev => ({ ...prev, [field]: option }))}
            className={`
              px-4 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 border
              ${value === option 
                ? 'gradient-bg text-white border-transparent shadow-lg shadow-purple-500/20 transform scale-[1.05]' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-purple-500/50 hover:text-white'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-6 text-purple-400">
          <BrainCircuit size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          AX <span className="gradient-text">Competency</span> Diagnosis
        </h1>
        <p className="text-gray-500 text-lg">Pinpoint your current standing in the era of AI Transformation.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-effect p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/10 relative z-10">
        <SelectionGroup label="Industry" icon={Building2} options={INDUSTRIES} value={info.industry} field="industry" />
        <SelectionGroup label="Primary Role" icon={Briefcase} options={JOBS} value={info.job} field="job" />
        <SelectionGroup label="Career Stage" icon={Clock} options={YEARS} value={info.years} field="years" />

        <hr className="border-white/5 mb-10" />

        <div className="grid sm:grid-cols-2 gap-10 mb-12">
           <div>
              <label className="flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                <UserCircle size={14} className="text-purple-500" />
                Gender
              </label>
              <div className="flex gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setInfo(prev => ({ ...prev, gender: g }))}
                    className={`flex-1 py-4 rounded-xl text-[11px] font-bold border transition-all ${
                      info.gender === g 
                      ? 'gradient-bg text-white border-transparent' 
                      : 'bg-white/5 text-gray-400 border-white/10 hover:border-purple-500/50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
           </div>

           <div>
              <label className="flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                <Calendar size={14} className="text-purple-500" />
                Birth Year
              </label>
              <div className="relative">
                <select 
                  value={info.birthYear}
                  onChange={(e) => setInfo(prev => ({ ...prev, birthYear: e.target.value }))}
                  className="w-full appearance-none bg-white/5 border border-white/10 text-white py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer font-bold text-sm"
                >
                  <option value="" className="bg-zinc-900">Select Year</option>
                  {BIRTH_YEARS.map(year => (
                    <option key={year} value={year} className="bg-zinc-900">{year}</option>
                  ))}
                </select>
              </div>
           </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`
            w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all
            ${isValid 
              ? 'gradient-bg text-white shadow-2xl shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]' 
              : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'}
          `}
        >
          Begin Diagnosis
          <ArrowRight size={24} />
        </button>
      </form>
    </div>
  );
};

export default SetupForm;
