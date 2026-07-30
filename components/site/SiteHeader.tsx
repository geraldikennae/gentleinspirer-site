"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "../navigation/NavBar";
import { Button } from "../core/Button";
import { LINKS } from "./links";

export function SiteHeader() {
  const pathname = usePathname();
  return <NavBar links={LINKS} active={pathname} action={<Button size="sm" variant="primary" href="/book">Book</Button>} />;
}
