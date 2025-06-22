import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cartItemsState, wishlistItemsState } from "@/store/cart"
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil"
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { toast } from "sonner"

export default function WishListContent() {


    const wishListData = useRecoilValueLoadable(wishlistItemsState);

    const [cartItemsStatef, setCartItemsf] = useRecoilStateLoadable(cartItemsState);

    const actualCartItems = cartItemsStatef.contents;

    const navigate = useNavigate();

    const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);

    useEffect(() => {
        if (recentlyAddedId !== null) {
            toast("Added to Cart", {
                description: "Item has been added to Ur cart",
                icon: "🛒",
                className: "bg-slate-900 text-white border border-slate-700",
                action: {
                    label: "Undo",
                    onClick: () => {
                        setCartItemsf(cartItemsStatef.contents.filter((item) => item.id !== recentlyAddedId));
                        setRecentlyAddedId(null);
                    }
                }
            });
            const timer = setTimeout(() => setRecentlyAddedId(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [recentlyAddedId]);

    const handleProceed = (id: number) => {
        const item = wishListData.contents.find((item) => item.id === id);
        if (item) {
            console.log(cartItemsStatef.contents)
            const findItem = cartItemsStatef.contents.find((t) => t.id === id);
            if (findItem) {
                navigate('/cart')
            } else {
                setCartItemsf([...cartItemsStatef.contents, { ...item, quantity: 1 }]);
                setRecentlyAddedId(id);
            }
        }
    };



    return (
        <div className="p-2 w-full">
            <h1 className="text-3xl font-bold " >WishListContent</h1>
            <div className="grid grid-cols-4 w-full gap-2">
                {
                    wishListData.state === "hasValue" && wishListData.contents.map((item) => {

                        const inCart = actualCartItems.find((i) => i.id === item.id)


                        return (
                            <Card key={item.id} className=" p-2">
                                <CardHeader className="flex justify-center items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20  rounded" />
                                </CardHeader>
                                <CardContent className="text-sm text-gray-600">
                                    <CardTitle className="text-xl">{item.name}</CardTitle>
                                    <p>Rating: {item.rating}</p>
                                    <p>Price: ₹{item.price}</p>
                                </CardContent>
                                <CardFooter className="justify-center mt-auto">
                                    <Button className="w-full" onClick={() => handleProceed(item.id)}>
                                        {inCart ? "Proceed to Checkout" : "Add to Cart"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )



}