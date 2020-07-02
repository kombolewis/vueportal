<template lang="pug">
    div
        p ResetPassword
        input(type="text" :value="id_no")
</template>

<script>
export default {
    name:'ResetPassword',

    props:['id_no']
}
</script>