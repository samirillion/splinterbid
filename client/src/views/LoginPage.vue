<template>
  <section class="section">
  <v-form v-model="valid">
    <v-text-field
      v-model="userName"
      :rules="nameRules"
      :counter="10"
      label="User Name"
      required
    ></v-text-field>
    <v-text-field
      :type="'password'"
      label="Password"
      required
    ></v-text-field>
       <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </section>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      userName: '',
      nameRules: [
        v => !!v || 'UserName is required',
      ],
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          console.log('cool')
          this.router.push({ path: 'home' })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>