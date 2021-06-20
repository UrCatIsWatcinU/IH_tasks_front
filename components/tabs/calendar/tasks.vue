<template>
    <div class="calendar-content calendar-tasks">
        <div class="calendar-day"
            v-for="day in tasks"
            :class="{'calendar-history': day.isHistory}"
            :key="$parseDate(day.date, 'longLeft')">
            <h2 class="calendar-day-title">{{ $parseDate(day.date, 'longLeft') }}</h2>    
            <Task @infoOpen="(info) => $parent.$emit('infoOpen', info)" v-for="task in day.pieces" :key="task.id" :task="task" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tasks: this.$parent.splitByDays(this.$parent.tasks, 'deadline')
        }
    }
}
</script>