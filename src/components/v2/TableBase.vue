<template>
  <table>
    <tr>
      <th v-if="hasColoredBorders" style="border: 0; padding: 0;" />
      <th
        v-for="(header, index) in headers"
        :key="index"
      >
        {{ header.label }}
      </th>
    </tr>
    <tr
      v-for="(item, index) in data"
      :key="index"
      style="box-shadow: 0px 0px 16px #00000029; border-radius: 10px; height: 64px;"
    >
      <td
        v-if="hasColoredBorders"
        class="border-color"
        :class="item.borderColorClass"
        style="padding: 0; border-right: 0; border-top: 0; border-bottom: 0; cursor: pointer;"
        :title="item.borderTitle"
      />
      <td
        v-for="(header, index) in headers"
        :key="index"
      >
        {{ item[header.field] }}
      </td>
      <td v-if="options.length" style="position: relative; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right: 20px;">
        <div style="display: flex; justify-content: center;">
          <div style="padding: 4px; cursor: pointer;" @click="openActions(`table-actions-${index}`)">
            <span
              v-for="(dot, index) in dots"
              :key="index"
              style="height: 5px; width: 5px; display: block; margin-bottom: 5px; border-radius: 100%; background-color: #66afe9;"
            />
          </div>
        </div>
        <div
          :id="`table-actions-${index}`"
          class="hidden"
          style="box-shadow: -3px 3px 6px #00000029; z-index: 10; background-color: white; top: 40px; right: 25px; position: absolute;"
          @mouseleave="openActions(`table-actions-${index}`)"
        >
          <div
            v-for="(option, index) in options"
            :key="index"
          >
            <div
              v-show="Object.hasOwnProperty.call(option, 'isVisible') ? option.isVisible(item) : true"
              style="padding: 10px; width: max-content;"
            >
              <p
                class="menu--text"
                @click="option.action(item)"
              >
                {{ option.label }}
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td
        v-for="(footer, index) in footers"
        :colspan="footer.colSpan"
        :key="index"
      >
        {{ footer.label }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TableBase',
  props: {
    headers: {
      type: Array,
      default: () => ([
        /* {
          label: 'Example Header',
          field: 'example'
        } */
      ]),
    },
    data: {
      type: Array,
      default: () => ([
        /* {
          example: 'value 1',
        } */
      ]),
    },
    options: {
      type: Array,
      default: () => ([
        /* {
          label: 'example',
          action: (context) => console.log(context),
          isVisible: () => false,
        } */
      ]),
    },
    footers: {
      type: Array,
      default: () => ([
        /* {
          label: 'Total',
          colSpan: 1,
        } */
      ]),
    },
    hasColoredBorders: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      dots: [1, 2, 3],
    }
  },
  methods: {
    openActions(id) {
      document.getElementById(id).classList.toggle('hidden')
    },
  },
}
</script>

<style scoped>
table, td, th {
  text-align: center;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 20px;
}
.hidden {
  display: none;
}
.menu--text {
  font-size: 13px;
  margin: 0px;
  cursor: pointer;
}
.menu--text:hover {
  text-decoration-line: underline;
}

.border-color {
  border-left-width: 12px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-style: solid;
}

.border-yellow {
  border-left-color: #FFAD1D;
}
.border-green {
  border-left-color: #13BA40;
}
.border-red {
  border-left-color: #ED4940;
}

</style>