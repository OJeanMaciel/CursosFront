import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { Modal } from 'antd';
import api from "../../service/api";
import './Cursos.css';

function Cadastro() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [curso, setCurso] = useState('');
    const [categoria, setCategoria] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cursoUpperCase = curso.toUpperCase();
        const categoriaUpperCase = categoria.toUpperCase();
        console.log('Dados do formulário:', { curso: cursoUpperCase, categoria: categoriaUpperCase });

        try {
            const response = await api.post('/cursos', {
                curso: cursoUpperCase,
                categoria: categoriaUpperCase
            });

            console.log('Resposta do servidor:', response.data);

            setCurso('');
            setCategoria('');
            setModalVisible(true);
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    const handleCursoChange = (event) => {
        setCurso(event.target.value.toUpperCase());
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value.toUpperCase());
    };

    function closeModal() {
        setModalVisible(false);
        navigate('/grade');
    }

    return (
        <div className={`form-container ${loaded ? 'loaded' : ''}`}>
            <h1>Cadastro de Novos Cursos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ paddingRight: '38px' }} htmlFor="curso">Curso:</label>
                    <input
                        type="text"
                        id="curso"
                        value={curso}
                        onChange={handleCursoChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="categoria">Categoria:</label>
                    <input
                        type="text"
                        id="categoria"
                        value={categoria}
                        onChange={handleCategoriaChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Enviar</button>
                <Modal
                    title="Notificação de Sucesso!"
                    visible={modalVisible}
                    onOk={closeModal}
                    onCancel={closeModal}
                >
                    <p>Sucesso!</p>
                    <p>Curso cadastrado com Sucesso!</p>
                </Modal>
            </form>
        </div>
    );
}

export default Cadastro;
