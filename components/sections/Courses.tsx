"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { courses, topicChips } from "@/lib/data";
import { Section } from "@/components/primitives/Section";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Chip } from "@/components/primitives/Chip";
import { Badge } from "@/components/primitives/Badge";

export function Courses() {
  const { t, locale, fmt } = useLocale();
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? courses
      : courses.filter((c) => {
          const chip = topicChips.find((tc) => tc.id === active);
          return chip && c.topic[locale] === chip.label[locale];
        });

  return (
    <Section
      id="courses"
      eyebrow={t.courses.eyebrow}
      title={t.courses.title}
      body={t.courses.body}
    >
      {/* topic chips */}
      <div className="-mt-4 mb-8 flex flex-wrap gap-2">
        {topicChips.map((chip) => (
          <Chip
            key={chip.id}
            active={active === chip.id}
            onClick={() => setActive(chip.id)}
          >
            {chip.label[locale]}
          </Chip>
        ))}
      </div>

      {/* swipeable row */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:none]">
        {visible.map((course) => (
          <GlassCard
            key={course.id}
            interactive
            className="w-[280px] shrink-0 snap-start sm:w-[320px]"
          >
            <div
              className="relative aspect-[4/3] w-full"
              style={{ background: course.gradient }}
            >
              <div className="absolute end-3 top-3">
                <Badge accent>{t.common.translated}</Badge>
              </div>
            </div>
            <div className="p-6">
              <span className="text-eyebrow">{course.topic[locale]}</span>
              <h3 className="text-title mt-2 text-[var(--text-primary)]">
                {course.title[locale]}
              </h3>
              <div className="mt-4 flex items-center gap-3 text-sm text-[var(--text-tertiary)]">
                <span>
                  {fmt(course.lessons)} {locale === "fa" ? "درس" : "lessons"}
                </span>
                <span aria-hidden>·</span>
                <span>
                  {fmt(course.hours)} {locale === "fa" ? "ساعت" : "h"}
                </span>
                <span aria-hidden>·</span>
                <span>{course.level[locale]}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
