import React from 'react';

import './styles.css';
import WhatsAppImage from '../../assets/icons/whatsapp.svg';


const TeacherItem: React.FC = () => {
    return (
        <article className='teacher-item'>
        <header>
            <img src='https://avatars3.githubusercontent.com/u/34697327?s=460&v=4' alt='tales eduardo'/>
            <div>
                <strong>Tales Eduardo</strong>
                <span>Programação</span>
            </div>
        </header>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ullam cumque earum, 
            <br/><br/>
            voluptate minus autem dolor voluptatem quae rem voluptates. Possimus maxime soluta ipsa autem, 
            laboriosam magnam facere quisquam illo.
        </p>
        <footer>
            <p>
                Preço/Hora
                <strong>R$ 20,00</strong>
            </p>
            <button type='button'>
                <img src={WhatsAppImage} alt='whatsapp'/>
                Entrar em contato
            </button>
        </footer>
    </article>
    );
}

export default TeacherItem;