import Vue from 'vue'


const storage = {
    tasksStatuses: [
        {
            id: 1,
            name: 'started',
            message: 'Начато'
        },
        {
            id: 2, 
            name: 'completed',
            message: 'Завершено'
        }
    ],
    info: null
}

export default (context, inject) => {
    const elemProto = (dateProp, addonMethods = []) => ({
        isHistory(){
            return context.$parseDate(this[dateProp]) <= (new Date()) || addonMethods.filter(m => this[m]()).length
        }
    });

    const taskProto = {
        __proto__: elemProto('deadline', ['isCompleted']),
        isCompleted(){
            return storage.tasksStatuses.filter(s => ['completed'].includes(s.name)).map(s => s.id).includes(this.statusId);
        }
    }
    storage.tasks = [
        {
            id: 1,
            title: 'Домашняя работа 1',
            tags: ['HW'],
            deadline: (new Date()) / 1000 + 60 * 60 * 5,
            statusId: 1
        },
        {
            id: 2,
            title: 'Домашняя работа 2',
            tags: ['HW'],
            deadline: (new Date()) / 1000 + 60 * 60 * 7,
            statusId: 1
        },
        // пример json'а для task
        {
            id: 3,
            title: 'Домашняя работа 3',
            tags: ['HW'],
            deadline: (new Date()) / 1000 + 60 * 60 * 4,
            statusId: 1
        },
        {
            id: 4,
            title: 'Домашняя работа 4',
            tags: ['HW'],
            deadline: (new Date()) / 1000 + 60 * 60 * 45,
            statusId: 1
        },
        {
            id: 5,
            title: 'Домашняя работа 5',
            tags: ['HW'],
            deadline: (new Date()) / 1000 + 60 * 60 * 89,
            statusId: 1
        },
        // пример json'а для task
        {
            id: 6,
            title: 'Домашняя работа 6',
            tags: ['HW'],
            deadline: (new Date()) / 1000 + 60 * 60 * 100,
            statusId: 1
        }
    ].map(t =>{ 
        t.__proto__ = taskProto;
    
        return t;
    });

    storage.activities = [
        {
          id: 1,
          title: 'Урок 1',
          tags: ['lesson'],
          starttime: (new Date()) / 1000 + 60 * 60 * 5.4,
          endtime: (new Date()) / 1000 + 60 * 60 * 9.7,
          addonInfo: [
            {name: 'Аудитория', text: 'Ц1 301'}
          ]
        },
        {
          id: 2,
          title: 'Урок 2',
          tags: ['lesson'],
          starttime: (new Date()) / 1000 + 60 * 60 * 10,
          endtime: (new Date()) / 1000 + 60 * 60 * 19
        },
        // пример json'а для activity
        {
          id: 3,
          title: 'Урок 3',
          tags: ['lesson'],
          starttime: (new Date()) / 1000 + 60 * 60 * 70,
          endtime: (new Date()) / 1000 + 60 * 60 * 74
        },
    ].map(t =>{ 
        t.__proto__ = elemProto('starttime');
    
        return t;
    });

    inject('dataStore', Vue.observable(storage));
}