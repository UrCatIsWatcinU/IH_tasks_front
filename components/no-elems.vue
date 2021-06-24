<template>
    <div class="no-elem">
        <h2 class="no-elem-title">Нет {{ title }} :(</h2>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>