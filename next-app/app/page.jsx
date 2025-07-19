import LeftContent from "@/components/UIUX/LeftContet/LeftContent";
import RightBar from "@/components/UIUX/RightBar/RightBar";
import SearchBar from "@/components/UIUX/SearchBar/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen overflow-y-hidden">
    <SearchBar/>
      <div className="flex w-full h-[94vh]">
      <LeftContent/>
      <RightBar />
    </div>
    </div>
  );
}