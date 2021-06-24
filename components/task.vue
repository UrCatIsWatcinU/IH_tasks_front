<template>
    <div @click="() => $dataStore.info = info" class="block task">
        <div class="block-content">
            <h4 class="task-title">{{ task.title }}</h4>
            <div class="tags">
                <span class="tag" v-for="tag in task.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="task-deadline">
                <span>Осталось времени: {{ $parseDate(task.deadline, 'left') }} </span>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="block-arrow"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>
</template>
<script>
export default {
    props: {
        task: {
            required: true
        }
        
    },
    data(){
        return {
            info: {
                title: this.task.title,
                tags: this.task.tags,
                statements: [],
                btns: [
                    {
                        name: 'delete',
                        text: 'Удалить',
                        type: 'angry',
                        fn: this.delete
                    },
                ]
            },
            completedStatus: this.$dataStore.tasksStatuses.filter(s => s.name == 'completed')[0],
            startedStatus: this.$dataStore.tasksStatuses.filter(s => s.name == 'started')[0],
        }
    },
    updated(){

    },
    created(){
        if(this.task.addonInfo) this.info.statements.push(...this.task.addonInfo);
        
        this.changeStatus();
    },
    methods: {
        delete(){
            this.$dataStore.tasks = this.$dataStore.tasks.filter(t => t != this.task);

            this.$emit('deleted', this.task.id);
        },
        changeStatus(statusId){
            if(statusId) this.task.statusId = statusId;
            
            const status = this.$dataStore.tasksStatuses.filter(s => s.id == this.task.statusId)[0] || {};
            this.info.statements = this.info.statements.filter(stat => stat.name != 'Статус' && stat.name != 'Срок');
            this.info.btns = this.info.btns.filter(btn => btn.name != 'end' && btn.name != 'cancelEnd');

            if((!status.name || status.name == 'started') && this.$parseDate(this.task.deadline) >= this.$now()){
                this.info.statements.push({
                    name: 'Срок',
                    text: this.$parseDate(this.task.deadline, 'long')
                });
    
                this.info.btns.push({
                    name: 'end',
                    text: 'Завершить',
                    fn: this.end
                });
            }else if((!status.name || status.name == 'started') && this.$parseDate(this.task.deadline) <= this.$now()){
                this.info.statements.push({
                    name: 'Статус',
                    text: 'Просрочено'
                });
            }else{
                this.info.statements.push({
                    name: 'Статус',
                    text: status.message || 'Неизвестно'
                });
    
                if(status.name == 'completed'){
                    this.info.btns.push({
                        name: 'cancelEnd',
                        text: 'Отменить завершение',
                        fn: this.cancelEnd
                    });
                }
            }

            this.$emit('statusChange')
        },
        end(){
            this.changeStatus(this.completedStatus && this.completedStatus.id);
        },
        cancelEnd(){
            this.changeStatus(this.startedStatus && this.startedStatus.id);
        }
    }
}
</script>

<style>
    
</style>