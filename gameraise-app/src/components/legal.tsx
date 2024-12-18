import Link from "next/link"

import { Button } from "./ui/button"

export default function Legal() {
  return (
    <div className=" py-4 text-center text-xs text-white">
      By continuing, you agree to{" "}
      <Button variant="link" className="white h-min p-0 text-xs">
        <Link target="_blank" href="https://www.turnkey.com/legal/terms">
          Terms & Conditions
        </Link>
      </Button>{" "}
      and{" "}
      <Button variant="link" className="h-min p-0 text-xs text-white">
        <Link target="_blank" href="https://www.turnkey.com/legal/privacy">
          Privacy Policy
        </Link>
      </Button>
    </div>
  )
}
