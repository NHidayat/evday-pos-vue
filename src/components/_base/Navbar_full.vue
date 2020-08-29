<template>
  <header>
    <nav>
      <b-container fluid>
        <b-row>
          <div class="navigation col-md-12">
            <b-row>
              <b-col cols="1" md="1" class="menu-icon-section">
                <img src="../../assets/menu.png" class="menu-icon">
              </b-col>
              <b-col cols="9" md="10" class="nav-title">
                <h4 class="text-center">{{ title }}</h4>
              </b-col>
              <b-col cols="1" md="1" class="search-section"></b-col>
            </b-row>
          </div>
        </b-row>
      </b-container>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  props: ['title'],
  mounted() {
    this.navMenu()
  },
  methods: {
    navMenu() {
      const menuIcon = document.querySelector('.menu-icon')
      const sidebar = document.querySelector('.sidebar')
      const op = { sidebarOn: true }
      menuIcon.addEventListener('click', () => {
        if (op.sidebarOn === true) {
          sidebar.style.left = '-60px'
          op.sidebarOn = false
        } else {
          sidebar.style.left = '0'
          op.sidebarOn = true
        }
      })
    }
  }
}

</script>
