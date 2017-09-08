<template>
  <div class="body">
    <el-table
    :data="everypage"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="article_name"
      label="文章名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="editer"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间" 
      width="300">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
</el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="alldata.length">
    </el-pagination>
</div>
<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
    <span>确定删除此文章?</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteFn">确 定</el-button>
  </span>
</el-dialog>
<!--<el-dialog title="提示" :visible.sync="updatat" size="tiny" :before-close="handleClose">
    <div>
        修改
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="updatat=false">取 消</el-button>
        <el-button type="primary" @click="handleUpdata">确 定</el-button>
    </span>
</el-dialog>-->
</div>

</template>

<style>
    .el-table .info-row {
        background: #c9e5f5;
    }
    
    .el-table .positive-row {
        background: #e2f0e4;
    }
    
    .el-table th>.cell {
        text-align: center;
    }
</style>

<script>
    export default {
        methods: {
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleSizeChange(val) {
                this.everypagelist = val
            },
            handleCurrentChange(val) {
                this.everypage = this.alldata.slice(this.everypagelist * (val - 1), this.everypagelist * val)
            },
            // 修改
            handleEdit(index, rows) {
                // console.log(rows)
                this.updatat = true
                this.$router.push({
                    name: "api_text_amend",
                    params: rows
                })
            },
            // 点击触发弹窗
            handleDelete(index, rows) {
                this.itemId = rows.id
                this.enname_one = rows.enname_one
                console.log(rows);
                this.dialogVisible = true
            },
            // 确定后调用删除接口
            deleteFn() {
                var _this = this;
                this.axios.post("/api/back_article/deleteOne", {
                    enname_one: this.enname_one, //一级类名的英文标识，文章表名
                    id: this.itemId //文章的id
                }).then(function(data) {
                    console.log(data.data)
                    _this.$message(data.data.msg);
                    _this.$router.go(0);
                }.bind(this))
            },
            //确定后调用修改接口
            handleUpdata() {

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
        },
        data() {
            return {
                updatat: false,
                itemId: "", //删除时使用的id
                dialogVisible: false, //删除弹窗的控制
                currentPage4: 0, //当前显示页
                alldata: [], //请求的元数据
                everypagelist: 5, //默认每页显示条数
                everypage: [], //每页的数据
                enname_one: '' //删除时的上级名字
            }
        },
        mounted() {
            this.axios.get("/api/back_article/getArticle").then(function(data) {
                this.alldata = data.data.data
                console.log(this.alldata)
            }.bind(this))
        }
    }
</script>
<style scoped>
    .body {
        margin: 20px 0;
    }
    
    .block {
        margin: 40px auto;
    }
    
    .block div {
        text-align: center
    }
</style>