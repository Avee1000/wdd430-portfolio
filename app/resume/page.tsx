import ResumeHero from "@/components/resume/Hero";
import ResumeSummary from "@/components/resume/Summary";
import ResumeExperience from "@/components/resume/Experience";
import ResumeSkills from "@/components/resume/Skills";
import ResumeVolunteer from "@/components/resume/Volunteer";
import ResumeEducation from "@/components/resume/Education";

export default function Resume() {
  return (
    <div className="container-page py-16 sm:py-20">
      <ResumeHero />
      <ResumeSummary />
      <ResumeExperience />
      <ResumeSkills />
      <ResumeVolunteer />
      <ResumeEducation />
    </div>
  );
}
