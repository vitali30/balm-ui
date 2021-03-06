<template>
  <docs-page name="table" demo-count="2">
    <template #hero>
      <ui-table
        row-checkbox
        :data="heroData"
        :thead="thead1"
        :tbody="tbody1"
      ></ui-table>
    </template>

    <!-- Content -->
    <section class="demo-wrapper">
      <h6 :class="$tt('headline6')">1.1 Default Usage</h6>
      <div class="demo">
        <ui-table :data="heroData" :thead="thead1" :tbody="tbody1"></ui-table>
      </div>
      <ui-snippet :code="$store.demos[1]"></ui-snippet>
    </section>

    <section class="demo-wrapper">
      <h6 :class="$tt('headline6')">1.2 Advanced Usage</h6>
      <p>
        Selected rows: {{ selectedRows }} ( Selected key: {{ selectedKey }})
      </p>
      <div class="demo">
        <ui-table
          v-model="selectedRows"
          fullwidth
          row-checkbox
          :data="myData"
          :thead="thead2"
          :tbody="tbody2"
          :tfoot="tfoot"
          :selected-key="selectedKey"
        >
          <template #th-dessert>
            Dessert
            <ui-icon v-tooltip="'100g serving'" aria-describedby="th-cell-1"
              >error_outline</ui-icon
            >
          </template>
          <template #dessert="{ data }">
            <div class="dessert">{{ data.dessert }}</div>
          </template>
          <template #actions="{ data }">
            <ui-icon @click="show(data)">description</ui-icon>
            <ui-icon @click="show(data)">edit</ui-icon>
            <ui-icon @click="show(data)">delete</ui-icon>
          </template>
        </ui-table>
        <ui-pagination
          v-model="page"
          :total="total"
          show-total
          @change="onPage"
        ></ui-pagination>
      </div>
      <ui-snippet :code="$store.demos[2]"></ui-snippet>
    </section>
  </docs-page>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: '%s - Table'
  },
  data() {
    return {
      // hero
      heroData: [],
      // demo
      myData: [],
      thead1: [
        'ID',
        'Dessert (100g serving)',
        'Calories',
        'Fat (g)',
        'Carbs (g)',
        'Protein (g)'
      ],
      tbody1: ['id', 'dessert', 'calories', 'fat', 'carbs', 'protein'],
      // thead2: [
      //   [
      //     {
      //       value: 'ID',
      //       rowspan: 2,
      //       sort: 'asc',
      //       columnId: 'id'
      //     },
      //     {
      //       value: 'Type1',
      //       colspan: 2,
      //       align: 'center'
      //     },
      //     {
      //       value: 'Type2',
      //       colspan: 3,
      //       align: 'center'
      //     },
      //     {
      //       value: 'Actions',
      //       rowspan: 2
      //     }
      //   ],
      //   [
      //     {
      //       value: 'Dessert (100g serving)',
      //       class: 'gg'
      //     },
      //     {
      //       value: 'Calories',
      //       sort: 'desc',
      //       columnId: 'calories'
      //     },
      //     'Fat (g)',
      //     'Carbs (g)',
      //     'Protein (g)'
      //   ]
      // ],
      thead2: [
        {
          value: 'ID',
          sort: 'asc',
          columnId: 'id'
        },
        {
          // value: 'Dessert (100g serving)',
          slot: 'th-dessert',
          class: 'gg',
          sort: 'none',
          columnId: 'dessert'
        },
        'Calories',
        'Fat (g)',
        'Carbs (g)',
        'Protein (g)',
        'Actions'
      ],
      tbody2: [
        'id',
        {
          slot: 'dessert'
        },
        {
          field: 'calories',
          numeric: true
        },
        {
          field: 'fat',
          fn: (data) => {
            return data.fat.toFixed(1);
          }
        },
        'carbs',
        {
          field: 'protein',
          class: (data) => {
            return data.protein > 5 ? 'red' : 'green';
          }
        },
        {
          slot: 'actions'
        }
      ],
      tfoot: [
        {
          field: 'id',
          fnName: 'count'
        },
        null,
        {
          field: 'calories',
          fnName: 'sum',
          align: 'right',
          class: 'test'
        },
        {
          field: 'fat',
          fnName: 'avg'
        },
        {
          field: 'carbs',
          fnName: 'max'
        },
        {
          field: 'protein',
          fnName: 'min'
        }
      ],
      selectedRows: [1, 2, 4],
      selectedKey: 'id',
      page: 1,
      total: 12
    };
  },
  async created() {
    let data = await this.$http.get('/data/table.json');
    this.heroData = data.slice(0, 3);
    this.myData = data;
  },
  methods: {
    show(data) {
      console.log(data);
    },
    async onPage(page) {
      let url = `/data/table${page === 2 ? page : ''}.json`;
      this.myData = await this.$http.get(url);
    }
  }
};
</script>
