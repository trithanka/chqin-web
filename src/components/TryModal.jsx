import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowRight, BedDouble, BedSingle, Building, Building2, Dumbbell, Ellipsis, Factory,
  Flower2, GraduationCap, Home, Hospital, Info, Landmark, ShoppingBag,
  Ticket, TrainFront, Trees, Trophy, UtensilsCrossed, X,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const PILOT_URL = "https://business.chqin.in/";

const CATEGORIES = [
  { name: "Hotels & Resorts", icon: BedDouble, img: "/mosaic/env-01.webp", live: true },
  { name: "Guest Houses & Homestays", icon: Home, img: "/mosaic/cat-guesthouse.webp" },
  { name: "Hostels, PGs & Coliving", icon: BedSingle, img: "/mosaic/cat-hostel.webp" },
  { name: "Apartments & Residential", icon: Building2, img: "/mosaic/env-02.webp" },
  { name: "Offices & Business Parks", icon: Building, img: "/mosaic/cat-office.webp" },
  { name: "Shopping Malls", icon: ShoppingBag, img: "/mosaic/env-06.webp" },
  { name: "Restaurants & Cafés", icon: UtensilsCrossed, img: "/mosaic/cat-restaurant.webp" },
  { name: "Events & Exhibitions", icon: Ticket, img: "/mosaic/env-10.webp" },
  { name: "Stadiums & Entertainment", icon: Trophy, img: "/mosaic/env-05.webp" },
  { name: "Schools & Educational", icon: GraduationCap, img: "/mosaic/cat-school.webp" },
  { name: "Hospitals & Clinics", icon: Hospital, img: "/mosaic/env-09.webp" },
  { name: "Temples & Religious Places", icon: Flower2, img: "/mosaic/env-04.webp" },
  { name: "Transport & Stations", icon: TrainFront, img: "/mosaic/env-08.webp" },
  { name: "Parks & Attractions", icon: Trees, img: "/mosaic/cat-park.webp" },
  { name: "Factories & Industrial Sites", icon: Factory, img: "/mosaic/cat-factory.webp" },
  { name: "Banks & Financial", icon: Landmark, img: "/mosaic/cat-bank.webp" },
  { name: "Gyms & Fitness Centres", icon: Dumbbell, img: "/mosaic/cat-gym.webp" },
  { name: "Other Places", icon: Ellipsis, img: "/mosaic/env-11.webp" },
];

function Card({ name, icon: Icon, img, live, index }) {
  const Tag = live ? motion.a : motion.div;
  const linkProps = live
    ? { href: PILOT_URL, target: "_blank", rel: "noopener noreferrer", "aria-label": `${name} — start a pilot (opens in new tab)` }
    : { role: "listitem", "aria-label": `${name} — coming soon` };
  return (
    <Tag
      {...linkProps}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.12 + index * 0.025 }}
      className={`group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-[#0d1522] outline-none transition-[border-color,box-shadow,transform] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12] ${
        live
          ? "border-[var(--brand)] shadow-[0_0_30px_-4px_rgb(var(--brand-rgb)/0.6)] hover:-translate-y-1 hover:shadow-[0_0_40px_-2px_rgb(var(--brand-rgb)/0.75)]"
          : "cursor-default border-white/10 hover:border-white/20"
      }`}
    >
      <div className="relative h-24 overflow-hidden bg-[#131c2b] sm:h-28 lg:h-auto lg:min-h-0 lg:flex-1">
        <img
          src={img}
          alt=""
          decoding="async"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-700 group-hover:scale-105 ${
            live ? "" : "scale-105 blur-[1px] saturate-[0.5] group-hover:blur-0 group-hover:saturate-100"
          }`}
        />
        {!live && <div className="absolute inset-0 bg-[#0b1220]/45 transition-opacity duration-500 group-hover:opacity-0" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1522] from-5% via-[#0d1522]/40 via-40% to-transparent" />
        {live && (
          <span className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        )}
      </div>
      <div className="relative -mt-6 flex flex-1 flex-col gap-2 px-3 pb-3 lg:flex-none lg:gap-1.5 lg:pb-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0d1522]/90 text-white backdrop-blur lg:h-9 lg:w-9">
          <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="line-clamp-2 text-sm font-semibold leading-tight text-white">{name}</span>
        {live ? (
          <span className="mt-auto flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Pilot available
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-dark)] text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </span>
        ) : (
          <span className="mt-auto w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white/60">
            Coming soon
          </span>
        )}
      </div>
    </Tag>
  );
}

export default function TryModal({ open, onOpenChange }) {
  return (
    <MotionConfig reducedMotion="user">
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <AnimatePresence>
          {open && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay forceMount asChild>
                <motion.div
                  data-lenis-prevent
                  className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </DialogPrimitive.Overlay>
              <div className="pointer-events-none fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4">
                <DialogPrimitive.Content forceMount asChild>
                  <motion.div
                    data-testid="try-modal"
                    data-lenis-prevent
                    className="pointer-events-auto flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#070b12] text-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] will-change-transform lg:h-[94dvh] lg:max-h-[860px]"
                    initial={{ opacity: 0, scale: 0.94, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } }}
                    exit={{ opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.25, ease: EASE } }}
                  >
                    {/* Header stays pinned so close is always reachable */}
                    <header className="relative shrink-0 px-4 pb-3 pt-4 text-center sm:px-8 sm:pt-6">
                      <span className="absolute left-4 top-4 select-none font-logo text-xl sm:left-8 sm:top-6 sm:text-2xl" aria-hidden="true">
                        Chq<span className="text-brand-gradient">In</span><sup className="ml-[0.08em] align-super text-[0.35em] font-sans font-semibold">™</sup>
                      </span>
                      <DialogPrimitive.Close
                        aria-label="Close"
                        className="absolute right-2 top-2 rounded-full p-2 text-white/70 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--brand)] sm:right-5 sm:top-4"
                      >
                        <X size={22} aria-hidden="true" />
                      </DialogPrimitive.Close>
                      <DialogPrimitive.Title className="mx-auto mt-10 max-w-3xl text-balance lg:max-w-none text-2xl font-bold tracking-tight sm:mt-8 sm:text-4xl lg:mt-0 lg:px-32 lg:text-[clamp(1.75rem,4.5vh,3rem)]">
                        Where do you <span className="text-brand-gradient">welcome people?</span>
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mt-1.5 text-sm text-white/60 sm:text-base">
                        Select a category to explore ChqIn for your place.
                      </DialogPrimitive.Description>
                    </header>
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-4 pt-1.5 sm:px-8">
                      <div
                        role="list"
                        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex-1 lg:grid-cols-6 lg:grid-rows-[repeat(3,minmax(8rem,1fr))]"
                      >
                        {CATEGORIES.map((c, i) => (
                          <Card key={c.name} index={i} {...c} />
                        ))}
                      </div>
                    </div>
                    <footer className="flex shrink-0 items-center gap-3 border-t border-white/10 px-4 py-3 text-xs text-white/60 sm:px-8 sm:text-sm">
                      <Info size={18} className="shrink-0" aria-hidden="true" />
                      Hotel pilots are currently open. Other categories are in development and will be available soon.
                    </footer>
                  </motion.div>
                </DialogPrimitive.Content>
              </div>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </MotionConfig>
  );
}
