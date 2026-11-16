import React from "react";
import { Briefcase, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100/60 dark:bg-[#0a0e16] border-t border-stone-200 dark:border-emerald-500/10 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-brand-600 to-teal-500 text-white p-1.5 rounded-lg shadow-sm shadow-emerald-600/20">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-stone-900 dark:text-white">
              Job<span className="text-brand-600 dark:text-brand-400">Portal</span>
            </span>
            <span className="text-xs text-stone-400 pl-2">| CDAC Full Stack Web Tech</span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <span>Built with React, TypeScript, Tailwind CSS, Node.js & MongoDB</span>
          </div>

          <div className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} JobPortal System. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
