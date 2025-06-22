import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { useRecoilStateLoadable } from "recoil";
import { cartItemsState } from "@/store/cart";

export default function ShoppingCart() {

    const [cartItemsF, setCartItemsf] = useRecoilStateLoadable(cartItemsState);
    
    const increment = (id: number) => {
        setCartItemsf((prev) => prev.map((item) => item.id === id ? {...item,quantity:item.quantity+1}:item)
        );
    };

    const decrement = (id: number) => {
  setCartItemsf((prev) =>
    prev.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};


const removeItem = (id: number) => {
  setCartItemsf((prev) => prev.filter((item) => item.id !== id));
};

    return (
        <Card className="mt-10 shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Your Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {cartItemsF.contents.map((item) => (
                    <div>
                        <div className="flex justify-between items-center" >
                            <div key={item.id} className="flex gap-3 items-center text-sm">
                                <img src={item.image} alt={item.name} className="rounded-md h-10 w-10"

                                ></img>
                                <div  >
                                    <div className="font-bold text-sm w-full">{item.name}</div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => decrement(item.id)}>-</Button>
                                        <span>{item.quantity}</span>
                                        <Button variant="outline" size="sm" onClick={() => increment(item.id)}>+</Button>
                                        <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>Delete</Button>
                                    </div>

                                </div>


                            </div>
                            <div>{item.price}</div>
                        </div>
                        <Separator className="my-3" />
                    </div>
                ))}
            </CardContent>

        </Card>
    );
}