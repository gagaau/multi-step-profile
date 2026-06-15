import type { JobType, ProfileFormData } from "../types/profile";

type PreferencesStepProps = {
  formData: ProfileFormData;
  errorMessage: string;
  onJobTypeChange: (value: JobType) => void;
  onInputChange: (field: "availability" | "notes", value: string) => void;
};

function PreferencesStep({
  formData,
  errorMessage,
  onJobTypeChange,
  onInputChange,
}: PreferencesStepProps) {
  return (
    <section className="step-card">
      <h2>Preferências</h2>
      <p className="step-description">
        Informe que tipo de vaga você procura e sua disponibilidade.
      </p>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-group">
        <label htmlFor="jobType">Tipo de vaga</label>
        <select
          id="jobType"
          value={formData.jobType}
          onChange={(event) => onJobTypeChange(event.target.value as JobType)}
        >
          <option value="">Selecione uma opção</option>
          <option value="internship">Estágio</option>
          <option value="trainee">Trainee</option>
          <option value="junior">Júnior</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="availability">Disponibilidade</label>
        <input
          id="availability"
          type="text"
          placeholder="Ex: manhã, tarde, horário comercial..."
          value={formData.availability}
          onChange={(event) =>
            onInputChange("availability", event.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Observação opcional</label>
        <textarea
          id="notes"
          placeholder="Ex: prefiro vagas remotas, estou estudando React..."
          value={formData.notes}
          onChange={(event) => onInputChange("notes", event.target.value)}
        ></textarea>
      </div>
    </section>
  );
}

export default PreferencesStep;