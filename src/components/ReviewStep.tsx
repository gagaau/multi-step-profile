import type { ProfileFormData, SkillName } from "../types/profile";

type ReviewStepProps = {
  formData: ProfileFormData;
};

const workModeText = {
  remote: "Remoto",
  hybrid: "Híbrido",
  onsite: "Presencial",
  "": "Não informado",
};

const currentLevelText = {
  beginner: "Iniciante",
  studying: "Estudando",
  comfortable: "Confortável",
  "": "Não informado",
};

const jobTypeText = {
  internship: "Estágio",
  trainee: "Trainee",
  junior: "Júnior",
  "": "Não informado",
};

const skillText = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  react: "React",
  typescript: "TypeScript",
  git: "Git/GitHub",
};

function ReviewStep({ formData }: ReviewStepProps) {
  const selectedSkills = Object.keys(formData.skills).filter((skill) => {
    const skillName = skill as SkillName;
    return formData.skills[skillName];
  });

  return (
    <section className="step-card">
      <h2>Revisão final</h2>
      <p className="step-description">
        Confira os dados antes de finalizar o cadastro fake.
      </p>

      <div className="review-list">
        <div className="review-item">
          <span>Nome</span>
          <strong>{formData.name}</strong>
        </div>

        <div className="review-item">
          <span>Email</span>
          <strong>{formData.email}</strong>
        </div>

        <div className="review-item">
          <span>Cidade</span>
          <strong>{formData.city}</strong>
        </div>

        <div className="review-item">
          <span>Modalidade desejada</span>
          <strong>{workModeText[formData.workMode]}</strong>
        </div>

        <div className="review-item">
          <span>Conhecimentos</span>
          <strong>
            {selectedSkills.length > 0
              ? selectedSkills
                  .map((skill) => skillText[skill as SkillName])
                  .join(", ")
              : "Nenhum conhecimento selecionado"}
          </strong>
        </div>

        <div className="review-item">
          <span>Nível atual</span>
          <strong>{currentLevelText[formData.currentLevel]}</strong>
        </div>

        <div className="review-item">
          <span>Tipo de vaga</span>
          <strong>{jobTypeText[formData.jobType]}</strong>
        </div>

        <div className="review-item">
          <span>Disponibilidade</span>
          <strong>{formData.availability}</strong>
        </div>

        <div className="review-item">
          <span>Observação</span>
          <strong>{formData.notes || "Nenhuma observação."}</strong>
        </div>
      </div>
    </section>
  );
}

export default ReviewStep;