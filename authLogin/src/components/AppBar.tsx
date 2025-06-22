import { useRecoilValueLoadable } from "recoil"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { FiShoppingCart } from "react-icons/fi"
import { cartTotalSelector } from "@/store/cart"
import { useNavigate } from "react-router-dom";


export default function AppBar() {

    const navigate = useNavigate();
    const cartLoadable = useRecoilValueLoadable(cartTotalSelector);

    let items = 0

    if (cartLoadable.state === "hasValue") {
        items = cartLoadable.contents.itemCount
    }

    return (
        <header className="w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Logo or title */}
                <div className="text-2xl font-bold text-gray-800 cursor-pointer " onClick={() => navigate('/wish-list')}>Amazon</div>

                {/* Middle: Placeholder for search/nav */}
                <div className="hidden md:block flex-1 text-center">
                    <span className="text-sm text-gray-500">Continue Shopping</span>
                </div>

                {/* Right: User avatar and name */}
                <div className="flex items-center space-x-3">
                    <div className="relative cursor-pointer " onClick={() => navigate("/cart")} >
                        <FiShoppingCart className="w-6 h-6 text-gray-700" />
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {items}
                        </span>
                    </div>
                    <Avatar className="h-9 w-9">
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700"></span>
                </div>
            </div>
            <Separator />
        </header>
    )
}