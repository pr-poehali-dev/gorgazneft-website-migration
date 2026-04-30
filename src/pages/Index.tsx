import Header from "@/components/sections/Header";
import MainSections from "@/components/sections/MainSections";
import ProfessionsSection from "@/components/sections/ProfessionsSection";
import EnrollmentFooter from "@/components/sections/EnrollmentFooter";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-ibm">
      <Header />
      <MainSections />
      <ProfessionsSection />
      <EnrollmentFooter />
    </div>
  );
}