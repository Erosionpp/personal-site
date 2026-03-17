"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Research() {
  const { t } = useLanguage();

  return (
    <section id="research" className="py-28 px-6 bg-[#f7f5f2]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-neutral-900 mb-12 text-center tracking-tight"
        >
          {t.research.title}
        </motion.h2>

        <div className="space-y-8">
          {t.research.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-neutral-200 pl-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{item.org}</p>
                </div>
                <span className="text-xs text-neutral-400 shrink-0">
                  {item.time}
                </span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="text-xs text-neutral-500 leading-relaxed relative pl-3 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-neutral-300"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
