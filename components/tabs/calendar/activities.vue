<template>
    <div class="calendar-content calendar-activities">
        <div class="calendar-day"
            v-for="day in activities"
            :class="{'calendar-history': day.isHistory}"
            :key="$parseDate(day.date, 'longLeft')">
            <h2 class="calendar-day-title">{{ $parseDate(day.date, 'longLeft') }}</h2>    
            <Activity 
                @deleted='deleteActivity'
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
            activities: this.$parent.splitByDays(this.$dataStore.activities, 'starttime')
        }
    },
    methods: {
        deleteActivity(id){
            this.activities = this.activities.map(day => {
                day.pieces = day.pieces.filter(a => a.id != id);
                
                return day;
            });

            this.activities = this.activities.filter(d => d.pieces.length)
        }
    }
}
</script>