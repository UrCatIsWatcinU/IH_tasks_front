<template>
    <div class="calendar-content calendar-activities">
        <div class="calendar-day"
            v-for="day in activities"
            :class="{'calendar-history': day.isHistory}"
            :key="$parseDate(day.date, 'longLeft')">
            <h2 class="calendar-day-title">{{ $parseDate(day.date, 'longLeft') }}</h2>    
            <Activity 
                @infoOpen="(info) => $parent.$emit('infoOpen', info)" 
                v-for="activity in day.pieces" 
                :key="activity.id" 
                :activity="activity" 
            />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            activities: this.$parent.splitByDays(this.$parent.activities, 'starttime')
        }
    }
}
</script>