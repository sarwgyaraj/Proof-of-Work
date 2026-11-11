import React from 'react';
import {
  Code2,
  Sparkles,
  Palette,
  Server,
  Wrench,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';

// Default skills matrix structured exactly as requested in the reference image
export const DEFAULT_SKILL_CATEGORIES = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code2,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    skills: [
      { name: 'Python', percentage: 90 },
      { name: 'JavaScript', percentage: 85 },
      { name: 'React', percentage: 88 },
      { name: 'TypeScript', percentage: 82 }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    icon: Sparkles,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    skills: [
      { name: 'Agentic AI', percentage: 92 },
      { name: 'LLMs', percentage: 88 },
      { name: 'AI Agent Development', percentage: 90 },
      { name: 'Prompt Engineering', percentage: 85 }
    ]
  },
  {
    id: 'design',
    title: 'Design',
    icon: Palette,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    skills: [
      { name: 'UX/UI Design', percentage: 87 },
      { name: 'Figma', percentage: 83 },
      { name: 'User Research', percentage: 85 },
      { name: 'Prototyping', percentage: 86 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    skills: [
      { name: 'FastAPI', percentage: 88 },
      { name: 'API Integration', percentage: 90 },
      { name: 'Database Design', percentage: 82 },
      { name: 'Postman / REST', percentage: 80 }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    skills: [
      { name: 'Git & GitHub', percentage: 89 },
      { name: 'VS Code', percentage: 92 },
      { name: 'Docker', percentage: 78 },
      { name: 'Vercel', percentage: 85 }
    ]
  }
];

export default function SkillCategoriesGrid({
  categories = DEFAULT_SKILL_CATEGORIES,
  title = 'Verified Skills Breakdown',
  subtitle = 'Demonstrated ability & verified code benchmark proficiency by category'
}) {
  const displayCategories = categories && categories.length > 0 ? categories : DEFAULT_SKILL_CATEGORIES;

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 self-start sm:self-auto">
            ● Verified Multi-Domain Matrix
          </span>
        </div>
      )}

      {/* Grid of skill category cards matching the 3+2 layout from the reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayCategories.map((cat) => {
          const IconComponent = cat.icon || Code2;
          return (
            <div
              key={cat.id || cat.title}
              className="p-5 rounded-2xl bg-navy-950/90 border border-slate-800/90 hover:border-slate-700/80 transition-all shadow-sm flex flex-col justify-between space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${cat.iconBg || 'bg-teal-500/10 border-teal-500/20 text-teal-400'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
                  {cat.title}
                </h4>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-3 pt-1">
                {cat.skills?.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium text-[13px]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-slate-400 text-xs font-semibold">
                        {skill.percentage}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-slate-900/90 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                      <div
                        className="h-full bg-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

