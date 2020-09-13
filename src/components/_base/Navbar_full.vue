<template>
  <header>
    <nav>
      <b-container fluid>
        <b-row>
          <div class="navigation col-md-12">
            <b-row>
              <b-col cols="3" md="2" class="menu-icon-section">
                <img src="../../assets/menu.png" class="menu-icon">
              </b-col>
              <b-col cols="6" md="7" class="nav-title">
                <h4 class="text-center">{{ title }}</h4>
              </b-col>
              <b-col cols="3" md="3" class="search-section">
                <div class="float-right">
                  <b-dropdown variant="outline" right>
                    <template v-slot:button-content>
                      <b-icon icon="person-circle"></b-icon> <span>{{ user.user_name }}</span>
                    </template>
                    <b-dropdown-item @click="logout"><b-icon icon="door-open"></b-icon> Logout</b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-row>
      </b-container>
    </nav>
  </header>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  props: ['title'],
  mounted() {
    this.navMenu()
  },
  computed: {
    ...mapGetters({ user: 'user' })
  },
  methods: {
    ...mapActions(['logout']),
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
