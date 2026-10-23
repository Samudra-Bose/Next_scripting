import Link from "next/link"
import { ArrowRight, ArrowLeft, Terminal } from "lucide-react"

export const metadata = {
  title: "ENGINEERING NOTES // PrintForge Labs",
  description: "Technical articles on 3D slicing, CoreXY kinematics, tolerance engineering, and materials science.",
}

type Post = {
  id: number
  title: string
  body: string
  date: string
  tag: string
  readTime: string
}

const ARTICLES: Post[] = [
  {
    id: 1,
    title: "CALIBRATING COREXY ACCELERATION BEYOND 20,000 MM/S²",
    body: "An empirical deep dive into input shaping, eddy current bed probes, and resonance dampening algorithms to achieve zero ghosting at hyper speeds.",
    date: "OCTOBER 2026",
    tag: "KINEMATICS",
    readTime: "6 MIN READ",
  },
  {
    id: 2,
    title: "PRINT-IN-PLACE ARTICULATION: CLEARANCE & SHRINKAGE TOLERANCE",
    body: "How to design ball-and-socket and captive hinge joints with calibrated 0.25mm air gaps, compensating for polymer thermal shrinkage.",
    date: "SEPTEMBER 2026",
    tag: "CAD DESIGN",
    readTime: "8 MIN READ",
  },
  {
    id: 3,
    title: "SUB-20-MICRON RESIN POST-PROCESSING PROTOCOL",
    body: "Optimizing 2-stage isopropyl alcohol washing cycles, ultrasonic agitation times, and UV-wavelength curing chambers for maximum dimensional accuracy.",
    date: "AUGUST 2026",
    tag: "MATERIALS",
    readTime: "5 MIN READ",
  },
  {
    id: 4,
    title: "VOLUMETRIC FLOW LIMITS: HARDENED STEEL VS CHT NOZZLES",
    body: "Benchmarking max volumetric melt rate (mm³/s) of high-flow tungsten carbide and nickel-plated copper hotends under high-viscosity PETG-CF load.",
    date: "JULY 2026",
    tag: "HARDWARE",
    readTime: "7 MIN READ",
  },
]

export default async function PostPage() {
  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between hud-border-b pb-4 text-xs font-mono-tech uppercase text-neutral-500">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CORE LAB</span>
          </Link>
          <span>TECHNICAL DISPATCH ARCHIVE</span>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>LAB DISPATCHES & RESEARCH PAPERS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-condensed tracking-tight uppercase leading-[0.9] text-neutral-900 dark:text-neutral-100">
            ENGINEERING LOGS & FABRICATION PROTOCOLS
          </h1>
          <p className="text-xs md:text-sm font-mono-tech text-neutral-600 dark:text-neutral-400">
            Field-tested whitepapers, slicing optimization guides, and hardware tuning benchmarks.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="p-6 md:p-8 rounded-2xl glass-panel hud-border hover:border-black dark:hover:border-white transition-all space-y-4 group shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="px-2.5 py-1 rounded-full bg-[#ff1a75]/15 uppercase tracking-wider text-[#ff1a75] dark:text-[#ff2a80] font-bold border border-[#ff1a75]/30">
                  {article.tag}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 font-medium flex items-center gap-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black font-condensed tracking-tight uppercase text-neutral-950 dark:text-neutral-50 group-hover:text-[#ff1a75] dark:group-hover:text-[#ff2a80] transition-colors">
                {article.title}
              </h2>

              <p className="text-xs md:text-sm font-mono-tech text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                {article.body}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs font-mono-tech text-neutral-500">
                <span>DOCUMENT #PF-ENG-0{article.id}</span>
                <span className="flex items-center gap-1 font-bold text-neutral-900 dark:text-neutral-100 group-hover:translate-x-1 transition-transform">
                  READ LOG
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
