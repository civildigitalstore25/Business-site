"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLink } from "@/components/common/SectionLink";
import { ArrowRight, CheckCircle2, ExternalLink, Globe, Sparkles, Layers } from "lucide-react";
import { PROJECTS, ROUTES, ProjectItem } from "@/lib/constants";
import { MotionSection } from "@/components/common/MotionSection";

export function HomeProjectSection() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  const activeProject: ProjectItem =
    PROJECTS.find((p) => p.id === activeId) || PROJECTS[0];

  return (
    <section className="scroll-mt-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-20 lg:py-24" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky/10 border border-sky/20 text-sky text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles size={13} className="shrink-0" />
            <span>Our Work & Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-3 sm:mb-4">
            Projects We&apos;ve Delivered
          </h2>
          <p className="text-xs sm:text-base lg:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Explore live e-commerce stores, specialized marketplaces, and custom web platforms engineered by Tomscope for growing businesses.
          </p>
        </MotionSection>

        {/* Project Selector Tabs - Horizontal Scrollable on Mobile */}
        <MotionSection delay={0.1} className="mb-8 sm:mb-10">
          <div className="relative">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory px-1">
              {PROJECTS.map((project) => {
                const isActive = project.id === activeId;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    className={`snap-center shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                      isActive
                        ? "bg-navy text-white border-navy shadow-md scale-[1.02]"
                        : "bg-white text-[#475569] border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isActive ? "bg-sky" : "bg-slate-300"
                      }`}
                    />
                    <span className="truncate">{project.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </MotionSection>

        {/* Spotlight Main Showcase */}
        <MotionSection delay={0.2} className="mb-10 sm:mb-14">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden grid lg:grid-cols-12 gap-0 transition-all duration-300">
            {/* Left: Browser Window Screenshot Showcase */}
            <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between overflow-hidden group">
              {/* Browser Header Bar */}
              <div className="bg-slate-900/90 px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-slate-800 flex items-center justify-between shrink-0 gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-slate-950/80 text-slate-400 text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-md flex items-center gap-1.5 max-w-[170px] xs:max-w-[230px] sm:max-w-xs truncate border border-slate-800">
                  <Globe size={11} className="text-sky shrink-0" />
                  <span className="truncate">{activeProject.projectUrl}</span>
                </div>
                <Link
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  aria-label={`Open ${activeProject.name} live site`}
                >
                  <ExternalLink size={14} className="sm:w-[15px] sm:h-[15px]" />
                </Link>
              </div>

              {/* Screenshot Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-video lg:aspect-auto lg:h-[440px] w-full overflow-hidden bg-slate-950">
                <Image
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                  <Link
                    href={activeProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky text-white text-xs font-bold shadow-lg hover:bg-sky-dark transition-colors"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="lg:col-span-5 p-5 sm:p-7 lg:p-9 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-sky/10 text-sky border border-sky/20">
                    {activeProject.category}
                  </span>
                  <Link
                    href={activeProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky hover:text-navy transition-colors shrink-0"
                  >
                    <span>Live Site</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-2 sm:mb-3 tracking-tight">
                  {activeProject.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {activeProject.description}
                </p>

                <div className="mb-5 sm:mb-6">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Key Features & Deliverables
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5">
                    {activeProject.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={15} className="text-sky shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons - Full Width on Mobile */}
              <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <Link
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl bg-sky hover:bg-sky-dark text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-md shadow-sky/20 transition-all hover:gap-3"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={14} />
                </Link>
                <SectionLink
                  href={ROUTES.consultation}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Request Similar Project</span>
                  <ArrowRight size={13} />
                </SectionLink>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* All Projects Cards Grid */}
        <MotionSection delay={0.3}>
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-sky" />
              <h3 className="text-base sm:text-lg font-bold text-navy">All Live Projects</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden xs:inline">Tap card to focus</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {PROJECTS.map((project) => {
              const isSelected = project.id === activeId;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`cursor-pointer group bg-white rounded-xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "border-sky ring-2 ring-sky/30 shadow-md scale-[1.01] bg-sky/[0.02]"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div>
                    {/* Card Thumbnail */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-navy/85 backdrop-blur-md text-white border border-white/10">
                          {project.category.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-5">
                      <h4 className="text-xs sm:text-base font-bold text-navy group-hover:text-sky transition-colors mb-1 sm:mb-1.5 truncate">
                        {project.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-1 sm:mb-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-3 sm:px-5 pb-3 sm:pb-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-sky" : "text-slate-400 group-hover:text-navy"}`}>
                      {isSelected ? "Featured Now" : "Showcase"}
                    </span>
                    <Link
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded-md text-slate-400 hover:text-sky hover:bg-sky/10 transition-colors"
                      title={`Visit ${project.name} live site`}
                    >
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
