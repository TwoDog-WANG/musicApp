<template>
    <div class="main-space">
        <div class="contain-space">
            <ListSpace></ListSpace>
        </div>
    </div>
</template>

<script>
import ListSpace from './listSpace/ListSpace.vue'
export default {
    components: {
        ListSpace,
    },
}
</script>

<style>
    .main-space {
        width: 500px;
        height: 370px;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
    }
    .contain-space {
        position: absolute;
        height: 100%;
    }
</style>