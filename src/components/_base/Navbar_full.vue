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
    return {
    }
  },
  props: ['title'],
  methods: {
  }
}

</script>
