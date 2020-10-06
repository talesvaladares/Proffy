import React, { useCallback } from 'react';

import './styles.css';
import WhatsAppImage from '../../assets/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher{
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    whatsapp: string;
    subject: string;
}
interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {

    const handleCreateNewConnection = useCallback(async () => {

        await api.post('/connections', {
            user_id: teacher.id
        });
    },[teacher.id]);

    return (
        <article className='teacher-item'>
        <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        <p>
          {teacher.bio}
        </p>
        <footer>
            <p>
                Preço/Hora
                <strong>R$ {teacher.cost}</strong>
            </p>
            <a target='_blank' onClick={handleCreateNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                <img src={WhatsAppImage} alt='whatsapp'/>
                Entrar em contato
            </a>
        </footer>
    </article>
    );
}

export default TeacherItem;