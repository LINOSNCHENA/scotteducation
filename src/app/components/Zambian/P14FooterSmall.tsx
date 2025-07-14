// components/Footer.tsx

import { COMP_COPYRIGHT } from "@/app/utils/NexusData";

export default function S13Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 text-center mt-auto">
      <p>{COMP_COPYRIGHT}</p>
    </footer>
  );
}
