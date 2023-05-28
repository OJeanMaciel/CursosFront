import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { Modal } from 'antd';
import './Cadastro.css';
import api from "../../service/api";

function Cadastro() {
    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [curso_id, setCursoId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const [loaded, setLoaded] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const alunoData = {
            nome: nome,
            email: email,
            curso: curso_id,
            telefone: telefone,
            cep: cep,
            cidade: cidade,
            bairro: bairro,
            rua: rua
        };
        console.log(alunoData)

        try {
            const response = await api.post('/aluno', alunoData);
            console.log('Aluno cadastrado:', response.data);
            setModalVisible(true);
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
        }
    };

    const handleCepChange = async (event) => {
        const enteredCep = event.target.value;
        setCep(enteredCep);

        if (enteredCep.length === 9) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${enteredCep}/json/`);
                const data = await response.json();

                if (response.ok) {
                    setCidade(data.localidade);
                    setBairro(data.bairro);
                    setRua(data.logradouro);
                } else {
                    setCidade('');
                    setBairro('');
                    setRua('');
                    console.log('Erro ao buscar o CEP:', data.message);
                }
            } catch (error) {
                setCidade('');
                setBairro('');
                setRua('');
                console.log('Erro ao buscar o CEP:', error);
            }
        } else {
            setCidade('');
            setBairro('');
            setRua('');
        }
    };

    async function fetchData() {
        try {
            const response = await api.get("/cursos");
            setCursos(response.data);
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCursoChange = (event) => {
        const selectedCursoId = event.target.value;
        setCursoId(selectedCursoId);
    };

    function closeModal() {
        setModalVisible(false);
        navigate('/grade');
    }

    return (
        <div className={`form-container ${loaded ? 'loaded' : ''}`}>
            <h1>Formulário</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="curso">Curso:</label>
                    <select
                        id="curso"
                        value={curso_id}
                        onChange={handleCursoChange}
                        required
                    >
                        <option value="">Selecione um curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.curso}
                            </option>
                        )
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="number"
                        id="telefone"
                        value={telefone}
                        onChange={(event) => setTelefone(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="cep">Cep:</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={handleCepChange}
                    />
                </div>
                <div>
                    <label htmlFor="cidade">Cidade:</label>
                    <input
                        type="text"
                        id="cidade"
                        value={cidade}
                        onChange={(event) => setCidade(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="bairro">Bairro:</label>
                    <input
                        type="text"
                        id="bairro"
                        value={bairro}
                        onChange={(event) => setBairro(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rua">Rua:</label>
                    <input
                        type="text"
                        id="rua"
                        value={rua}
                        onChange={(event) => setRua(event.target.value)}
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
                    <p>Aluno cadastrado com Sucesso!</p>
                </Modal>
            </form>
        </div>
    );
}

export default Cadastro;