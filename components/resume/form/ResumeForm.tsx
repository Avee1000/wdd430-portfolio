"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  LoaderCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  SkipForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createResumeEntries, type State } from "@/lib/resume/action";
import {
  WorkStepSchema,
  VolunteerStepSchema,
  SkillsStepSchema,
  type WorkEntry,
  type EducationEntry,
  type VolunteerEntry,
  type SkillCategoryEntry,
} from "@/lib/resume/schema";
import WorkStep from "./WorkStep";
import EducationStep from "./EducationStep";
import VolunteerStep from "./VolunteerStep";
import SkillsStep from "./SkillsStep";
import ResumePreview from "./ResumePreview";

const steps = [
  { id: 1, label: "Work" },
  { id: 2, label: "Education" },
  { id: 3, label: "Volunteer" },
  { id: 4, label: "Skills" },
  { id: 5, label: "Review" },
] as const;

type Step = (typeof steps)[number]["id"];

const initialData = {
  work: [] as WorkEntry[],
  education: [] as EducationEntry[],
  volunteer: [] as VolunteerEntry[],
  skills: [] as SkillCategoryEntry[],
};

export default function ResumeForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState(initialData);
  const [submitResult, setSubmitResult] = useState<State | null>(null);

  const isStep1Valid = useMemo(
    () => WorkStepSchema.safeParse({ entries: formData.work }).success,
    [formData.work],
  );
  const isStep2Valid = useMemo(
    () => formData.education.length >= 1,
    [formData.education],
  );
  const isStep3Valid = useMemo(
    () =>
      VolunteerStepSchema.safeParse({ entries: formData.volunteer }).success,
    [formData.volunteer],
  );
  const isStep4Valid = useMemo(
    () => SkillsStepSchema.safeParse({ entries: formData.skills }).success,
    [formData.skills],
  );

  const canProceed = useMemo(() => {
    if (currentStep === 1) return isStep1Valid;
    if (currentStep === 2) return isStep2Valid;
    if (currentStep === 3) return isStep3Valid;
    if (currentStep === 4) return isStep4Valid;
    return true;
  }, [currentStep, isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid]);

  const next = useCallback(() => {
    if (currentStep < 5 && canProceed) {
      setDirection(1);
      setCurrentStep((s) => (s + 1) as Step);
      setSubmitResult(null);
    }
  }, [currentStep, canProceed]);

  const back = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => (s - 1) as Step);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    if (currentStep === 3) {
      setDirection(1);
      setCurrentStep(4);
      setSubmitResult(null);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(() => {
    const toastId = toast.loading("Creating Resume...");
    startTransition(async () => {
      const res = await createResumeEntries(formData);
      console.log(res);
      console.log(formData);
      setSubmitResult(res);
      if (res.success) {
        toast.success(res.message || "Resume created successfully!", {
          id: toastId,
        });
        setFormData(initialData);
        setCurrentStep(1);
        setDirection(0);
      } else if (res.message) {
        //  const errors = res.errors;
        //  if (errors && !("work" in errors)) {
        //  }
        const errorKeys = Object.keys(res.errors || {});
        switch (true) {
          case errorKeys.includes("work"):
            setCurrentStep(1);
            break;
          case errorKeys.includes("education"):
            setCurrentStep(2);
            break;
          case errorKeys.includes("volunteer"):
            setCurrentStep(3);
            break;
          case errorKeys.includes("skills"):
            setCurrentStep(4);
            break;
        }
        console.log(res.errors);
        toast.error(res.message, {
          id: toastId,
        });
      }
    });
  }, [formData]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const isLastStep = currentStep === 5;

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <WorkStep
          entries={formData.work}
          onChange={(entries) =>
            setFormData((prev) => ({ ...prev, work: entries }))
          }
        />
      );
    }
    if (currentStep === 2) {
      return (
        <EducationStep
          entries={formData.education}
          onChange={(entries) =>
            setFormData((prev) => ({ ...prev, education: entries }))
          }
        />
      );
    }
    if (currentStep === 3) {
      return (
        <VolunteerStep
          entries={formData.volunteer}
          onChange={(entries) =>
            setFormData((prev) => ({ ...prev, volunteer: entries }))
          }
          optional
        />
      );
    }
    if (currentStep === 4) {
      return (
        <SkillsStep
          entries={formData.skills}
          onChange={(entries) =>
            setFormData((prev) => ({ ...prev, skills: entries }))
          }
        />
      );
    }
    if (currentStep === 5) {
      return (
        <ResumePreview
          work={formData.work}
          education={formData.education}
          volunteer={formData.volunteer}
          skills={formData.skills}
        />
      );
    }
    return null;
  };

  return (
    <main className="container-page flex flex-1 items-start justify-center py-10 sm:py-16 overflow-hidden">
      <div className="w-full max-w-3xl  bg-card p-6  sm:p-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Resume Builder
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Build your resume step by step. Add entries to each section, then
            review and submit.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                      currentStep === step.id
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : currentStep > step.id
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-300 bg-white text-neutral-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="size-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="text-xs font-medium text-neutral-600 hidden sm:block">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-2 h-0.5 flex-1 bg-neutral-200">
                    <div
                      className="h-full bg-neutral-900 transition-all duration-300"
                      style={{ width: currentStep > step.id ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-100 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep !== 1 && (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            )}
            {currentStep === 1 && renderStep()}
          </AnimatePresence>
        </div>

        {submitResult?.message && !submitResult.success && (
          <p className="mt-4 text-sm text-red-600">{submitResult.message}</p>
        )}

        <div
          className={`mt-8 flex items-center ${currentStep !== 1 ? "justify-between" : "justify-end"}`}
        >
          {currentStep !== 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={back}
              disabled={isPending}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          )}

          <div className="flex items-center gap-2">
            {currentStep === 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                disabled={isPending}
                className="inline-flex items-center gap-2"
              >
                Skip
                <SkipForward className="size-4" />
              </Button>
            )}

            {!isLastStep ? (
              <Button
                type="button"
                onClick={next}
                disabled={!canProceed || isPending}
                className="inline-flex items-center gap-2 bg-foreground text-background hover:opacity-85"
              >
                Next
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="inline-flex items-center gap-2 bg-foreground text-background hover:opacity-85"
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Submit Resume
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
