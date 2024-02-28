import Link from "next/link"
import { FaBowlFood } from "react-icons/fa6";

const NavBar = () => {
  const links = [
    { label: "Meals", href: "/meals"},
    { label: "My meals", href: "/my-meals"}
  ]

  return (
    <nav className="flex text-xl space-x-6 border-b mb-6 px-5 h-14 items-center">
      <Link href={""} className="text-2xl"><FaBowlFood/></Link>
      <ul className="flex space-x-6">
        {links.map((link) => <Link className="text-slate-600 hover:text-zinc-900" href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
