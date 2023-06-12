import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from "./api/atividade"
import { Button, Modal } from 'react-bootstrap';

let atividadesInitialState = [
]

const atividadeInicial = {
  id: 0,
  titulo: '',
  prioridade: 0,
  descricao: ''
};

function App() {
  const [show, setShow] = useState(false);
  const [atividades, setAtividades] = useState(atividadesInitialState);
  const [atividade, setAtividade] = useState(atividadeInicial);

  const handleClose = () => {
    setShow(false);
    setAtividade({id: 0});
  }
  const handleShow = () => setShow(true);

  const listarAtividades = async () => {
    const response = await api.get('atividade');

    return response.data;
  }


  useEffect(() => {
    const atualizarAtividades = async () => {
      const todasAtividades = await listarAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    }
    atualizarAtividades();
  }, [])

  const addAtividade = async () => {
    const ativ = {
      "prioridade": parseInt(document.getElementById('prioridade').value),
      "titulo": document.getElementById('titulo').value,
      "descricao": document.getElementById('descricao').value
    }

    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }

  const atualizarAtividade = async (atividadeAtualizada) => {
    const response = await api.put(`atividade/${atividadeAtualizada.id}`, atividadeAtualizada);
    const { id } = response.data;
    
    setAtividades(atividades.map(item => (item.id === id ? response.data : item)));
    handleClose();
  }

  function cancelarAtividade()
  {
    handleClose();
  }

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
        <Button variant="outline-secondary" onClick={handleShow}>
          <i className='fas fa-plus'></i>
        </Button>
      </div>
      <div className="row mt-3">
          <AtividadeLista
            atividades={atividades}
            setAtividades={setAtividades}
            selecionarAtividade={setAtividade}
            handleShowModal={handleShow}
          />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atividade {atividade.id !== 0 ? atividade.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm 
            addAtividade={addAtividade}
            atividadeSelecionada={atividade}
            atividadeInicial={atividadeInicial}
            atualizarAtividade={atualizarAtividade}
            cancelarAtividade={cancelarAtividade}
        />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
