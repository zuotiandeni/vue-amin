<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tap">
        <li
          :class="{ current: item.current }"
          v-for="(item, index) in menuTab"
          :key="index"
          @click="toggleMney(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-from"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetSms } from "@/api/login"
import {xxxx} from "@/api/login.js";
// 3.0中声明对象类型使用reactive，声明的那个数据时使用ref
// eslint-disable-next-line no-unused-vars
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVcode
} from "@/utils/validate";
export default {
  name: "login",
  setup(props, context) {
    // 这里面放置data数据，生命周期，自定义的函数
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      console.log(stripscript(value));

      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6~20位的数字+字母!"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      if (model.value === "login") {
        return callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVcode(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    /**
     * 声明数据
     */
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // console.log(reactive)

    // toRefs()将对象转为基础数据类型，解构
    /*
    function useMousePosition(){
      const pos = reactive({
        x: 0,
        y: 1
      });
      return toRefs(pos);
    }
    const { x, y } = useMousePosition;
    */

    // 登录注册模块值
    const model = ref("login");
    console.log(model.value);
    console.log(isRef(model) ? true : false);

    // 表单数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    // 表单验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    /**
     * 生命周期
     */
    // 挂载完成
    onMounted(() => {
      
    });

    /**
     * 声明函数
     */
    // vue数据驱动视图渲染；
    const toggleMney = item => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      // 高光
      item.current = true;
      // 修改模块值
      model.value = item.type;
    };
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /**
     * 提交表单 
     */
    // 获取验证码；
    const getSms = (()=>{
      let data = {
        username: ruleForm.username,
      }
      GetSms(data);
    })

    return {
      menuTab,
      model,
      toggleMney,
      submitForm,
      ruleForm,
      rules,
      getSms
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh; // vh基于可视区的大小
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tap {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-from {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
