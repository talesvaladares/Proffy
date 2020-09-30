import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Select from '../../components/Select';
import Input from '../../components/Input';

import './styles.css';

function TeacherList(){
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title='Estes são os proffys disponíveis'>
                <form action="" id="search-teachers">
                    <Select
                        name='subject'
                        label='Matéria'
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
                    />

                </form>
            </PageHeader>
            <main>
                <TeacherItem/>           
            </main>
        </div>

        
    );
}

export default TeacherList;