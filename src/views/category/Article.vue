<template>
<el-space wrap direction="vertical">
    <el-card class="box-card" style="width: 83vw; height: 43vh">
        <template #header>
            <div class="card-header">
                <span>已经有的类目</span>
            </div>
        </template>
        <el-tag v-for="tab in tap" :key="tab">{{ tab.key }}</el-tag>
    </el-card>
    <el-card class="box-card" style="width: 83vw; height: 43vh">
        <template #header>
            <div class="card-header">
                <span>添加的新类目</span>
            </div>
        </template>
        <el-tag :key="tag" effect="plain" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{ tag.key }}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+你要添加的类目</el-button>
    </el-card>
</el-space>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            tap: [],
            dynamicTags: [],
            inputVisible: false,
            inputValue: "",
            key: []
        };
    },
    methods: {
        ...mapActions(["getCategoryList", "createCategory", "deleteCategory"]),
        async handleClose(tag) {
            await this.deleteCategory({
                type: "2",
                id: tag.id
            })
            let catlist = await this.getCategoryList({
                type: "2",
            });
            this.key = [];
            this.tap = [];
            this.dynamicTags = [];
            for (let i = 0; i < catlist.data.length; i++) {
                this.tap.push(catlist.data[i]);
                this.key.push(catlist.data[i].key);
            }
            for (let i = 3; i < catlist.data.length; i++) {
                this.dynamicTags.push(catlist.data[i]);
            }
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        async handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                if (this.key.indexOf(inputValue) != -1) {
                    this.$alert("你已经有这个类目", "提示", {
                        confirmButtonText: "确定",
                        callback: (action) => {
                            this.$message({
                                type: "info",
                                message: `action: ${action}`,
                            });
                        },
                    });
                } else {
                    await this.createCategory({
                        type: "2",
                        key: inputValue,
                    });
                    let catlist = await this.getCategoryList({
                        type: "2",
                    });
                    this.key = [];
                    this.tap = [];
                    this.dynamicTags = [];
                    for (let i = 0; i < catlist.data.length; i++) {
                        this.tap.push(catlist.data[i]);
                        this.key.push(catlist.data[i].key);
                    }
                    for (let i = 3; i < catlist.data.length; i++) {
                        this.dynamicTags.push(catlist.data[i]);
                    }
                }
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
    },
    async created() {
        let catlist = await this.getCategoryList({
            type: "2",
        });
        for (let i = 0; i < catlist.data.length; i++) {
            this.tap.push(catlist.data[i]);
            this.key.push(catlist.data[i].key);
        }
        for (let i = 3; i < catlist.data.length; i++) {
            this.dynamicTags.push(catlist.data[i]);
        }
    },
};
</script>

<style scoped>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
