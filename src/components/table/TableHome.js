import { Button, Table, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import './TableHome.css';
import api from "../../service/api";
import EditAluno from '../edit/editAluno';

function TableHome() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get("aluno/alunobycurso");
      setData(response.data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      align: 'center',
      className: 'column-nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      className: 'column-email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      align: 'center',
      className: 'column-telefone'
    },
    {
      title: 'Cep',
      dataIndex: 'cep',
      key: 'cep',
      align: 'center',
      className: 'column-cep',
      sorter: (a, b) => a.cep.localeCompare(b.cep),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Cidade',
      dataIndex: 'cidade',
      key: 'cidade',
      align: 'center',
      className: 'column-cidade',
      sorter: (a, b) => a.cidade.localeCompare(b.cidade),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Bairro',
      dataIndex: 'bairro',
      key: 'bairro',
      align: 'center',
      className: 'column-bairro',
      sorter: (a, b) => a.bairro.localeCompare(b.bairro),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Rua',
      dataIndex: 'rua',
      key: 'rua',
      align: 'center',
      className: 'column-rua',
      sorter: (a, b) => a.rua.localeCompare(b.rua),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Curso',
      dataIndex: 'curso',
      key: 'curso',
      align: 'center',
      className: 'column-curso',
      sorter: (a, b) => a.curso.localeCompare(b.curso),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <span>
          <Button type="primary"
            style={{ width: '8em', marginRight: '10px', backgroundColor: '#eb0c0c' }}
            onClick={() => handleDelete(record)}>
            Deletar
          </Button>
          <Button type="primary"
            style={{ width: '8em', marginLeft: '10px', backgroundColor: '#eb7c0c' }}
            onClick={() => handleEdit(record)}>
            Editar
          </Button>
        </span>
      )
    }
  ];

  function handleEdit(record) {
    setSelectedAluno(record);
    setEditModalVisible(true);
  }

  async function handleDelete(record) {
    try {
      await api.delete(`/aluno/${record.id}`);
      fetchData();
      setModalVisible(true);
    } catch (error) {
      setModalVisibleError(true);
    }
  }

  function closeModal() {
    setEditModalVisible(false);
    setModalVisible(false);
    setModalVisibleError(false);
    fetchData();
  }

  return (
    <div className={`containerTable ${loaded ? 'loaded' : ''}`}>
      <Input
        type="text"
        placeholder="Procure pelo nome"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '1em', border: '1px solid #ffbb33' }}
      />
      <Table dataSource={filteredData}
        columns={columns}
        pagination={{ position: 'bottomCenter' }}
        size="small" />
      <Modal
        visible={editModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <EditAluno selectedAluno={selectedAluno} />
      </Modal>
      <Modal
        title="Notificação de Sucesso!"
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Sucesso!</p>
        <p>Aluno excluído!</p>
      </Modal>
      <Modal
        title="Notificação de Erro!"
        visible={modalVisibleError}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Erro ao excluir aluno!</p>
      </Modal>
    </div>
  );
}

export default TableHome;
