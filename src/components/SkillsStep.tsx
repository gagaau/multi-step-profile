import type {
  CurrentLevel,
  ProfileFormData,
  SkillName,
} from "../types/profile";

type SkillsStepProps = {
  formData: ProfileFormData;
  errorMessage: string;
  onSkillChange: (skill: SkillName) => void;
  onCurrentLevelChange: (value: CurrentLevel) => void;
};

function SkillsStep({
  formData,
  errorMessage,
  onSkillChange,
  onCurrentLevelChange,
}: SkillsStepProps) {
  return (
    <section className="step-card">
      <h2>Conhecimentos</h2>
      <p className="step-description">
        Marque as tecnologias que você já estudou ou está estudando.
      </p>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="skills-grid">
        <label className="checkbox-card">
          <input
            type="checkbox"
            checked={formData.skills.html}
            onChange={() => onSkillChange("html")}
          />
          HTML
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            checked={formData.skills.css}
            onChange={() => onSkillChange("css")}
          />
          CSS
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            checked={formData.skills.javascript}
            onChange={() => onSkillChange("javascript")}
          />
          JavaScript
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            checked={formData.skills.react}
            onChange={() => onSkillChange("react")}
          />
          React
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            checked={formData.skills.typescript}
            onChange={() => onSkillChange("typescript")}
          />
          TypeScript
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            checked={formData.skills.git}
            onChange={() => onSkillChange("git")}
          />
          Git/GitHub
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="currentLevel">Nível atual</label>
        <select
          id="currentLevel"
          value={formData.currentLevel}
          onChange={(event) =>
            onCurrentLevelChange(event.target.value as CurrentLevel)
          }
        >
          <option value="">Selecione uma opção</option>
          <option value="beginner">Iniciante</option>
          <option value="studying">Estudando</option>
          <option value="comfortable">Confortável</option>
        </select>
      </div>
    </section>
  );
}

export default SkillsStep;