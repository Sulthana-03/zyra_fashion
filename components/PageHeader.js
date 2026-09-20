export default function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-zyra-black text-white py-16 md:py-20">
      <div className="container-x text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="text-white/70 mt-3 max-w-xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
}
