import { InvitationShell } from "@/components/InvitationShell";
import { Ceremonies } from "@/components/Ceremonies";
import { Family } from "@/components/Family";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { OrnamentDefs } from "@/components/ornaments/Ornaments";

export default function Home() {
  return (
    <>
      <OrnamentDefs />
      <InvitationShell footer={<Footer />}>
        <Ceremonies />
        <Family />
        <Contact />
      </InvitationShell>
    </>
  );
}
