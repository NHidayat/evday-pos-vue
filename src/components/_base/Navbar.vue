<template>
  <header>
    <nav>
      <b-container fluid>
        <b-row>
          <div class="navigation col-md-8">
            <b-row>
              <b-col cols="1" md="1" class="menu-icon-section">
                <img src="../../assets/menu.png" class="menu-icon" ref="menuicon">
              </b-col>
              <b-col md="10" cols="9" class="nav-title">
                <div v-if="!isSearch">
                  <div class="float-right">
                    <b-dropdown variant="outline" >
                      <template v-slot:button-content>
                        <b-icon icon="person-circle"></b-icon> <span>{{ user.user_name }}</span>
                      </template>
                      <b-dropdown-item @click="logout"><b-icon icon="door-open"></b-icon> Logout</b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <h4 class="text-center">Evday POS</h4>
                </div>
                <b-nav-form @submit.prevent="searchProduct" class="float-right mt-3" v-else>
                  <b-form-input type="search" size="sm" class="mr-sm-1" v-model="form.product_name" placeholder="Search" v-focus></b-form-input>
                </b-nav-form>
              </b-col>
              <b-col cols="1" md="1" class="search-section">
                <img src="../../assets/search.png" class="search-icon" v-if="!isSearch" @click="showSearch">
                <h4 v-else class="mt-3">
                  <b-icon-x-circle class="c-close-icon" @click="closeSearch"></b-icon-x-circle>
                </h4>
              </b-col>
            </b-row>
          </div>
          <b-col md="4" class="cart-header">
            <h5 class="text-center">Cart <span class="badge badge-cart">{{ count }}</span></h5>
          </b-col>
          <div class="cart-mobile">
            <a href="#cart-section">
              <h5 class="text-center">
                <b-icon-cart></b-icon-cart><span class="badge badge-cart">{{ count }}</span>
              </h5>
            </a>
          </div>
        </b-row>
      </b-container>
    </nav>
  </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {
      isSearch: false,
      form: { product_name: '' }
    }
  },
  mounted() {
    this.navMenu()
  },
  computed: {
    ...mapGetters({ count: 'cartCount', user: 'user' })
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
    },
    showSearch() {
      this.isSearch = true
    },
    closeSearch() {
      this.isSearch = false
    },
    searchProduct() {
      this.$emit('searchProduct', this.form)
    },
    incCount(data) {
      console.log(data)
      this.cartCount += data
    }
  }
}

</script>
