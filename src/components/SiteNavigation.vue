  <template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
      <nav
        class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
      >
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-sun text-2xl"></i>
            <p class="text-2xl">CityTenki</p>
          </div>
        </RouterLink>
  
        <div class="flex gap-3 flex-1 justify-end">
          <i
            class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
            @click="toggleModal"
          ></i>
          <i
            class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
            @click="addCity"
            v-if="route.query.preview"
            ></i>
        </div>
  
        <BaseModal
          :modalActive="modalActive"
          @close-modal="toggleModal"
        >
        <div class="text-black">
          <h1 class="text-2xl mb-1">Giới thiệu:</h1>
          <p class="mb-4">
            CityTenki cho phép bạn theo dõi thời tiết hiện tại và dự báo thời tiết tương lai của các thành phố bạn chọn.
          </p>
          <h2 class="text-2xl">Cách sử dụng:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Tìm kiếm thành phố của bạn bằng cách nhập tên vào thanh tìm kiếm.
            </li>
            <li>
              Chọn một thành phố trong kết quả, bạn sẽ được chuyển đến thông tin thời tiết hiện tại của thành phố đó.
            </li>
            <li>
              Theo dõi thành phố bằng cách nhấp vào biểu tượng "+" ở góc trên bên phải. Lưu thành phố để bạn xem lại sau trên trang chủ.
            </li>
          </ol>

          <h2 class="text-2xl">Xóa một thành phố</h2>
          <p>
            Nếu bạn không muốn theo dõi một thành phố nữa, chỉ cần chọn thành phố đó trong trang chủ, ở cuối trang sẽ có tùy chọn để xóa thành phố.
          </p>
        </div>
        </BaseModal>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { RouterLink, useRoute, useRouter } from "vue-router";
  import { ref } from "vue";
  import BaseModal from "./BaseModal.vue";
  import { uid } from "uid";
  const route = useRoute(); 
  const router = useRouter();
  const savedCities = ref([])

  const addCity = () => {
    if (localStorage.getItem("saveCities")) {
      savedCities.value = JSON.parse (
        localStorage.getItem("savedCities")
    );
    };
    const locationObj  = {
      id: uid(),
      state: route.params.state,
      city: route.params.city,
      coords: {
        lat: route.query.lat,
        lng: route.query.lng,
      }
    }

    savedCities.value.push(locationObj);
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
    
    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObj.id;
    router.replace({query})
  
  }

  const modalActive = ref(null);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };
  </script>
