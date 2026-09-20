import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-display text-5xl md:text-7xl font-bold text-zyra-gold">404</p>
      <h1 className="text-2xl font-display font-semibold mt-4">Page Not Found</h1>
      <p className="text-zyra-gray mt-2 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link href="/" className="btn-primary mt-8 inline-flex">
        Back to Home <FiArrowRight />
      </Link>
    </div>
  );
}
