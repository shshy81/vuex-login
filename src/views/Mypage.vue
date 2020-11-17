<template>
    <div>
        <h1> {{ userInfo.name }} 어서와~</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['userInfo'])
    }    
}
</script>