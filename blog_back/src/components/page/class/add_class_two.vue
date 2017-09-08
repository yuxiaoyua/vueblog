<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3>一级类名设置</h3>
<el-form-item label="一级类名选择" prop="type">
  <el-select v-model.number="ruleForm2.type" placeholder="请选择">
    <el-option
      v-for="item in options_type"
      :key="item.id"
      :label="item.cnname"
      :value="item.id" >
    </el-option>
  </el-select>
  
</el-form-item>
<h3>二级类名设置</h3>
<el-form-item label="中文类名">
    <el-input type="text" v-model="ruleForm2.cnname_two" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="英文类名" prop="entwo">
    <el-input v-model.number="ruleForm2.enname_two"></el-input>
</el-form-item>
<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>
</el-form>

</template>

<script>
    export default {
        data() {
            var entwo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    console.log(this.ruleForm2.enname_two)
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_two)) {

                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }

                }
            };
            return {
                ruleForm2: {
                    cnname_two: "",
                    enname_two: "",
                    type: "",
                },
                options_type:[],
                rules2: {
                    entwo: [{
                        validator: entwo,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post('/api/back_class/add_two_class',{
                              oneId:_this.ruleForm2.type,  //所属一级分类id
                              enname_two:_this.ruleForm2.enname_two ,   //二级英文标识
                              cnname_two:_this.ruleForm2.cnname_two   //二级名称
                        }).then(function(data){
                            console.log(data);
                             _this.$message(data.data.msg);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created(){
            var _this=this;
            this.axios.get('/api/back_class/select_one_class').then(function(data){
                    _this.options_type=data.data.data;

            })
          
        }
    }
</script>

<style scoped>
    h3 {
        margin: 20px 0 20px 40px
    }
</style>