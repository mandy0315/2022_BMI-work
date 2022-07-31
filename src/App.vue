<template>
  <div class="bg-c-background h-full w-full relative">
    <section class="bg-c-gray w-full">
      <div class="flex py-21 box-container justify-between items-center">
        <img src="/images/header-BMICLogo.png" alt="BMICLogo_yellow" />
        <div>
          <number-input v-model:value="height" title="身高 cm" placeholder="請輸入身高" />
          <number-input v-model:value="weight" title="體重 kg" placeholder="請輸入體重" />
        </div>
        <button
          class="bg-c-yellow rounded-1/2 h-30 text-xl text-c-dark w-30"
          :class="{ 'opacity-50 cursor-not-allowed': isDisabled }"
          :disabled="isDisabled"
          @click.prevent="handleResult"
        >
          看結果
        </button>
      </div>
    </section>
    <section class="min-h-[calc(100vh-400px)] pt-12 pb-20 box-container">
      <h1 class="text-c-gray text-center pb-10 text-2xl">BMI 紀錄</h1>

      <!-- 記錄區塊 -->
      <template v-if="BMIList.length">
        <div
          v-for="item in BMIList"
          :key="item.id"
          class="bg-white border-solid flex border-l-5 h-16 text-c-gray text-xl mb-4 w-full grid px-4 grid-cols-12 justify-between items-center box-border"
          :class="getColorState(item.state)"
        >
          <p class="col-span-3">{{ item.state }}</p>
          <p class="col-span-2"><span class="text-base pr-2">BMI</span>{{ item.value }}</p>
          <p class="col-span-2"><span class="text-base pr-2">weight</span>{{ item.weight }}kg</p>
          <p class="col-span-2"><span class="text-base pr-2">height</span>{{ item.height }}cm</p>
          <p class="text-base text-right col-span-2">{{ formatDate(item.date) }}</p>
          <i class="text-right col-span-1" @click="deleteItem(item.id)">
            <i-ep-delete-filled />
          </i>
        </div>
      </template>
    </section>
    <footer class="bg-c-yellow w-full py-4">
      <img class="mx-auto" src="/images/footer-BMICLogo.png" alt="BMICLogo_black" />
    </footer>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { database } from "/src/utils/firebaseConfig";
import { ref, computed } from "vue";

const height = ref();
const weight = ref();
const isDisabled = computed(() => !(height.value && weight.value));
const BMIRef = database.collection("bmi");
const BMIList = ref([]);

// 取得 BMIList 資料
BMIRef.orderBy("date")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      BMIList.value.push(doc.data());
    });
  });

const calcBMI = () => {
  const value = (weight.value / (height.value / 100) ** 2).toFixed(2);
  let state;
  switch (true) {
    case value <= 18.5:
      state = "過輕";
      break;
    case value > 18.5 && value <= 25:
      state = "理想";
      break;
    case value > 25 && value <= 30:
      state = "過重";
      break;
    case value > 30 && value <= 35:
      state = "輕度肥胖";
      break;
    case value > 35 && value <= 40:
      state = "中度肥胖";
      break;
    case value > 40:
      state = "重度肥胖";
      break;
  }
  return { value, state };
};

// 處理渲染資料
const getColorState = (state) => {
  const borderColor = {
    過輕: "border-c-blue",
    理想: "border-c-green",
    過重: "border-c-orange-300",
    輕度肥胖: "border-c-orange-500",
    中度肥胖: "border-c-orange-500",
    重度肥胖: "border-c-red-500",
  };
  return borderColor[state];
};
const formatDate = (date) => dayjs(date).format("DD-MM-YYYY");

const handleResult = () => {
  const { value, state } = calcBMI();

  const date = dayjs().toJSON();

  const info = {
    value,
    state,
    weight: weight.value,
    height: height.value,
    date,
  };

  // 上傳 BMIList
  BMIList.value.push(info);
  // 上傳資料庫
  BMIRef.add(info)
    .then(function () {
      console.log("yes");
    })
    .catch(function (error) {
      console.error("Error ", error);
    });
};

const deleteItem = (id) => {
  BMIList.value = BMIList.value.filter((item) => item.id !== id);
  // 刪除資料
  BMIRef.doc(id).delete();
};
</script>
