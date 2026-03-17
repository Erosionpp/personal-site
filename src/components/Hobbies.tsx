"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Hobbies() {
  const { t } = useLanguage();
  const categories = t.hobbies.categories as { name: string; items: string[] }[];

  return (
    <section id="hobbies" className="py-28 px-6 bg-[#f7f5f2]">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-neutral-900 mb-12 tracking-tight text-center"
        >
          {t.hobbies.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="text-xs font-medium text-neutral-900 uppercase tracking-wider mb-3">
                {cat.name}
              </h3>
              <ul className="space-y-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="text-xs text-neutral-500">
                    {item}
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
