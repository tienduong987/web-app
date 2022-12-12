<template>
  <div :id="id" class="project-info">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-project-info')" name="1">
        <div class="be-flex content">
          <img :src="propertyProject.avatar" alt="" />
          <div class="info">
            <h3 class="header-6 text-semibold">{{ propertyProject.projectName }}</h3>
            <p class="body-small text-medium">
              {{ getDescription }}
            </p>
            <span class="body-small text-medium cursor" @click="handleView">View project</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailProjectInfo extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) propertyProject!: Record<string, any>
    @Prop({ required: true, type: Number, default: 0 }) id!: number
    activeDetail = ['1']

    get getDescription(): string {
      const language = window.localStorage.getItem('bc-lang')!
      if (this.propertyProject.description) {
        const objDesc = JSON.parse(this.propertyProject.description)
        if (language === 'vi') {
          return objDesc.vi
        }
        return objDesc.en
      }
      return ''
    }

    handleView(): void {
      this.$router.push({ name: 'DetailProject', params: { type: 'project', id: this.propertyProject.id } })
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.project-info {
    .collapse {
      margin-top: 32px;
      border-top: none;
      border-bottom: none;
      .collapse-item {
        padding-bottom: 24px;
        border-bottom: 1px solid #dbdbdb;
        .el-collapse-item__header {
          height: 32px;
          line-height: 32px;
          font-size: 24px;
          font-weight: 600;
          border-bottom: none;
          .el-collapse-item__arrow {
            transform: rotate(90deg);
          }
          .el-collapse-item__arrow.is-active {
            transform: rotate(270deg);
          }
        }

        .el-collapse-item__wrap {
          margin-top: 24px;
          border-bottom: none;
          .el-collapse-item__content {
            .content {
              img {
                max-width: 437px;
                max-height: 240px;
              }
              .info {
                margin-left: 24px;
                h3 {
                  color: var(--bc-text-market-primary);
                }
                p {
                  margin: 8px 0;
                  color: var(--bc-text-discript);
                }
                span {
                  color: var(--bc-text-hyperlink);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
