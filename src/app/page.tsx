import { Hero } from "@/components/home/Hero";
import { TimeChapter } from "@/components/home/TimeChapter";
import { ProblemChapter } from "@/components/home/ProblemChapter";
import { WorkChapter } from "@/components/home/WorkChapter";
import { PurposeChapter } from "@/components/home/PurposeChapter";
import { ResearchChapter } from "@/components/home/ResearchChapter";
import { InvitationChapter } from "@/components/home/InvitationChapter";
import { CompanyChapter } from "@/components/home/CompanyChapter";
import { Epilogue } from "@/components/home/Epilogue";

/**
 * The homepage is one continuous passage, not a stack of sections:
 * arrival → time → belief → work → purpose → research → invitation →
 * company → epilogue.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TimeChapter />
      <ProblemChapter />
      <WorkChapter />
      <PurposeChapter />
      <ResearchChapter />
      <InvitationChapter />
      <CompanyChapter />
      <Epilogue />
    </>
  );
}
