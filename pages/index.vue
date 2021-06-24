<template>
  <div class="app">
    <h1>{{title}}</h1>
    <component @infoOpen="(info) => {this.info = info;}" :is="activeTab" :tasks="$dataStore.tasks" :activities="$dataStore.activities"></component>
    <Navbar @changeTab="changeTab" /> 
    <Info :info="$dataStore.info"/>
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
  head(){
    return {
      title: 'Tasks | ' + this.activeTab
    }
  },
  components: {
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
  data(){
    return {
      activeTab: 'Main',
      title: 'Главная',
      urlParams: null,
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
