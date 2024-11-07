import Image from "next/image"
import Link from "next/link"

import gameraiseLogo from "../../public/gameraise_logo 3.png"
import Account from "./account"

export default function NavMenu() {
  return (
    <div className=" flex h-[5rem] items-center justify-between gap-4 bg-secondary p-4 sm:px-10">
      <Link href="/">
        <Image src={gameraiseLogo} alt="gameraise logo" />
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Account />
      </div>
    </div>
  )
}
