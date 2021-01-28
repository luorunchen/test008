<template>
  <div>
    <div class="rightWapper">
      <div class="right_one">
        <div class="chaxun">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <!-- <el-form-item> 12312 </el-form-item> -->
          </el-form>
        </div>
        <template>
          <div class="scroll_wapper">
            <div class="right_info">
              <ul
                class="olList"
                v-for="(item, index) in SElec_DetailElecDevice_List"
                :key="index"
                @click="(dialogVisible = true), echart_wapper(item.BH)"
              >
                <li>{{ index + 1 }}.{{ item.text }}</li>
                <li>地址:{{ item.MC }}</li>
                <li>报警次数:{{ item.value }}</li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 搜索内容弹窗 -->
    <div class="titleWapper">
      <el-dialog :visible.sync="dialogVisible" width="60%">
        <div
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgb(4, 19, 54,1)"
        >
          <p class="title_name">
            {{ GetMapDataListName.name }}
          </p>

          <el-row :gutter="20">
            <el-col :span="8">
              <!-- 电气火灾展示数据 -->
              <template
                v-if="
                  this.$route.name == 'electricalFire' ||
                  this.$route.name == 'EmergencyManagement' ||
                  this.$route.name == 'PowerDetection' ||
                  this.$route.name == 'Panorama'
                "
              >
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    @click="(innerVisible = true), see()"
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                  >
                    <ul>
                      <li>在线监测:{{ item.productNumber }}</li>
                      <li>更新时间:{{ item.alarmFaultDate }}</li>
                      <li>
                        报警类型:
                        <span
                          style="color: #f830af"
                          v-if="item.typeName != '正常'"
                        >
                          {{ item.typeName }}</span
                        ><span style="color: #6dff64" v-else>
                          {{ item.typeName }}</span
                        >
                      </li>

                      <li>位置:{{ item.installLocation }}</li>
                    </ul>
                  </div>
                </div>
              </template>
              <!-- 消防水展示数据 -->
              <template v-if="this.$route.name == 'FireWaterSystem'">
                <div class="scroll_wapper">
                  <!-- 水压表 -->
                  <div
                    class="left_one"
                    @click="(FireWaterSystemDialog = true), shuiyaSee('shuiya')"
                  >
                    <ul>
                      <li>消防水位</li>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>报警类型</li>
                      <li>位置</li>
                    </ul>
                  </div>
                  <!-- 液压表 -->
                  <div
                    class="left_one"
                    @click="(FireWaterSystemDialog = true), shuiyaSee('yeya')"
                  >
                    <ul>
                      <li>消防液压表</li>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>报警类型</li>
                      <li>位置</li>
                    </ul>
                  </div>
                </div>
              </template>
              <!-- 火灾报警与燃气探测展示数据 -->
              <template
                v-if="
                  this.$route.name == 'FireAlarmSystem' ||
                  this.$route.name == 'GasDetector'
                "
              >
                <div class="scroll_wapper">
                  <div class="left_one" @click="FireAlarmSystemDialog = true">
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>报警类型</li>
                      <li>位置</li>
                    </ul>
                  </div>
                  <div class="left_one" @click="FireAlarmSystemDialog = true">
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>报警类型</li>
                      <li>位置</li>
                    </ul>
                  </div>
                  <div class="left_one" @click="FireAlarmSystemDialog = true">
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>报警类型</li>
                      <li>位置</li>
                    </ul>
                  </div>
                </div>
              </template>
              <!-- 重点部位展示数据 -->
              <template v-if="this.$route.name == 'KeyParts'">
                <div class="scroll_wapper">
                  <div class="left_one">
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="KeyPartsDialog = true"
                          >查看视频</el-button
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="left_one">
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="KeyPartsDialog = true"
                          >查看视频</el-button
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="left_one">
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="KeyPartsDialog = true"
                          >查看视频</el-button
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
              <!-- 智慧型独立烟感展示数据 -->
              <template
                v-if="
                  this.$route.name == 'SmartIndependentSmoke' ||
                  this.$route.name == 'IntelligentFireAlarm' ||
                  this.$route.name == 'FireExtinguisher'
                "
              >
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    @click="
                      (SmartIndependentSmokeDialog = true),
                        SmartIndependentSmokeSee()
                    "
                  >
                    <ul>
                      <li>设备号</li>
                      <li>电池</li>
                      <li>报警类型</li>
                      <li>位置</li>
                    </ul>
                  </div>
                </div>
              </template>
            </el-col>
            <el-col :span="16">
              <div class="right_wapper">
                <el-row
                  style="margin-bottom: 20px"
                  v-show="this.$route.name != 'KeyParts'"
                  :gutter="20"
                >
                  <el-col :span="8"
                    ><div
                      :class="
                        equipmentColor == 'police'
                          ? 'one equipmentColor'
                          : 'one'
                      "
                      @click="equipment('police')"
                    >
                      <div class="one_item"></div>

                      <p>{{ GetMapDataListName.callPolice }}</p>
                      <p>报警设备</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div
                      :class="
                        equipmentColor == 'onLine'
                          ? 'two equipmentColor'
                          : 'two'
                      "
                      @click="equipment('onLine')"
                    >
                      <div class="two_item"></div>
                      <p>{{ GetMapDataListName.onLine }}</p>
                      <p>在线设备</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div
                      :class="
                        equipmentColor == 'offLine'
                          ? 'three equipmentColor'
                          : 'three'
                      "
                      @click="equipment('offLine')"
                    >
                      <div class="three_item"></div>
                      <p>{{ GetMapDataListName.offLine }}</p>
                      <p>离线设备</p>
                    </div></el-col
                  >
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12"
                    ><div
                      class="four"
                      v-for="(item, index) in GetMapDataList.Company"
                      :key="index"
                    >
                      <p>单位简介</p>
                      <p>
                        <span style="color: #28d9ff">{{ item.MC }}</span
                        >位于
                        <span style="color: #28d9ff">{{ item.areaMC }}</span
                        >详细位置
                        <span style="color: #28d9ff">{{ item.address }}</span
                        >单位类型为
                        <span style="color: #28d9ff">其他</span>
                      </p>
                      <p>
                        单位消防安全负责人是<span style="color: #28d9ff">{{
                          item.firename
                        }}</span>
                        联系电话是
                        <span style="color: #28d9ff">{{ item.firephone }}</span>
                        消防安全管理人是
                        <span style="color: #28d9ff">{{ item.resname }}</span>
                        联系电话是
                        <span style="color: #28d9ff">{{ item.resphone }}</span>
                      </p>
                      <p>
                        该单位使用属于
                        <span style="color: #28d9ff">{{ item.typeMC }}</span>
                      </p>
                    </div></el-col
                  >
                  <el-col :span="12"
                    ><div class="five">
                      <p>一周内报警数</p>
                      <div class="echart_wapper"></div></div
                  ></el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <!-- 内部弹窗 ->查看 -->
    <el-dialog
      width="60%"
      title="查看"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-row
        ><el-button type="primary " @click="innerVisible_shebei = true"
          >设备设置</el-button
        >
        <el-button type="primary" @click="innerVisible_lishi = true"
          >历史报警</el-button
        >
      </el-row>
      <div class="shebeiWapper">
        <div class="shebeiInfo">
          <div class="one">
            <p class="titleP">设备信息</p>
            <ul>
              <li>设备编号:1</li>
              <li>设备状态:1</li>
              <li>报警手机:1</li>
              <li>报警信息:1</li>
              <li>报警时间:1</li>
              <li>最新数据:1</li>
              <li>保险单号:1</li>
              <li>安装位置:1</li>
              <li>安装日期:1</li>
              <li>开启流量:1</li>
            </ul>
          </div>
          <div class="two">
            <p class="titleP">填写处置情况</p>
            <el-input
              v-model="input"
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 8 }"
              placeholder="请输入内容"
            ></el-input>
            <el-button type="primary" size="mini" style="margintop: 20px"
              >提交</el-button
            >
          </div>
        </div>

        <div class="shebeiEcharts">
          <el-row :gutter="20">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div class="imgWapper">
                  <el-row>
                    <el-col :span="6">
                      <p style="height: 90px">12</p>
                    </el-col>
                    <el-col :span="6">
                      <p style="height: 90px">12</p>
                    </el-col>
                    <el-col :span="6">
                      <p style="height: 90px">12</p>
                    </el-col>
                    <el-col :span="6">
                      <p style="height: 90px">12</p>
                    </el-col>
                  </el-row>
                  <ul>
                    <li>报警状态:1</li>
                    <li>报警值:1</li>
                    <li>报警时间:1</li>
                  </ul>
                </div>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div class="imgWapper">
                  <el-row>
                    <el-col :span="6">
                      <div style="height: 90px; padding: 10px 0 0 14px">
                        <img
                          src="../../images/电流.png"
                          width="35px"
                          height="35px"
                        />
                      </div>
                    </el-col>
                  </el-row>
                  <ul>
                    <li>报警状态:1</li>
                    <li>报警值:1</li>
                    <li>报警时间:1</li>
                  </ul>
                </div>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div class="imgWapper"></div>
                <ul>
                  <li>报警状态:1</li>
                  <li>报警值:1</li>
                  <li>报警时间:1</li>
                </ul>
              </div></el-col
            >
          </el-row>
          <div class="one_echarts">
            <p class="titleP">电流统计图</p>
            <div class="echarts_wapper_one_search"></div>
          </div>
          <div class="two_echarts">
            <p class="titleP">电流统计图</p>
            <div class="echarts_wapper_two_search"></div>
          </div>
          <div class="three_echarts">
            <p class="titleP">电流统计图</p>
            <div class="echarts_wapper_three_search"></div>
          </div>
          <div class="four_echarts">
            <p class="titleP">电流统计图</p>
            <div class="echarts_wapper_four_search"></div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 内部弹窗->设置设备 -->
    <el-dialog
      width="50%"
      title="内层 Dialog"
      :visible.sync="innerVisible_shebei"
      append-to-body
    >
      <el-row>
        <el-col :span="6"
          ><div class="shezhi_left">
            <p class="titleP">设备信息</p>
            <ul>
              <li>设备编号</li>
              <li>保险单号</li>
              <li>开启流量</li>
              <li>是否授权</li>
            </ul>
          </div></el-col
        >
        <el-col :span="18"
          ><div class="shizhi_right">
            <div class="right_one">
              <p class="titleP">设备开关</p>
              <el-row
                :gutter="20"
                type="flex"
                class="row-bg"
                justify="space-around"
              >
                <el-col :span="8"> <el-button>远程断电</el-button></el-col>
                <el-col :span="8"> <el-button>远程开机</el-button></el-col>
                <el-col :span="8"> <el-button>远程关机</el-button></el-col>
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8"> <el-button>开启蜂鸣器</el-button></el-col>
                <el-col :span="8"> <el-button>关闭蜂鸣器</el-button></el-col>
                <el-col :span="8"> <el-button>远程消音</el-button></el-col>
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8"> <el-button>开启流量</el-button></el-col>
                <el-col :span="8"> <el-button>远程复位</el-button></el-col>
                <el-col :span="8"> <el-button>授权</el-button></el-col>
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8"> <el-button>开启屏蔽器</el-button></el-col>
                <el-col :span="8"> <el-button>下发保险单</el-button></el-col>
                <!-- <el-col :span="8"> <el-button>远程关机</el-button></el-col> -->
              </el-row>
            </div>
            <div class="right_two">
              <p class="titleP">设置</p>
              <div class="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="阀值设置" class="tabs_one" name="first">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                      <el-col :span="4"
                        ><el-button size="mini">取消</el-button></el-col
                      >
                      <el-col :span="4"
                        ><el-button type="primary" size="mini"
                          >确定</el-button
                        ></el-col
                      >
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane
                    label="报警推送方式"
                    name="second"
                    style="text-align: center"
                  >
                    <p>设备状态</p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="App"></el-checkbox>
                      <el-checkbox label="短信"></el-checkbox>
                      <el-checkbox label="手机"></el-checkbox>
                    </el-checkbox-group>
                    <el-row type="flex" justify="center">
                      <el-col :span="4"
                        ><el-button size="mini">取消</el-button></el-col
                      >
                      <el-col :span="4"
                        ><el-button type="primary" size="mini"
                          >确定</el-button
                        ></el-col
                      >
                    </el-row></el-tab-pane
                  >
                  <el-tab-pane label="设备历史故障" name="third">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <el-col :span="11">
                          <el-date-picker
                            type="date"
                            placeholder="开始时间"
                            v-model="sizeForm.date1"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-date-picker
                            type="date"
                            placeholder="结束时间"
                            v-model="sizeForm.date2"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-col>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="onSubmit"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <template>
                      <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-tab-pane>
                  <el-tab-pane label="设置操作记录" name="fourth">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <el-col :span="11">
                          <el-date-picker
                            type="date"
                            placeholder="开始时间"
                            v-model="sizeForm.date1"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-date-picker
                            type="date"
                            placeholder="结束时间"
                            v-model="sizeForm.date2"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-col>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="onSubmit"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <template>
                      <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div></div
        ></el-col>
      </el-row>
    </el-dialog>

    <!-- 内部弹窗->历史报警 -->
    <el-dialog
      title="历史报警"
      append-to-body
      :visible.sync="innerVisible_lishi"
      width="50%"
    >
      <el-form
        size="mini"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="日期:">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="sizeForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="结束时间"
              v-model="sizeForm.date2"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <!-- 消防水液体弹窗 -->
    <el-dialog
      title="实时数据"
      :visible.sync="FireWaterSystemDialog"
      width="50%"
    >
      <div class="FireWaterSystemDialogWapper">
        <p class="title">{{ msg }}</p>
        <!-- 图表容器 -->
        <div class="shuiya_echarts"></div>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-button type="primary" size="small">自诊断查询</el-button>
          </el-col>
          <el-col :span="6"
            ><el-button type="warning" size="small"
              >远程参数更新</el-button
            ></el-col
          >
          <el-col :span="6"
            ><el-button type="danger" size="small"
              >自主布撤防</el-button
            ></el-col
          >
          <el-col :span="6"
            ><el-button type="success" size="small">固件升级</el-button></el-col
          >
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <img src="../../images/four.png" height="137px" alt="" />
          </el-col>

          <el-col :span="6">
            <img src="../../images/battery4.png" height="137px" alt="" />
          </el-col>
        </el-row>
      </div>
      <div class="shuju_echarts">
        <p>设备最近数据分析</p>
        <div class="shuju_echarts_wapper"></div>
      </div>
    </el-dialog>

    <!-- 火灾报警与燃气弹窗共用弹窗 -->
    <el-dialog
      title="设备信息"
      :visible.sync="FireAlarmSystemDialog"
      width="50%"
    >
      <div class="FireAlarmSystemDialog">
        <div class="one">
          <p>设备详情</p>
          <ul>
            <li>设备厂商</li>
            <li>设备类型</li>
            <li>安装位置</li>
            <li>注册时间</li>
            <li>产品编号</li>
          </ul>
        </div>
        <div class="two">
          <p>历史报警</p>
          <el-form
            size="mini"
            :inline="true"
            :model="formInline"
            class="demo-form-inline formList"
          >
            <el-form-item label="日期:">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="开始时间"
                  v-model="sizeForm.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="结束时间"
                  v-model="sizeForm.date2"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
              </el-table>
            </template>
          </el-form>
        </div>
        <div class="three">
          <p>设备事件</p>
        </div>
      </div>
    </el-dialog>

    <!-- 重点部位弹窗 -->
    <el-dialog title="查看视频" :visible.sync="KeyPartsDialog" width="50%">
    </el-dialog>
    <!-- 独立烟感弹窗 -->
    <el-dialog
      title="设备信息"
      :visible.sync="SmartIndependentSmokeDialog"
      width="60%"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="SmartIndependentSmoke">
            <div class="two">
              <p class="titleP">填写处置情况</p>
              <el-input
                v-model="input"
                type="textarea"
                :autosize="{ minRows: 7, maxRows: 8 }"
                placeholder="请输入内容"
              ></el-input>
              <el-button type="primary" size="mini" style="margintop: 20px"
                >提交</el-button
              >
            </div>
          </div>
        </el-col>
        <el-col :span="18" class="SmartIndependentSmoke_right_wapper">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="rihgt_one">
                <p class="titleP">设备信息</p>
                <ul>
                  <li>设备编号</li>
                  <li>时间</li>
                  <li>所在地址</li>
                  <li>所在位置</li>
                </ul>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="right_two">
                <el-row>
                  <el-col :span="12">
                    <img src="../../images/four.png" alt=""
                  /></el-col>
                  <el-col :span="12"
                    ><img src="../../images/battery4.png" alt=""
                  /></el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div class="SmartIndependentSmoke_echars_one">
            <p class="titleP">设备心跳/温度统计图</p>
            <div class="SmartIndependentSmoke_echars_one_wapper"></div>
          </div>
          <div class="lishibaojing">
            <p class="titleP">历史报警</p>
            <el-form
              size="mini"
              :inline="true"
              :model="formInline"
              class="demo-form-inline formList"
            >
              <el-form-item label="日期:">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="开始时间"
                    v-model="sizeForm.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="结束时间"
                    v-model="sizeForm.date2"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <template>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="180">
                  </el-table-column>
                  <el-table-column prop="address" label="地址">
                  </el-table-column>
                </el-table>
              </template>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { GetMapData, getDeviceByPid } from "@/api/index.js";
export default {
  props: ["SElec_DetailElecDevice_List"],
  data() {
    return {
      getDeviceByPidList: "",
      loading: true,
      GetMapDataList: "",
      GetMapDataListName: {
        name: "",
        callPolice: "",
        onLine: "",
        offLine: "",
      },
      //独立烟感
      SmartIndependentSmokeDialog: false,
      //重点部位
      KeyPartsDialog: false,
      // 火灾报警
      FireAlarmSystemDialog: false,
      msg: "",
      FireWaterSystemDialog: false,
      equipmentColor: "police",
      sizeForm: {
        date2: "",
        date1: "",
      },
      innerVisible_lishi: false,
      checkList: [],
      activeName: "second",
      input: "",
      innerVisible: false,
      dialogVisible: false,
      onlineVisible: false,
      innerVisible_shebei: false,
      offlineVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      currentPage4: 4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  mounted() {
    console.log(this.SElec_DetailElecDevice_List, 4564565);
    undefined;
  },

  methods: {
    //独立烟感
    SmartIndependentSmokeSee() {
      this.$nextTick(() => {
        let shui_echart = this.$echarts.init(
          document.querySelector(".SmartIndependentSmoke_echars_one_wapper")
        );
        shui_echart.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["邮件营销", "联盟广告"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
          ],
        });
      });
    },
    // 水压表
    shuiyaSee(data) {
      // this.seeInfo = data;
      let max;
      let name;
      if (data == "shuiya") {
        max = 1000;
        name = "kpa";
        this.msg = "水压表";
      } else {
        this.msg = "液位表";
        max = 20;
        name = "m";
      }

      this.$nextTick(() => {
        let shui_echart = this.$echarts.init(
          document.querySelector(".shuiya_echarts")
        );

        // console.log(option2);

        var option2 = (Math.random() * 1000).toFixed(2) - 0;
        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        // console.log((Math.random() * 100).toFixed(2) - 0);
        // shui_echart.setOption(option, true);
        shui_echart.setOption({
          // tooltip: {
          //   formatter: "{a} <br/>{b} : {c}m",
          // },

          series: [
            {
              // name: "业务指标",
              type: "gauge",
              min: 0,
              max: max,
              detail: { formatter: `{value}${name}` },
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0.2, "#91c7ae"],
                    [0.8, "#63869e"],
                    [1, "#c23531"],
                  ],
                },
              },
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              data: [{ value: option2 }],
            },
          ],
        });
      });
      this.$nextTick(() => {
        let one_echart_left = this.$echarts.init(
          document.querySelector(".shuju_echarts_wapper")
        );
        one_echart_left.setOption({
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "red",
                  },
                },
              },
            },
          ],
        });
      });
    },
    equipment(data) {
      this.equipmentColor = data;
    },
    // 外部弹窗echart
    echart_wapper(data) {
      this.loading = true;
      // console.log(data)
      // const type = 2;
      GetMapData(data, 2, this.utils.userName).then((res) => {
        // console.log(res);
        this.GetMapDataList = res.data;
        this.GetMapDataListName.name = this.GetMapDataList.Company[0].MC;
        this.GetMapDataListName.callPolice = this.GetMapDataList.devMess[0];
        this.GetMapDataListName.onLine = this.GetMapDataList.devMess[1];
        this.GetMapDataListName.offLine = this.GetMapDataList.devMess[2];
        this.loading = false;
        // console.log(res.data, "wwww");
        let name = [];
        let data = [];
        // console.log(res.data.Diagram, 333);
        res.data.Diagram.forEach((element) => {
          name.push(element.date);
          data.push(element.num);
        });
        this.$nextTick(() => {
          let one_echart_left = this.$echarts.init(
            document.querySelector(".echart_wapper")
          );
          one_echart_left.setOption({
            xAxis: {
              type: "category",
              data: name,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            },
            yAxis: {
              type: "value",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            series: [
              {
                data: data,
                type: "line",
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "red",
                    },
                  },
                },
              },
            ],
          });
        });
      });
      getDeviceByPid(data, 1, 2, this.utils.userName).then((res) => {
        // console.log(res.data, 3121);
        this.getDeviceByPidList = res.data;
      });
    },
    // 查看echart图片函数
    see() {
      this.$nextTick(() => {
        let one_echart_left = this.$echarts.init(
          document.querySelector(".echarts_wapper_one_search")
        );

        // 绘制图表
        one_echart_left.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "视频广告",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: "直接访问",
              type: "line",
              stack: "总量",
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: "搜索引擎",
              type: "line",
              stack: "总量",
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        });
        // 第二个图表
        let two_echart_left = this.$echarts.init(
          document.querySelector(".echarts_wapper_two_search")
        );
        two_echart_left.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "视频广告",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: "直接访问",
              type: "line",
              stack: "总量",
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: "搜索引擎",
              type: "line",
              stack: "总量",
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        });

        //第三个图表
        let three_echart_left = this.$echarts.init(
          document.querySelector(".echarts_wapper_three_search")
        );
        three_echart_left.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "视频广告",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: "直接访问",
              type: "line",
              stack: "总量",
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: "搜索引擎",
              type: "line",
              stack: "总量",
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      console.log("submit!");
    },
    // TabS 切换函数
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang='less' scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  // background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   background-color: rgb(13, 30, 77);
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px #1b6c89;
//   background-color: #1b6c89;
// }

.row-bg {
  padding: 5px 10px;

  // background-color: #f9fafc;
}
.titleWapper {
  /deep/.el-dialog__header {
    background: rgb(20, 49, 108);
    padding: 0;
    // /deep/.el-dialog__title {
    //   width: 255px;
    //   height: 30px;
    //   display: inline-block;
    //   background: linear-gradient(90deg, #3053af, #14295a);
    //   color: #fff;
    // }
    // /deep/.el-dialog__headerbtn .el-dialog__close {
    //   color: #fff;
    // }
  }
  /deep/.el-dialog__body {
    color: #fff;
    height: 100%;
    background: linear-gradient(0deg, rgb(39, 65, 132), rgb(2, 17, 50, 0.62));

    border: 1px solid #3486da;
    // border-radius: 6px;
  }
  .title_name {
    width: 255px;
    height: 30px;
    background: linear-gradient(90deg, #3053af, #14295a);
    line-height: 30px;
    padding-left: 16px;
  }
  .scroll_wapper {
    margin-top: 15px;
    // position: relative;
    overflow-y: auto;
    height: 370px; //高度根据需求自行设定
    overflow-x: hidden;
  }
  .scroll_wapper ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  .left_one {
    margin-top: 15px;
    // width: 371px;
    // height: 131px;
    background: linear-gradient(-87deg, #3053af, #14295a);
    border: 1px solid #3486da;
    ul {
      margin: 15px 0 0 15px;
      li {
        margin-bottom: 10px;
      }
    }
  }

  .right_wapper {
    margin-top: 30px;
    .one {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.2);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #f830af;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }

    .one_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .two {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.2);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #30ff32;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }

    .two_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .three {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.5);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #c0cbe9;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }
    .three_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .four {
      height: 274px;
      border: 1px solid #3486da;
      p {
        &:nth-child(1) {
          width: 180px;
          height: 30px;
          background: linear-gradient(90deg, #3053af, #14295a);
          line-height: 30px;
          padding-left: 16px;
          // margin-top: 14px;
          margin: 15px 0 0 15px;
        }
        &:nth-child(2) {
          padding: 0 16px;
          text-indent: 2em;
        }
        &:nth-child(3) {
          padding: 0 16px;
          text-indent: 2em;
        }
        &:nth-child(4) {
          padding: 0 16px;
          text-indent: 2em;
        }
      }
    }
    .five {
      height: 274px;
      border: 1px solid #3486da;
      p {
        width: 180px;
        height: 30px;
        background: linear-gradient(90deg, #3053af, #14295a);
        line-height: 30px;
        padding-left: 16px;
        margin: 15px 0 0 15px;
      }
      .echart_wapper {
        height: 230px;
      }
    }
  }
}
/deep/.el-textarea__inner {
  width: 90%;
  margin-left: 15px;
}
/deep/.el-dialog__header {
  background: #1071e2;

  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}

// /deep/.el-button--primary {
//   background: #1071e2;
// }
.chakan {
  cursor: pointer;
  color: #1071e2;
}
.shezhi_left {
  // background: #bfa;
  height: 160px;
  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  .titleP {
    margin-left: 20px;
    line-height: 40px;
    // text-align: center;
  }
  ul {
    border-top: 1px solid #f3f6fa;
    padding-left: 20px;
    li {
      margin-top: 8px;
    }
  }
}
.shizhi_right {
  .right_one {
    margin-left: 20px;
    height: 265px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    /deep/.el-button {
      width: 100%;
    }
  }
  .right_two {
    margin-top: 20px;
    margin-left: 20px;
    height: 580px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    .tabs {
      padding: 10px 30px;
      p {
        margin-bottom: 5px;
        // margin-top: 20px;
      }
      .tabs_one {
        /deep/.el-input__inner {
          margin-bottom: 20px;
        }
      }

      /deep/.el-button {
        width: 100%;
      }
    }
  }
}
.shebeiWapper {
  margin-top: 25px;
  display: flex;
  height: 1600px;
  .shebeiInfo {
    .one {
      width: 300px;
      height: 315px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      .titleP {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
      }
      ul {
        border-top: 1px solid #f3f6fa;
        padding-left: 20px;
        li {
          margin-top: 8px;
        }
      }
    }
    .two {
      margin-top: 20px;
      width: 300px;
      height: 250px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      // background: #bfa;
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }
      /deep/.el-button--mini {
        margin: 10px 0 0 15px;
      }
    }
  }
  .shebeiEcharts {
    margin-left: 20px;
    width: 750px;
    height: 212px;
    // background: #bfa;
    .imgWapper {
      height: 90px;
      background: #1071e2;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      height: 212px;
      ul {
        margin-left: 15px;
        li {
          margin-top: 15px;
        }
      }
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .two_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_two_search {
        width: 100%;
        height: 300px;
      }
    }
    .three_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_three_search {
        width: 100%;
        height: 300px;
      }
    }
    .four_echarts {
      height: 200px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_four_search {
        width: 100%;
        height: 160px;
      }
    }
    .one_echarts {
      height: 340px;
      // background: #bfa;

      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_one_search {
        width: 100%;
        height: 300px;
      }
    }
  }
}
.rightWapper {
  margin-top: 50px;
  position: absolute;
  z-index: 999;
  right: 20px;
  width: 330px;
  .right_one {
    // background-image: ("../../images/zhengchangbili.png");
    height: 450px;
    background-size: 100% 100%;
    background-image: url("../../images/矩形 10 拷贝 9@2x.png");
    .chaxun {
      padding-top: 20px;
      padding-left: 20px;
      /deep/.el-input__inner {
        background: #021019;
        color: #fff;
        border: 1px solid #3094d5;
      }
    }
    .scroll_wapper {
      // padding-left: px;
      // margin-top: 15px;
      // position: relative;

      overflow-y: auto;
      // height: 290px; //高度根据需求自行设定
      max-height: 350px;
      overflow-x: hidden;
      padding-bottom: -10px;
      .right_info {
        padding-left: 1px;
        // margin-top: 5px;
        margin-left: 3px;
        // padding: none;
        width: 99%;
        // height: 100px;
        border-top: 1px solid #3486da;
        box-sizing: border-box;
        .olList {
          padding-left: 18px;
          font-size: 14px;

          background: linear-gradient(-87deg, #3053af, #14295a);
          border-top: 1px solid #3486da;

          // height: 93px;
          &:nth-child(1) {
            border-top: none;
          }
          li {
            padding-bottom: 5px;
          }
        }
      }
    }
  }
}
.FireWaterSystemDialogWapper {
  width: 500px;
  margin: 0 auto;
  .title {
    text-align: center;
  }
  .shuiya_echarts {
    // width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  .yeya_echarts {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  /deep/.el-button--small {
    width: 120px;
  }
}
.shuju_echarts {
  width: 95%;
  height: 450px;
  margin: 0 auto;
  // background: #bfa;
  margin-top: 20px;

  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  p {
    line-height: 20px;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eaeaea;
  }
  .shuju_echarts_wapper {
    // width: 90%;
    height: 410px;
    // margin: 0 auto;
    // background: #bfa;
    // margin-top: 30px;
  }
}

//火灾报警样式
.FireAlarmSystemDialog {
  // margin: 20px 0 0 20px;
  .one {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      margin-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
      }
    }
  }
  .two {
    margin-top: 20px;
    width: 100%;
    // height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
  .formList {
    padding-left: 20px;
  }
  .three {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
}
//独立烟感样式
.SmartIndependentSmoke {
  .two {
    // margin-top: 20px;
    // width: 300px;
    height: 250px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    /deep/.el-button--mini {
      margin: 10px 0 0 15px;
    }
  }
}
.SmartIndependentSmoke_right_wapper {
  .rihgt_one {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      // border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
      }
    }
  }
  .right_two {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    img {
      margin: 12px 70px;
      width: 50%;
      height: 100%;
    }
  }
  .SmartIndependentSmoke_echars_one {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .SmartIndependentSmoke_echars_one_wapper {
      height: 300px;
    }
  }
  .lishibaojing {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .formList {
      padding-left: 20px;
    }
  }
}
</style>