<template>
    <div @click="() => $dataStore.info = null" class="info" v-if="info">
        <div @click.stop="() => null" class="info-content">
            <h3 class="info-title">{{ info.title }}</h3>
            <div class="tags">
                <span class="tag" v-for="tag in info.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="info-text-cont">
                <div class="info-statements">
                    <div class="info-statement" v-for="statement in info.statements" :key="statement.name">
                        <span class="info-statement-name">{{ statement.name }}</span>:&nbsp;
                        <span class="info-statement-text">{{ statement.text }}</span>
                    </div>
                </div>
                <div class="info-btns">
                    <button
                        @click="() => $dataStore.info = null" 
                        v-for="btn in info.btns" 
                        :key="btn.name" @click.stop="btn.fn" 
                        :class="`info-btn info-btn-${btn.name} ${btn.type ? ' btn-' + btn.type : ''}`"
                    >{{ btn.text }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        info: {
            required: true
        }
    }
}
</script>

<style scoped>
.info{
    --mg-b: 7.5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgba(0,0,0, .4);
    position: fixed;
}
.info-content{
    display: flex;  
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: calc(100% - var(--pad));
    min-height: 40vh;
    box-sizing: border-box;
    padding: 15px var(--pad);
    background-color: var(--bgc);
    border-radius: 10px 10px 0 0;
}
.info-title{
    width: 100%;
    padding-bottom: var(--mg-b);
    margin-bottom: var(--mg-b);
    font-size: 1.4em;
    font-weight: bold;
    border-bottom: 3px solid var(--basic-c);
}
.info-text-cont{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}

.info-statements{
    margin-bottom: var(--mg-b);
}
.info-statement{
    margin-bottom: 2px;
    font-size: .9em;
    color: var(--primary-font-c);
}
.info-statement-name{
    font-weight: bold;
}

.info-btns{
    width: 100%;
}
.info-btn{
    margin-bottom: 5px;
}
button {
    width: 100% !important;
}

.tags{
    margin-bottom: var(--mg-b);
}
</style>