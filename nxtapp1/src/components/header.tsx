import Link from "next/link";

export default function Header() {


    return <div className="w-full absolute text-white z-10" >
        <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
            <Link href="/" className="text-2xl font-bold">Home</Link>

            <div className="space-x-4 text-xl" >

                <Link href="/performance">go to performance</Link>
                <Link href="/scale">go to scale</Link>
                <Link href="/reliability">go to reliability</Link>
            </div>
        </nav>
    </div>


}