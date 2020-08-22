<template>
  <header>
    <nav>
      <b-container fluid>
        <b-row>
          <div class="navigation col-md-8">
            <b-row>
              <b-col cols="1" md="1" class="menu-icon-section">
                <img src="../../assets/menu.png" class="menu-icon">
              </b-col>
              <b-col md="10" cols="9" class="nav-title">
                <h4 class="text-center">Food Items</h4>
              </b-col>
              <b-col cols="1" md="1" class="search-section">
                <img src="../../assets/search.png" class="search-icon">
              </b-col>
            </b-row>
          </div>
          <b-col md="4" class="cart-header">
            <h5 class="text-center">
              Cart <span class="badge badge-cart">0</span>
            </h5>
          </b-col>
          <div class="cart-mobile">
            <a href="#cart-section">
              <h5 class="text-center">Cart <span class="badge badge-cart">0</span></h5>
            </a>
          </div>
        </b-row>
      </b-container>
    </nav>
  </header>
</template>

<!-- <script></script> -->
