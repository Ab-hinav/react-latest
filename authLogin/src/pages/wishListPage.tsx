import LeftSidePane from "@/components/LeftSidePane";
import { Toaster } from "@/components/ui/sonner";
import WishListContent from "@/components/WishListContent";

export default function WishListPage() {



    return <div className="flex w-full h-full"  >
        <Toaster />
        <LeftSidePane />
        <div className="w-px bg-gray-200 mx-4" />
        <WishListContent />
    </div>


}