import { Hero } from "@/components/home/Hero";
import { ApproachChapter } from "@/components/home/ApproachChapter";
import { ProblemChapter } from "@/components/home/ProblemChapter";
import { CapabilitiesChapter } from "@/components/home/CapabilitiesChapter";
import { EngagementsChapter } from "@/components/home/EngagementsChapter";
import { WorkChapter } from "@/components/home/WorkChapter";
import { InsightsChapter } from "@/components/home/InsightsChapter";
import { InvitationChapter } from "@/components/home/InvitationChapter";
import { AboutChapter } from "@/components/home/AboutChapter";
import { FinalChapter } from "@/components/home/FinalChapter";

/**
 * One continuous passage: who Norns is → how it works → what it believes →
 * what it does → how to begin → the evidence → the thinking → the invitation
 * → the company → completion.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ApproachChapter />
      <ProblemChapter />
      <CapabilitiesChapter />
      <EngagementsChapter />
      <WorkChapter />
      <InsightsChapter />
      <InvitationChapter />
      <AboutChapter />
      <FinalChapter />
    </>
  );
}
