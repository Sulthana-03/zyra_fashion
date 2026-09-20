"use client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function RatingStars({ rating = 0, size = 14, showValue = false }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-1 text-zyra-gold">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={"f" + i} size={size} />
      ))}
      {half && <FaStarHalfAlt size={size} />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={"e" + i} size={size} />
      ))}
      {showValue && <span className="text-xs text-zyra-gray ml-1">({rating.toFixed(1)})</span>}
    </span>
  );
}
