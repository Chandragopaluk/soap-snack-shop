interface CategoryBannerProps {
  title: string;
  description: string;
  bgColor: string;
  icon: string;
}

export default function CategoryBanner({
  title,
  description,
  bgColor,
  icon,
}: CategoryBannerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${bgColor} py-16 px-8`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="text-6xl mb-4 block">{icon}</span>
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-white/90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
