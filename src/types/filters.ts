export interface Filters {
  reference: string
  name: string;
  email: string
  selectedModels: string[];
  skills: string[];
  experienceRange: number[];
  headline: string
  selectedLanguages:  string[]
  certification: string;
  matchOnlySelectedSkills: boolean;
  matchAtLeastOneSkill: boolean;

}