import Vue from 'vue'

const storage = {
    activities: [
        {
          id: 1,
          title: 'test',
          tags: ['lesson'],
          starttime: (new Date()) / 1000 + 60 * 60 * 5.4,
          endtime: (new Date()) / 1000 + 60 * 60 * 9.7,
          addonInfo: [
            {name: 'Аудитория', text: 'Ц1 301'}
          ]
        },
        {
          id: 2,
          title: 'test2',
          tags: ['lesson'],
          starttime: (new Date()) / 1000 + 60 * 60 * 10,
          endtime: (new Date()) / 1000 + 60 * 60 * 19
        },
        // пример json'а для activity
        {
          id: 3,
          title: 'test3',
          tags: ['lesson'],
          starttime: (new Date()) / 1000 + 60 * 60 * 70,
          endtime: (new Date()) / 1000 + 60 * 60 * 74
        },
    ],
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

const taskProto = {
    isCompleted(){
        return storage.tasksStatuses.filter(s => ['completed'].includes(s.name)).map(s => s.id).includes(this.statusId);
    }
}
storage.tasks = [
    {
        id: 1,
        title: 'test',
        tags: ['HW'],
        deadline: (new Date()) / 1000 + 60 * 60 * 5,
        statusId: 1
    },
    {
        id: 2,
        title: 'test2',
        tags: ['HW'],
        deadline: (new Date()) / 1000 + 60 * 60 * 7,
        statusId: 1
    },
    // пример json'а для task
    {
        id: 3,
        title: 'test3',
        tags: ['HW'],
        deadline: (new Date()) / 1000 + 60 * 60 * 4,
        statusId: 1
    },
    {
        id: 4,
        title: 'test',
        tags: ['HW'],
        deadline: (new Date()) / 1000 + 60 * 60 * 45,
        statusId: 1
    },
    {
        id: 5,
        title: 'test2',
        tags: ['HW'],
        deadline: (new Date()) / 1000 + 60 * 60 * 89,
        statusId: 1
    },
    // пример json'а для task
    {
        id: 6,
        title: 'test3',
        tags: ['HW'],
        deadline: (new Date()) / 1000 + 60 * 60 * 100,
        statusId: 1
    }
].map(t =>{ 
    t.__proto__ = taskProto;

    return t;
});

export default (context, inject) => {
    inject('dataStore', Vue.observable(storage));
}