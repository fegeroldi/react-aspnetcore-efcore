import { useEffect, useState }  from 'react'

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if(props.atividadeSelecionada.id !== 0)
    {
      setAtividade(props.atividadeSelecionada);
      console.log("useeffect");
    }
  }, [props.atividadeSelecionada]);

  const inputTextHandler = (e) => {
    const {name, value} = e.target;
    setAtividade({...atividade, [name]: value});
  }

  function atividadeAtual() {
    if(props.atividadeSelecionada.id !== 0)
      return props.atividadeSelecionada;
    else 
      return props.atividadeInicial;
  }

  function handleCancelar(e) {
    e.preventDefault();

    props.cancelarAtividade();
    setAtividade(props.atividadeInicial);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(props.atividadeSelecionada.id !== 0)
    {
      props.atualizarAtividade(atividade);
    } else {
      props.addAtividade(atividade);
    }

    setAtividade(props.atividadeInicial);
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="titulo" className="form-label">Título</label>
        <input type="text" onChange={inputTextHandler} name="titulo" value={atividade.titulo} className="form-control" id="titulo" />
      </div>
      <div className="col-md-6">
        <label htmlFor="proridade" className="form-label">Prioridade</label>
        <select id="prioridade" onChange={inputTextHandler} name="prioridade" value={atividade.prioridade} className="form-select">
          <option defaultValue="0">Selecione...</option>
          <option value="1">Baixa</option>
          <option value="2">Normal</option>
          <option value="3">Alta</option>
        </select>
      </div>
      <div className="col-md-12">
        <label htmlFor="descricao" className="form-label">Descrição</label>
        <textarea type="text" onChange={inputTextHandler} name="descricao" value={atividade.descricao} className="form-control" id="descricao" />
      </div>
      <hr/>
      <div className="col-12">
        {
          atividade.id === 0 ? 
          <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-plus me-2"></i> Atividade</button>
          :
          <>
            <button className="btn btn-outline-success me-2" type="submit"><i className="fas fa-plus me-2"></i> Salvar</button>
            <button className="btn btn-outline-warning" onClick={handleCancelar}><i className="fas fa-plus me-2"></i> Cancelar</button>
          </>
        }
      </div>
    </form>
  )
}
