import React, { useCallback, useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem , {Teacher} from '../../components/TeacherItem';
import Select from '../../components/Select';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';


const TeacherList: React.FC = () => {

    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const handleSearchTeachers = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        
        const response = await api.get('/classes', {
           params:{
            subject,
            week_day: day,
            time
           }
        });

        setTeachers(response.data);
        console.log(response.data);
    },[subject, time, day]);

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title='Estes são os proffys disponíveis'>
                <form  id="search-teachers" onSubmit={handleSearchTeachers} >
                    <Select
                        name='subject'
                        label='Matéria'
                        value={subject}
                        onChange={(e)=> setSubject(e.target.value)}
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Português', label: 'Português'},
                            {value: 'Matemática', label: 'Matemática'},
                            {value: 'História', label: 'História'},
                            {value: 'Geografia', label: 'Geografia'},
                        ]}
                    />
                    
                    <Select
                        name='week-day'
                        label='Dia da semana'
                        value={day}
                        onChange={(e)=> setDay(e.target.value)}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-Feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sábado'},
                        ]}
                    />

                    <Input
                        label="Hora"
                        name="time"
                        type='time'
                        value={time}
                        onChange={ e => setTime(e.target.value)}
                    />

                    <button type='submit'>Buscar</button>

                </form>
            </PageHeader>
            <main>
                
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                        /> 
                    )
                })}          
            </main>
        </div>

        
    );
}

export default TeacherList;