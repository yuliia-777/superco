// content-cards slider
var swiper = '';
var init = false;

function swiperCards() {
  if (window.innerWidth < 1440) {
    if (!init) {
      init = true;
      swiper = new Swiper('.swiper-cards', {
        spaceBetween: 10,
        centeredSlidesBounds: true,
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            centeredSlides: true
          },
          577: {
            slidesPerView: 2,
            centeredSlides: false
          },
          991: {
            slidesPerView: 3
          }
        },
        navigation: {
          nextEl: '.swiper-cards .swiper-button-next',
          prevEl: '.swiper-cards .swiper-button-prev',
        },
      });
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
}
swiperCards();
window.addEventListener('resize', swiperCards);


// featured-products slider
const swiperProducts = new Swiper('.swiper-products', {
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    780: {
      slidesPerView: 2
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 2
    }
  },
  navigation: {
    nextEl: '.swiper-container .swiper-button-next',
    prevEl: '.swiper-container .swiper-button-prev',
  },
});


// featured-products ajax cart
var form = document.querySelector('#product-form');
var products = document.querySelectorAll('#product');

products.forEach(item => {
  if(item){
    item.addEventListener('click', event => {
      var url = '/products/' + item.getAttribute("product-handle") + '.js';
      fetch(url)
        .then(resp => resp.json())
        .then(function(data) {
          document.getElementById('product-id').value = data.variants[0].id;
      });

      setTimeout(function() {
        form.submit();
      }, 500)
    })
  }
})

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault;
    let formData = {
      'items': [
        {
          'id': document.getElementById('product-id').value,
          'quantity': 1
        }
      ]
    };
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .catch(err => {
        console.log('Error: ' + err);
    })
  })
}