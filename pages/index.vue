<template>
  <div class="app">
    <h1>{{title}}</h1>
    <component @infoOpen="(info) => {this.info = info;}" :is="activeTab" :tasks="tasks" :activities="activities"></component>
    <Navbar @changeTab="changeTab" /> 
    <Info :info="info"/>
  </div>
</template>

<script>
import Info from '../components/info.vue'
import Activity from '../components/activity.vue'
import Task from '../components/task.vue'
import Main from '../components/tabs/main.vue'
import Calendar from '../components/tabs/calendar'
import Create from '../components/tabs/create.vue'
import Statistics from '../components/tabs/statistics.vue'
import Sets from '../components/tabs/sets.vue'
import Navbar from '../components/navbar'
export default {
  head (){
    return {
      title: 'Tasks | ' + this.activeTab
    }
  },
  components:{
    Info: Info, 
    Activity: Activity,
    Task: Task,
    Navbar: Navbar,
    Main: Main,
    Calendar: Calendar,
    Create: Create,
    Statistics: Statistics,
    Sets: Sets, 
  },
  data() {
    return{
      activeTab: 'Main',
      title: 'Главная',
      urlParams: null,
      info: null,
      activities: [
        {
          id: 1,
          title: 'test',
          tags: ['lesson'],
          starttime: 1624048802 + 60 * 60 * 40,
          endtime: 1725042000,
          addonInfo: [
            {name: 'Аудитория', text: 'Ц1 301'}
          ]
        },
        {
          id: 2,
          title: 'test2',
          tags: ['lesson'],
          starttime: 1624048802 + 60 * 60 * 41,
          endtime: 1624048802 + 60 * 60 * 45
        },
        // пример json'а для activity
        {
          id: 3,
          title: 'test3',
          tags: ['lesson'],
          starttime: 1624000000+ 60 * 60 * 2000,
          endtime: 1624049000
        },
      ],
      tasks: [
        {
          id: 1,
          title: 'test',
          tags: ['HW'],
          deadline: 1624048802 + 60 * 60 * 60
        },
        {
          id: 2,
          title: 'test2',
          tags: ['HW'],
          deadline: 1624048802 + 60 * 60 * 60
        },
        // пример json'а для task
        {
          id: 3,
          title: 'test3',
          tags: ['HW'],
          deadline: 1624048802 + 60 * 60 * 60
        },
        {
          id: 4,
          title: 'test',
          tags: ['HW'],
          deadline: 1624048802 + 60 * 60 * 60
        },
        {
          id: 5,
          title: 'test2',
          tags: ['HW'],
          deadline: 1624048802 + 60 * 60 * 60
        },
        // пример json'а для task
        {
          id: 6,
          title: 'test3',
          tags: ['HW'],
          deadline: 1624048802 + 60 * 60 * 60
        }
      ],
    }
  },
  methods: {
    changeTab(tab){
      this.activeTab = tab.tabName;
      this.title = tab.title

      this.urlParams.set('tab', tab.tabName);

      const changedTabUrl = new URL(window.location.href);
      changedTabUrl.searchParams.set('tab', tab.tabName);
      history.pushState(null, null, changedTabUrl);
    }
  },
  created(){
    this.urlParams = new URLSearchParams(window.location.search);
  },
  mounted(){
    this.navbar = this.$children.filter(c => c.$options._componentTag == 'Navbar')[0];

    const urlTab = this.navbar.tabs.filter(t => t.tabName === this.urlParams.get('tab'))[0];
    if(urlTab){
      this.navbar.changeTab(urlTab)
      this.changeTab(urlTab);
    }

    const app = document.querySelector('.app');
    app.style.height = document.documentElement.clientHeight + 'px'; 
    window.onresize = () => {
      app.style.height = document.documentElement.clientHeight + 'px'; 
    }
  }
}
</script>
