type SuccessMessageProps = {
  onResetForm: () => void;
};

function SuccessMessage({ onResetForm }: SuccessMessageProps) {
  return (
    <section className="success-card">
      <div className="success-icon">✓</div>

      <h2>Cadastro concluído!</h2>

      <p>
        Seu perfil fake de candidato foi criado com sucesso. Esse projeto simula
        um formulário real com etapas, validação, revisão e salvamento de
        rascunho.
      </p>

      <button type="button" onClick={onResetForm}>
        Criar outro perfil
      </button>
    </section>
  );
}

export default SuccessMessage;