import React from 'react'
import api from '../api/atividade'

export default function Atividade(props) {
  function prioridadeLabel(param)
  {
    switch(param) {
      case 'Baixa':
      case 'Normal':
      case 'Alta':
        return param;
      default:
          return 'Não definido';
    }
  }
  
  function prioridadeStyle(param)
  {
    switch(param.toString()) {
      case 'Baixa':
        return 'smile';
      case 'Normal':
        return 'meh';
      case 'Alta':
        return 'frown';
      default:
          return 'Não definido';
    }
  }
  
  
  function prioridadeColor(param)
  {
    switch(param.toString()) {
      case 'Baixa':
        return 'success';
      case 'Normal':
        return 'secondary';
      case 'Alta':
        return 'danger';
      default:
          return 'Não definido';
    }
  }
  
  const deletarAtividade = async (id) => {
    if(await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = props.atividades.filter(atividade => atividade.id !== id)
      props.setAtividades([...atividadesFiltradas]);
    }
  }

  function editarAtividade(id) {
    const atividade = props.atividades.filter(atividade => atividade.id === id)
    props.selecionarAtividade(atividade[0])
    props.handleShowModal();
  }

  return (
    <div className={"card mb-2 shadow-sm border border-" + prioridadeColor(props.ativ.prioridade)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
          <span className="badge bg-secondary me-1">
            {props.ativ.id}
          </span>
          - {props.ativ.titulo}
          </h5>
          <h6 className={"text-" + prioridadeColor(props.ativ.prioridade)}>
            Prioridade: 
            <span className="ms-1 text-black">
              <i className={"me-1 far fa-" + prioridadeStyle(props.ativ.prioridade)}></i>
            </span>
            {prioridadeLabel(props.ativ.prioridade)}
          </h6>
        </div>
        <p className="card-text">
          {props.ativ.descricao}
        </p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button className="btn btn-outline-primary me-2 btn-sm"  onClick={() => editarAtividade(props.ativ.id)}>
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => deletarAtividade(props.ativ.id)}>
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
