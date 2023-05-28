import React, { useEffect, useState } from 'react';
import './about.css';

function About() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className={`sobre ${loaded ? 'loaded' : ''}`}>
        <h1>Sobre nossa escola</h1>
        <p>Bem-vindo à nossa escola de cadastro de cursos de tecnologia!</p>
        <p>Aqui na nossa escola, oferecemos uma ampla variedade de cursos para ajudá-lo a desenvolver habilidades e conhecimentos na área de tecnologia.</p>
        <p>Nossos instrutores são profissionais experientes, apaixonados por tecnologia e dedicados a ajudar você a ter sucesso em sua jornada de aprendizado.</p>
        <p>Seja você um iniciante ou um profissional em busca de aprimoramento, temos cursos adequados para todos os níveis de habilidade.</p>
        <p>Explore nossa seleção de cursos e comece a impulsionar sua carreira hoje mesmo!</p>
        <h2>Nossos Cursos</h2>
        <ul>
          <li>Desenvolvimento Web</li>
          <li>Desenvolvimento Mobile</li>
          <li>Análise de Dados</li>
          <li>Inteligência Artificial</li>
          <li>Cibersegurança</li>
        </ul>
        <h2>Contato</h2>
        <p>Para mais informações, entre em contato conosco:</p>
        <p>Telefone: (XX) XXXX-XXXX</p>
        <p>Email: contato@escola.com</p>
      </div>
    );
  }

export default About;