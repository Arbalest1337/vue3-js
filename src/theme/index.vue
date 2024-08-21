<template>
    <div class="theme-container">
        <el-config-provider v-bind="config">
            <slot />
        </el-config-provider>
    </div>
</template>
<script setup name="Theme">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const config = {
    size: 'large',
    locale: zhCn
}
</script>
<style lang="scss">
.delete-messageBox-btn {
    padding: 12px 25px !important;
    &.confirm {
        background: $danger !important;
    }
}
</style>
<style lang="scss" scoped>
.theme-container {
    ::v-deep(.el-container) {
        // 按钮
        .el-button--large {
            padding: 12px 25px;
        }
        .el-button.is-link {
            padding: 2px;
        }

        .el-button--default {
            border-color: $primary-color;
            color: $primary-color;
        }

        .el-pager li {
            border-radius: 50%;
        }

        .el-tooltip__trigger {
            outline: none;
        }
        // tabs
        .el-tabs--border-card {
            background: none;
            border: none;

            & > .el-tabs__header .el-tabs__item {
                font-size: 16px;
                font-weight: bold;
                background: #e1eaf7;
                color: #171717;
                height: 50px;
                padding: 0 70px;
                line-height: 50px;
                &.is-active {
                    background: #fff;
                    color: $primary-color;
                }
            }

            .el-tabs__content {
                background: #fff;
            }
        }

        // 菜单
        .el-menu {
            .el-sub-menu__title {
                font-size: 16px;
                color: $menu-item-font-color;
            }
            .el-menu-item {
                color: $menu-item-font-color;
            }

            // header水平头部菜单
            &.el-menu--horizontal {
                .el-menu-item {
                    font-size: 16px;
                    color: #34495c;
                    @include menuBorder;
                    &.is-active {
                        @include menuBorderActive;
                        font-weight: bold;
                    }
                }
                .el-sub-menu {
                    .el-sub-menu__title {
                        @include menuBorder;
                    }
                    &.is-active > .el-sub-menu__title {
                        @include menuBorderActive;
                    }
                }
            }
            // sidebar侧边菜单
            &.el-menu--vertical {
                border-right: none;
                .el-sub-menu.is-active > .el-sub-menu__title {
                    color: $primary-color;
                }

                .el-menu-item {
                    height: 40px;
                    font-size: 14px;
                    margin: 5px 15px;
                    &.is-active {
                        background: $primary-color;
                        color: #fff;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
}
</style>
