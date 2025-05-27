import { Waitlist } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function WaitlistPage() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <Waitlist />
      <Link className="text-sm hover:brightness-75" to="/">
        Voltar
      </Link>
    </div>
  );
}
