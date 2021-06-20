<template>
    <div @click="() => $emit('infoOpen', info)" class="block activity">
        <div class="block-content">
            <h4 class="activity-title">{{ activity.title }}</h4>
            <div class="tags">
                <span class="tag" v-for="tag in activity.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="activity-times">
                <span :title="$parseDate(activity.starttime, 'long')"> {{ $parseDate(activity.starttime, 'short') }} </span>&nbsp;-&nbsp;
                <span :title="$parseDate(activity.endtime, 'long')"> {{ $parseDate(activity.endtime, 'short') }} </span>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="block-arrow"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>
</template>
<script>
export default {
    props: {
        activity: {
            required: true
        }
    },
    data(){
        return {
            info: {
                title: this.activity.title,
                tags: this.activity.tags,
                statements: [
                    {
                        name: 'Начало',
                        text: this.$parseDate(this.activity.starttime, 'long')
                    },
                    {
                        name: 'Окончание',
                        text: this.$parseDate(this.activity.endtime, 'long')
                    }
                ],
                btns: [
                    {
                        name: 'delete',
                        text: 'Удалить',
                        type: 'angry',
                        fn: this.delete
                    }
                ]
            }
        }
    },
    created(){
        if(this.activity.addonInfo) this.info.statements.push(...this.activity.addonInfo)
    },
    methods: {
        delete(){

        }
    }
}
</script>

<style>

</style>