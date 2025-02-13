"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onTouchStart={() => setHovered(index)}
      onTouchEnd={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Link href={`/blog/${card.slug}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="absolute inset-0"
        >
          <motion.img
            src={card.src}
            alt={card.title}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            className="object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        </motion.div>
      </Link>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-xl md:text-2xl font-medium text-white text-center px-4">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

interface Card {
  title: string;
  src: string;
  slug: string;
}

export const FocusCards = ({ cards }: { cards: Card[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4 px-4 max-w-4xl mx-auto">
      {cards.map((card, i) => (
        <Link href={`/blog/${card.slug}`} key={i}>
          <div
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(i)}
            onTouchEnd={() => setHovered(null)}
            className={cn(
              "relative h-[300px] sm:h-[400px] overflow-hidden rounded-lg transition-all duration-300 cursor-pointer",
              hovered !== null && hovered !== i && "blur-sm scale-95"
            )}
          >
            <motion.img
              src={card.src}
              alt={card.title}
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <h3 className="text-base sm:text-2xl font-bold text-white text-center px-4">
                {card.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
