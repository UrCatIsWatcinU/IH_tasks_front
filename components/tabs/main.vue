<template>
  <div class="content main">
    <h5 class="section-title">Горящий дедлайн <a href="/?tab=Calendar&subtab=Tasks" class="more-link">Все задачи ></a></h5>
    <div class="horizontal-scroll">
      <Task 
        @infoOpen="(info) => $emit('infoOpen', info)"
        v-for="task in filterOnlyNew(60 * 60 * 24 * 3, 'deadline', tasks)" 
        :key="task.id" 
        :task="task"
      />
    </div>
    <h5 class="section-title">События на сегодня <a href="/?tab=Calendar&subtab=Activities" class="more-link">Все события ></a></h5>
    <div class="horizontal-scroll">
      <Activity 
        @infoOpen="(info) => $emit('infoOpen', info)"
        v-for="activity in filterOnlyNew(60 * 60 * 24, 'starttime', activities)" 
        :key="activity.id" 
        :activity="activity"
      />
    </div>
    <h5 class="section-title">Статистика <a href="/?tab=Statistics" class="more-link">Подробнее ></a></h5>
  </div>
</template>

<script>
export default {
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
  methods: {
    filterOnlyNew(offset, dateProp, array){
      return array
      .filter((e) => (this.$parseDate(e[dateProp]) - this.$now()) >= 0 && (this.$parseDate(e[dateProp]) - this.$now()) < this.$parseDate(offset))
      .sort((a, b) => a[dateProp] - b[dateProp])
    },
  }
}
</script>

<style>
.horizontal-scroll{
  overflow-x: auto;
  display: flex;
  scrollbar-width: none;
}
.horizontal-scroll::-webkit-scrollbar{
  width: none;
}

.section-title{
  position: relative;
  top: 10px;
  color: var(--primary-font-c);
  font-size: .92em;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
}
.main .block:first-child{
  margin-left: 0;
}
.main .block:last-child{
  margin-right: 0;
}
</style>