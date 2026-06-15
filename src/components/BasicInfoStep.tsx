import type { ProfileFormData, WorkMode } from "../types/profile";

type BasicInfoStepProps = {
  formData: ProfileFormData;
  errorMessage: string;
  onInputChange: (field: "name" | "email" | "city", value: string) => void;
  onWorkModeChange: (value: WorkMode) => void;
};

function BasicInfoStep({
  formData,
  errorMessage,
  onInputChange,
  onWorkModeChange,
}: BasicInfoStepProps) {
  return (
    <section className="step-card">
      <h2>Dados básicos</h2>
      <p className="step-description">
        Preencha as informações principais do seu perfil.
      </p>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Ex: José Silva"
          value={formData.name}
          onChange={(event) => onInputChange("name", event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Ex: jose@email.com"
          value={formData.email}
          onChange={(event) => onInputChange("email", event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Cidade</label>
        <input
          id="city"
          type="text"
          placeholder="Ex: Rio de Janeiro"
          value={formData.city}
          onChange={(event) => onInputChange("city", event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="workMode">Modalidade desejada</label>
        <select
          id="workMode"
          value={formData.workMode}
          onChange={(event) => onWorkModeChange(event.target.value as WorkMode)}
        >
          <option value="">Selecione uma opção</option>
          <option value="remote">Remoto</option>
          <option value="hybrid">Híbrido</option>
          <option value="onsite">Presencial</option>
        </select>
      </div>
    </section>
  );
}

export default BasicInfoStep;