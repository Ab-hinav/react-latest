import OrderSummary from "@/components/OrderSummary";
import ShoppingCart from "@/components/ShoppingCart";


export default function AmazonCart() {




    return <div className="flex gap-2 p-3" >
        <ShoppingCart />
        <OrderSummary />
    </div>


}