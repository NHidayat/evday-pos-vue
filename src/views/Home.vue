<template>
  <div class="home">
    <Navbar />
    <section class="contents">
      <b-row>
        <Sidebar />
        <Cards />
        <Cart />
      </b-row>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import Sidebar from '../components/_base/Sidebar'
import Cards from '../components/_base/Cards'
import Cart from '../components/_base/Cart'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Cards,
    Cart
  }
}

</script>
<style src="../assets/css/style.css">
