<template>
    <div class="content calendar">
        <component :is="activeSubtab"></component>
        <div class="calendar-switcher">
            <div class="switcher-item switcher-tasks switcher-active" @click="() => switchSubtab('Tasks')">Задачи</div>
            <div class="switcher-item switcher-activities" @click="() => switchSubtab('Activities')">События</div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'

import Tasks from './tasks.vue'
import Activities from './activities.vue'
export default {
    components: {
        Tasks: Tasks,
        Activities: Activities
    },
    props: {
        tasks: {
            required: true,
            type: Array
        },
        activities: {
            required: true,
            type: Array
        }
    },
    data(){
        return{
            activeSubtab: 'Tasks'
        }
    },
    methods: {
        switchSubtab(subtab){
            if(this.activeSubtab == subtab) return;

            this.activeSubtab = subtab;

            this.$parent.urlParams.set('subtab', subtab)

            const newSubtabUrl = new URL(window.location.href);
            newSubtabUrl.searchParams.set('subtab', subtab);
            history.pushState(null, null, newSubtabUrl); 

            document.querySelectorAll('.switcher-item').forEach(si => si.classList.toggle('switcher-active'))
        },
        splitByDays(arr, dateProp, methodsToCheckIfHistory = []){
            arr = arr.sort((a, b) => a[dateProp] - b[dateProp]);

            const splittedArr = [];
            let currentDate = new Date(1);
            let currentPiece = null;

            for(let e of arr){
                const date = this.$parseDate(e[dateProp]); 

                if(date.getDate() > currentDate.getDate() || date.getMonth() > currentDate.getMonth() || date.getFullYear() > currentDate.getFullYear()){
                    currentDate = date;
                    currentPiece = {
                        date: date,
                        pieces: [e],
                        isHistory: date - this.$now() < 0 || methodsToCheckIfHistory.filter(m => e[m]()).length
                    };

                    splittedArr.push(currentPiece);
                }else{
                    currentPiece.pieces.push(e);
                }
            }

            return splittedArr;
        }
    },
    mounted(){
        const urlSubtab = ['Activities', 'Tasks'].filter(st => st === this.$parent.urlParams.get('subtab'))[0];
        if(urlSubtab){
            this.switchSubtab(urlSubtab)
        };
    }
}
</script>

<style>
.calendar{
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-bottom: 200px;
}
.calendar-content{
    width: 100%;
}

.calendar .block{
    margin: 15px 0;
    width: 100%;
}
.calendar .block:first-child{
    margin-top: 0;
}
.calendar .block:last-child{
    margin-bottom: 0;
}

.calendar-switcher{
    position: fixed;
    display: flex;
    background-color: var(--basic-c);
    box-shadow: var(--block-shadow);
    padding: 5px;
    border-radius: 7px;
    bottom: 100px;
}
.switcher-item{
    padding: 3px 25px;
    color: var(--bgc);
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
}
.switcher-active{
    background-color: var(--bgc);
    color: var(--font-c);
}

.calendar-history{
    display: none;
}

.calendar-day-title {
    color: var(--basic-c);
}
</style>