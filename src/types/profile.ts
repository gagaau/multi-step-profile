export type WorkMode = "" | "remote" | "hybrid" | "onsite";

export type CurrentLevel = "" | "beginner" | "studying" | "comfortable";

export type JobType = "" | "internship" | "trainee" | "junior";

export type SkillName =
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "typescript"
  | "git";

export type Skills = {
  html: boolean;
  css: boolean;
  javascript: boolean;
  react: boolean;
  typescript: boolean;
  git: boolean;
};

export type ProfileFormData = {
  name: string;
  email: string;
  city: string;
  workMode: WorkMode;
  skills: Skills;
  currentLevel: CurrentLevel;
  jobType: JobType;
  availability: string;
  notes: string;
};