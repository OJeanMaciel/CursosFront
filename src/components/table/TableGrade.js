import { Button, Table, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { LaptopOutlined, BranchesOutlined, MobileOutlined, CoffeeOutlined } from '@ant-design/icons';
import './TableHome.css';
import api from "../../service/api";
import EditCurso from '../edit/editCurso';

function TableGrade() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
        setLoading(true);
      const response = await api.get("cursos");
      setData(response.data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
        setLoading(false);
    }
  }

  const categoryIcons = {
    'FRONT-END': <LaptopOutlined />,
    'BACK-END': <BranchesOutlined />,
    'MOBILE': <MobileOutlined />,
    'OUTRO': <CoffeeOutlined />
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'column-id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Cursos',
      dataIndex: 'curso',
      key: 'curso',
      align: 'center',
      className: 'column-curso',
      sorter: (a, b) => a.curso.localeCompare(b.curso),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      align: 'center',
      className: 'column-categoria',
      sorter: (a, b) => a.categoria.localeCompare(b.categoria),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Icon',
      dataIndex: 'categoria',
      key: 'icone',
      align: 'center',
      className: 'column-icone',
      render: (text, record) => categoryIcons[text] || categoryIcons['OUTRO'],
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            style={{ width: '8em', marginRight: '10px', backgroundColor: '#eb0c0c' }}
            onClick={() => handleDelete(record)}
          >
            Deletar
          </Button>
          <Button
            type="primary"
            style={{ width: '8em', marginLeft: '10px', backgroundColor: '#eb7c0c' }}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
        </span>
      ),
    },
  ];

  function handleEdit(record) {
    setSelectedCurso(record);
    setEditModalVisible(true);
  }

  async function handleDelete(record) {
    try {
      await api.delete(`/cursos/${record.id}`);
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

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  return (
    <div className={`containerTable ${loaded ? 'loaded' : ''}`}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ position: 'bottomCenter' }}
          size="small"
        />
      )}
      <Modal
        visible={editModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <EditCurso selectedCurso={selectedCurso} />
      </Modal>
      <Modal
        title="Notificação de Sucesso!"
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Sucesso!</p>
        <p>Curso excluído!</p>
      </Modal>
      <Modal
        title="Notificação de Erro!"
        visible={modalVisibleError}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Erro ao excluir curso!</p>
        <p>Aluno vinculado ao curso que você está tentando excluir.</p>
      </Modal>
    </div>
  );
}

export default TableGrade;