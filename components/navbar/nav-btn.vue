<template>
    <div @click="changeTab" :class="['nav-tab', 'nav-' + tabName.toLowerCase(), {'nav-active': isActive}]">
        <svg class="nav-icon" :viewBox="tab.viewBox || '0 0 88 88'" xmlns="http://www.w3.org/2000/svg" v-html="tab.btnHtml"></svg>
        <span v-if="tab.addon" :class="tab.addon.class">{{ tab.addon.text }}</span>
    </div>
</template>

<script>
export default {
    props: {
        tab: {
            required: true
        }
    },
    data(){
        return{
            isActive: this.tab.isActive,
            tabName: this.tab.tabName
        }
    },
    methods:{
        changeTab(){
            if(this.isActive){
                if(this.tabName == 'Create'){
                    this.$emit('toPreviousTab');
                } 
                
                return;
            }

            this.isActive = !this.isActive; 
            this.$emit('changeTab', this.tab)
        }
    },
}
</script>