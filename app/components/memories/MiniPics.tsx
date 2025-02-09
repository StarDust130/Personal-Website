import { j } from "@/app/lib/data"
import Image from "next/image"

const MiniPics = () => {
  return (
    <div className="bg-transparent p-4 hide-scrollbar md:hidden ">
            {/* Container for horizontal scrolling if needed */}
            <div className="flex flex-row gap-4 justify-center items-center hide-scrollbar  overflow-x-auto">
              {j.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                >
                  <Image
                    src={item.src}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20   object-contain"
                    width={40}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>
  )
}
export default MiniPics