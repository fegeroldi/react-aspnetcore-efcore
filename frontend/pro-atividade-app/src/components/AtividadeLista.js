import React from 'react'
import Atividade from './Atividade'

export default function AtividadeLista(props) {
  return (
    <>
      {props.atividades.map(ativ => (
        <Atividade
          key={ativ.id}
          ativ={ativ}
          atividades={props.atividades}
          setAtividades={props.setAtividades}
          handleShowModal={props.handleShowModal}
          selecionarAtividade={props.selecionarAtividade}
        />
      ))}
    </>
  )
}
