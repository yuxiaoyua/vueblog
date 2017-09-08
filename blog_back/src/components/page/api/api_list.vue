<template>
    <div>
        <table v-for='item in alldata'>
            <tr>
                <td>一级类名:{{item.onedata.cnname}}</td>
                <td>标识:{{item.onedata.enname}}</td>
                <td>文章数量:0</td>
                <td><button type="button"  @click='handleTure(item.onedata.enname,"one")'>修改</button>
                <button type="button" @click='handleDelete(item.onedata.id,item.onedata.enname,"one")'>删除</button></td>
            </tr>
            <tr v-for="key in item.twodata">
                <td>一级类名:{{key.cnname}}</td>
                <td>标识:{{key.enname}}</td>
                <td>文章数量:0</td>
                <td><button type="button" @click='handleTure(key.enname,"two")'>修改</button>
                <button type="button" @click='handleDelete(item.onedata.id,item.onedata.enname,"two",key.id)'>删除</button></td>
            </tr>
        </table>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
                <div>
                    <h3>类名修改</h3>
                    <p>名称:<input type="text" v-model="ruleForm2.cnname_two"></input></p>
                    <p>标识:<input v-model.number="ruleForm2.enname_two"></input></p>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="handleUpdata">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog
            title="提示"
            :visible.sync="deletes"
            size="tiny"
            :before-close="handleClose">
                确定删除吗？
            <span slot="footer" class="dialog-footer">
                <el-button @click="deletes=false">取 消</el-button>
                <el-button type="primary" @click="deleteFn">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "list",
        data() {
            return {
                alldata: [],
                dialogVisible: false,
                deletes: false,
                ruleForm2: {
                    cnname_two: "",
                    enname_two: ""
                },
                oldenname: '',
                entwo: "",
                enone: "",
                id: "",
                twoId: ""
            }
        },
        methods: {
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleTure(id, ele) {
                this.dialogVisible = true
                this.oldenname = id;
                if (ele == 'one') {
                    this.enone = 'one'
                } else {
                    this.entwo = 'two'
                }
            },
            handleDelete(id, oldname, ele, twoId) {
                this.deletes = true
                this.oldenname = oldname;
                this.id = id;
                this.twoId = twoId;
                if (ele == 'one') {
                    this.enone = 'one'
                } else {
                    this.entwo = 'two'
                }
            },
            handleUpdata() {
                var _this = this;
                if (this.enone != '') {
                    this.axios.post("/api/back_class/amend_class_one", {
                        oldenname_one: this.oldenname, //原一级类名的英文标识
                        enname_one: _this.ruleForm2.enname_two, //新改变一级类名的英文标识
                        cnname_one: _this.ruleForm2.cnname_two //新改变一级类名的中文标识
                    }).then(function(data) {
                        _this.$message(data.data.msg);
                        _this.$router.go(0);
                        // console.log(_this.$router.go(0))
                    })
                    this.dialogVisible = false;
                } else {
                    // console.log(this.oldenname)
                    this.axios.post("/api/back_class/amend_class_two", {
                        oldenname_two: this.oldenname, //原一级类名的英文标识
                        enname_two: _this.ruleForm2.enname_two, //新改变一级类名的英文标识
                        cnname_two: _this.ruleForm2.cnname_two //新改变一级类名的中文标识
                    }).then(function(data) {
                        _this.$message(data.data.msg);
                        _this.$router.go(0);
                    })
                    this.dialogVisible = false;
                }
            },
            deleteFn() {
                var _this = this;
                if (this.enone != '') {
                    // console.log(this.id, this.oldenname);
                    this.axios.post("/api/back_class/delete_one", {
                        id: this.id, //一级类名的id
                        enname_one: this.oldenname //一级类名的英文标识
                    }).then(function(data) {
                        _this.$message(data.data.msg);
                        _this.$router.go(0);
                        // console.log(_this.$router.go(0))
                    })
                    this.dialogVisible = false;
                } else {
                    // console.log(this.id, this.twoId, this.oldenname);
                    this.axios.post("/api/back_class/delete_two", {
                        oneI: this.id, //一级分类id
                        twoId: this.twoId, //二级分类id
                        enname_one: this.oldenname //一级分类英文标识
                    }).then(function(data) {
                        _this.$message(data.data.msg);
                        _this.$router.go(0);
                    })
                    this.dialogVisible = false;
                }
                this.deletes = false;
            }
        },
        mounted() {
            this.axios.get("/api/back_class/class_list").then(function(data) {
                this.alldata = data.data.data
                console.log(data.data.data);
            }.bind(this))
        }
    }
</script>
<style scoped>
    .pageContent {
        width: 100%;
        height: auto;
    }
    
    .el-table .info-row {
        background: #c9e5f5;
    }
    
    .el-table .positive-row {
        background: #e2f0e4;
    }
    
    .rodiu {
        width: 100%;
        height: auto;
    }
    
    .el-dialog__body p {
        margin: 10px 0;
    }
    
    table {
        width: 100%;
        line-height: 40px;
        font-size: 16px;
    }
    
    table tr:nth-of-type(1) {
        width: 100%;
        height: 40px;
        background: #225555;
        color: #fff;
    }
    
    table tr {
        height: 40px;
        background: #fff0f1;
    }
    
    table tr td {
        width: 25%;
    }
    
    tr button {
        margin: 0 10px;
        border: none;
        background: #fff;
        width: 50px;
        height: 30px;
        border-radius: 3px;
    }
    /*.top {
        width: 100%;
        height: 40px;
        background: #c9e5f5;
        line-height: 40px;
        font-size: 16px;
        display: flex;
    }*/
</style>