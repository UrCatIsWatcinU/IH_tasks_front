<template>
    <div class="calendar-content calendar-tasks">
        <div class="calendar-day"
            v-for="day in tasks"
            :class="{'calendar-history': day.isHistory}"
            :key="$parseDate(day.date, 'longLeft')">
            <h2 class="calendar-day-title">{{ $parseDate(day.date, 'longLeft') }}</h2>    
            <Task 
                @deleted='deleteTask' 
                v-for="task in day.pieces" 
                :key="task.id" :task="task" 
            />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // tasks: this.$parent.splitByDays(this.$dataStore.tasks, 'deadline', ['isCompleted'])
        }
    },
    methods: {
        deleteTask(id){
            this.tasks = this.tasks.map(day => {
                day.pieces = day.pieces.filter(t => t.id != id);
                
                return day;
            });

            this.tasks = this.tasks.filter(d => d.pieces.length)
        }
    },
    computed: {
        tasks(){
            return this.$parent.splitByDays(this.$dataStore.tasks, 'deadline', ['isCompleted'])
        }
    }
}
</script>