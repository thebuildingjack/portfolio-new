"use client";

import { useState, useSyncExternalStore } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Home,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const navItems = [
  {
    name: "Home",
    link: "#hero",
    icon: <Home size={15} />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <FolderOpen size={15} />,
  },
  {
    name: "Experience",
    link: "#experience",
    icon: <Briefcase size={15} />,
  },
  {
    name: "GitHub",
    link: "https://github.com/thebuildingjack",
    icon: <SiGithub size={15} />,
    external: true,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/francis-authority-1190a81b0",
    icon: <FaLinkedinIn size={15} />,
    external: true,
  },
  {
    name: "X",
    link: "https://x.com/thebuildingjack",
    icon: <SiX size={15} />,
    external: true,
  },
  {
    name: "Email",
    link: "mailto:francis.i.authority@gmail.com",
    icon: <Mail size={15} />,
  },
];

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;

    const previous = scrollYProgress.getPrevious();

    if (previous === undefined) return;

    const direction = current - previous;

    if (current < 0.05) {
      setVisible(false);
    } else {
      setVisible(direction < 0);
    }
  });

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed bottom-10 inset-x-0 z-5000 mx-auto flex max-w-fit items-center justify-center left-1/2 -translate-x-1/2  gap-1 px-3 py-2 rounded-md navbar-dock shadow-md backdrop-blur-md",
          className
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 rounded-xl border px-2 py-1.5 shadow-lg backdrop-blur-md",
            isDark
              ? "border-white/10 bg-black/70 shadow-black/30"
              : "border-black/10 bg-white/90 shadow-black/10"
          )}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-label={item.name}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
                isDark
                  ? "text-neutral-400 hover:bg-white/10 hover:text-white"
                  : "text-neutral-500 hover:bg-black/5 hover:text-neutral-900"
              )}
            >
              {item.icon}
            </a>
          ))}

          <div
            className={cn(
              "mx-1 h-5 w-px",
              isDark ? "bg-white/10" : "bg-black/10"
            )}
          />

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
              isDark
                ? "text-neutral-400 hover:bg-white/10 hover:text-white"
                : "text-neutral-500 hover:bg-black/5 hover:text-neutral-900"
            )}
          >
            {mounted ? (
              isDark ? <Sun size={15} /> : <Moon size={15} />
            ) : null}
          </button>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};