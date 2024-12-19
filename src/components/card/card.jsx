import Image from "next/image";

export default function Card({ img, price, title }) {
  return (
    <div className="max-w-xs rounded-lg border border-gray-300 shadow-md overflow-hidden">
      <Image 
        src={img} 
        alt={title} 
        width={200} 
        height={200} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-[16px]">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-xl font-bold text-[#1ABC9C] mt-2">{price}</p>
        <button className="mt-4 w-full py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-yellow-600">
          В корзину
        </button>
      </div>
    </div>
  );
}
