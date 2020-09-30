import {Request, Response} from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

interface Filters {
    week_day?: number;
    subject?: string;
    time?: string;
}

export default class ClassesController {

    async create( request: Request, response: Response){
        const { 
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try{
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
        
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to),
                };
            });
        
        
            //como fizemos a conversamos anteriormente 
            //já está no formado esperado pelo banco
            await trx('class_schedule').insert(classSchedule);
        
            await  trx.commit();
    
            response.status(201).json({message: 'inserido com sucesso'});
        }
        catch(err){
            await trx.rollback();
            return response.status(400).json({error: 'Unexpected error while creating new class'});
        }

    };
       
    async index(request: Request, response: Response) {
       const filters: Filters = request.query;

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({error: 'Missing filters to search classes'});
        }

        const {subject, time, week_day} = filters;

        const timeInMinutes = convertHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes` . `id`')
                    .whereRaw('`class_schedule`.`week_day` =  ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <=  ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` >  ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
            // .where('classes.week_day', '=', filters.week_day)
            // .where('classes.time', '=', filters.time);

        return response.status(200).json(classes);

    }

}

