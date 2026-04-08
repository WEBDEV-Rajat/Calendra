import { useState } from "react";

const monthThemes = [
  {
    name: "January",
    image: "https://cdn.prod.website-files.com/5f6cc9cd16d59d990c8fca33/6501e8efd165b2f07f6b983a_have-a-good-day-famous-8.jpg",
  },
  {
    name: "February",
    image: "https://www.brainyquote.com/photos_tr/en/m/marthabeck/282605/marthabeck1.jpg",
  },
  {
    name: "March",
    image: "https://cdn.prod.website-files.com/5f6cc9cd16d59d990c8fca33/6501ebf8eccedce90879d9a6_have-a-good-day-inspirational-2.jpg",
  },
  {
    name: "April",
    image: "https://clockify.me/blog/wp-content/uploads/2024/03/Robert-Half.jpg",
  },
  {
    name: "May",
    image: "https://www.southernliving.com/thmb/GPKOT4yiU-eEyWLMomgZji6QhI8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SL_MORNINGQUOTE_121-03b865e4aca74a85a6bdadb8e240e532.jpg",
  },
  {
    name: "June",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDA36bIk5-uwnNvRf2SBu4CxPQoWRp0Crbw&s",
  },
  {
    name: "July",
    image: "https://cdn.shopify.com/s/files/1/0700/3783/1948/files/overcoming-challenges-one-step-at-a-time.jpg?v=1732873957",
  },
  {
    name: "August",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYPNeQA6JVjGoxFvM1uWktCLCffNu3G4fFg&s",
  },
  {
    name: "September",
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2025-05/memorial-day-quotes-swl-250508-02-fc63d3.jpg",
  },
  {
    name: "October",
    image: "https://www.wikihow.com/images/thumb/e/e5/Positive-Quotes-to-Start-the-Day-Step-4.jpg/v4-460px-Positive-Quotes-to-Start-the-Day-Step-4.jpg",
  },
  {
    name: "November",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROYySJ98kjgAU1HPKyPXSDSNe4Vv8tFp2D1g&s",
  },
  {
    name: "December",
    image: "https://www.weareteachers.com/wp-content/uploads/maya-angelou.png",
  },
];

export default function HeroImage({ currentDate }) {
  const monthIndex = currentDate.getMonth();
  const monthTheme = monthThemes[monthIndex];
  const storageKey = `heroImage_${monthIndex}`;

  const [imageUrl, setImageUrl] = useState(() => {
    return sessionStorage.getItem(storageKey) || monthTheme.image;
  });

  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image too large — please use an image under 2MB.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setImageUrl(result);
      try {
        sessionStorage.setItem(storageKey, result);
      } catch (e) {
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    sessionStorage.removeItem(storageKey);
    setImageUrl(monthTheme.image);
    setError(null);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="h-48 md:h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 z-10">
        <div className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.35em] text-slate-900 shadow-sm">
          {monthTheme.name}
        </div>

        <div className="flex items-center gap-2">
          {imageUrl !== monthTheme.image && (
            <button
              onClick={handleReset}
              className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm border border-slate-200 cursor-pointer hover:bg-white transition-colors"
            >
              Reset
            </button>
          )}
          <label className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm border border-slate-200 cursor-pointer hover:bg-white transition-colors">
            Change image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      {error && (
        <div className="absolute inset-x-0 top-12 flex justify-center z-10">
          <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full shadow-sm">
            {error}
          </span>
        </div>
      )}
    </div>
  );
}