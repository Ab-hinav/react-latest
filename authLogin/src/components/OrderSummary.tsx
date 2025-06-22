import { Separator } from "./ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRecoilValueLoadable } from "recoil";
import { cartTotalSelector } from "@/store/cart";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


export default function OrderSummary() {

    const itemQty = 2;

    const cartLoadable = useRecoilValueLoadable(cartTotalSelector);

    let total = 0;
    let itemCount = 0;

    if (cartLoadable.state === "hasValue") {
        total = cartLoadable.contents.total;
        itemCount = cartLoadable.contents.itemCount;
    }

    return <div className="w-md">
        <Card className="mt-10 shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-center">Order Summary</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex justify-between">
                    <div>Items({itemCount})</div>
                    <div>{total}</div>
                </div>
                <Separator className="my-1" ></Separator>
            </CardContent>
            <CardFooter>
                <div className="w-full" >
                    <div className="flex justify-between" >
                        <div>Order Total</div>
                        <div>{total}</div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full mt-5">Proceed To Buy</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Order</DialogTitle>
                            </DialogHeader>
                            <div className="text-sm text-gray-600 mb-4">Are you sure you want to place this order for ₹{total}?</div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button variant="outline">Confirm</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

            </CardFooter>

        </Card>
    </div>



}