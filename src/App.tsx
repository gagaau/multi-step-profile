import { useEffect, useState } from "react";
import BasicInfoStep from "./components/BasicInfoStep";
import ProgressBar from "./components/ProgressBar";
import PreferencesStep from "./components/PreferencesStep";
import ReviewStep from "./components/ReviewStep";
import SkillsStep from "./components/SkillsStep";
import SuccessMessage from "./components/SuccessMessage";
import ThemeToggle from "./components/ThemeToggle";
import type {
  CurrentLevel,
  JobType,
  ProfileFormData,
  SkillName,
  WorkMode,
} from "./types/profile";

type Theme = "light" | "dark";

const totalSteps = 4;

const initialFormData: ProfileFormData = {
  name: "",
  email: "",
  city: "",
  workMode: "",
  skills: {
    html: false,
    css: false,
    javascript: false,
    react: false,
    typescript: false,
    git: false,
  },
  currentLevel: "",
  jobType: "",
  availability: "",
  notes: "",
};

function getSavedFormData() {
  const savedFormData = localStorage.getItem("multi-step-profile-data");

  if (savedFormData) {
    return JSON.parse(savedFormData) as ProfileFormData;
  }

  return initialFormData;
}

function getSavedTheme() {
  const savedTheme = localStorage.getItem("multi-step-profile-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "light";
}

function App() {
  const [formData, setFormData] =
    useState<ProfileFormData>(getSavedFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [theme, setTheme] = useState<Theme>(getSavedTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("multi-step-profile-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isCompleted) {
      localStorage.setItem(
        "multi-step-profile-data",
        JSON.stringify(formData)
      );
    }
  }, [formData, isCompleted]);

  function handleBasicInputChange(
    field: "name" | "email" | "city",
    value: string
  ) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handlePreferenceInputChange(
    field: "availability" | "notes",
    value: string
  ) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handleWorkModeChange(value: WorkMode) {
    setFormData({
      ...formData,
      workMode: value,
    });
  }

  function handleCurrentLevelChange(value: CurrentLevel) {
    setFormData({
      ...formData,
      currentLevel: value,
    });
  }

  function handleJobTypeChange(value: JobType) {
    setFormData({
      ...formData,
      jobType: value,
    });
  }

  function handleSkillChange(skill: SkillName) {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skill]: !formData.skills[skill],
      },
    });
  }

  function hasSelectedSkill() {
    return Object.values(formData.skills).some((skill) => skill);
  }

  function validateCurrentStep() {
    if (currentStep === 1) {
      if (
        formData.name.trim() === "" ||
        formData.email.trim() === "" ||
        formData.city.trim() === "" ||
        formData.workMode === ""
      ) {
        setErrorMessage("Preencha todos os campos antes de avançar.");
        return false;
      }

      if (!formData.email.includes("@")) {
        setErrorMessage("Digite um email válido.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!hasSelectedSkill()) {
        setErrorMessage("Selecione pelo menos um conhecimento.");
        return false;
      }

      if (formData.currentLevel === "") {
        setErrorMessage("Selecione seu nível atual.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (formData.jobType === "" || formData.availability.trim() === "") {
        setErrorMessage("Preencha o tipo de vaga e a disponibilidade.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  }

  function handleNextStep() {
    const isValid = validateCurrentStep();

    if (!isValid) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePreviousStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrorMessage("");
    }
  }

  function handleConfirmProfile() {
    setIsCompleted(true);
    localStorage.removeItem("multi-step-profile-data");
  }

  function handleResetForm() {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrorMessage("");
    setIsCompleted(false);
    localStorage.removeItem("multi-step-profile-data");
  }

  function handleToggleTheme() {
    if (theme === "light") {
      setTheme("dark");
      return;
    }

    setTheme("light");
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="app-label">Projeto React + TypeScript</p>
          <h1>Perfil Front-end</h1>
          <p>
            Um formulário em etapas para simular o cadastro de um candidato
            front-end.
          </p>
        </div>

        <ThemeToggle theme={theme} onToggleTheme={handleToggleTheme} />
      </header>

      {!isCompleted && (
        <>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          {currentStep === 1 && (
            <BasicInfoStep
              formData={formData}
              errorMessage={errorMessage}
              onInputChange={handleBasicInputChange}
              onWorkModeChange={handleWorkModeChange}
            />
          )}

          {currentStep === 2 && (
            <SkillsStep
              formData={formData}
              errorMessage={errorMessage}
              onSkillChange={handleSkillChange}
              onCurrentLevelChange={handleCurrentLevelChange}
            />
          )}

          {currentStep === 3 && (
            <PreferencesStep
              formData={formData}
              errorMessage={errorMessage}
              onJobTypeChange={handleJobTypeChange}
              onInputChange={handlePreferenceInputChange}
            />
          )}

          {currentStep === 4 && <ReviewStep formData={formData} />}

          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button
                className="secondary-button"
                type="button"
                onClick={handlePreviousStep}
              >
                Voltar
              </button>
            )}

            {currentStep < totalSteps && (
              <button
                className="primary-button"
                type="button"
                onClick={handleNextStep}
              >
                Avançar
              </button>
            )}

            {currentStep === totalSteps && (
              <button
                className="primary-button"
                type="button"
                onClick={handleConfirmProfile}
              >
                Confirmar cadastro
              </button>
            )}
          </div>
        </>
      )}

      {isCompleted && <SuccessMessage onResetForm={handleResetForm} />}
    </main>
  );
}

export default App;