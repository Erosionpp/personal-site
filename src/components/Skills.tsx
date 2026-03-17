"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-neutral-900 mb-12 text-center tracking-tight"
        >
          {t.skills.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {t.skills.categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="text-xs font-medium text-neutral-900 uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs border border-neutral-200 text-neutral-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
