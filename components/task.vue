<template>
    <div @click="() => $emit('infoOpen', info)" class="block task">
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
                statements: [
                    {
                        name: 'Срок',
                        text: this.$parseDate(this.task.deadline, 'long')
                    }
                ],
                btns: [
                    {
                        name: 'end',
                        text: 'Завершить',
                        fn: this.end
                    },
                    {
                        name: 'delete',
                        text: 'Удалить',
                        type: 'angry',
                        fn: this.delete
                    },
                ]
            }
        }
    },
    created(){
        if(this.task.addonInfo) this.info.statements.push(...this.task.addonInfo)
    },
    methods: {
        delete(){

        },
        end(){
            
        }
    }
}
</script>

<style>
    
</style>