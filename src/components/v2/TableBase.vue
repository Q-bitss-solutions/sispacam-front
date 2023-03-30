<template>
  <table>
    <tr>
      <th
        v-for="(header, index) in headers"
        :key="index"
        style="border-bottom-width: 2px;"
      >
        {{ header.label }}
      </th>
    </tr>
    <tr
      v-for="(item, index) in data"
      :key="index"
    >
      <td
        v-for="(header, index) in headers"
        :key="index"
      >
        {{ item[header.field] }}
      </td>
      <td v-if="options.length" style="position: relative;">
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
        {
          label: 'Example Header',
          field: 'example'
        }
      ]),
    },
    data: {
      type: Array,
      default: () => ([
        {
          example: 'value 1',
        }
      ]),
    },
    options: {
      type: Array,
      default: () => ([
        {
          label: 'example',
          action: (context) => console.log(context),
        }
      ]),
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
  border: 1px solid #dddddd;
  border-collapse: collapse;
  color: #404041;
  padding: 8px;
}
table {
  width: 100%;
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

</style>