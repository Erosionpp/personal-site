"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-neutral-900 mb-12 text-center tracking-tight"
        >
          {t.education.title}
        </motion.h2>

        <div className="space-y-8">
          {t.education.items.map((item, i) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-neutral-200 pl-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">
                    {item.school}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">{item.degree}</p>
                </div>
                <div className="text-xs text-neutral-400 shrink-0 sm:text-right">
                  <p>{item.time}</p>
                  <p className="flex items-center gap-1 sm:justify-end">
                    <MapPin size={10} />
                    {item.location}
                  </p>
                </div>
              </div>
              <div className="space-y-1 mt-3">
                {item.details.map((detail) => (
                  <p key={detail} className="text-xs text-neutral-500 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
