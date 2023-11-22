<template>
    <div>
        <section class="flex justify-center">
            <el-radio-group class="" v-model="toggle">
                <el-radio-button label="0">本机IP</el-radio-button>
                <el-radio-button label="1">IP查询</el-radio-button>
            </el-radio-group>
        </section>
        <section class="container mx-auto" v-if="toggle === '0'">
            <el-table class="w-screen-lg mx-auto" :data="ipLocations" stripe>
                <el-table-column prop="source" width="150" label="数据来源" />
                <el-table-column prop="ip" width="300" label="IP地址" />
                <el-table-column prop="isp" width="150"  label="运营商" />
                <el-table-column prop="location" label="归属地" />
            </el-table>
        </section>
        <section class="container mx-auto" v-show="toggle === '1'">
            <el-input placeholder="Please input" class="input-with-select">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
            <el-card>
                <div class="flex">
                    <el-descriptions :column="1" border>
                        <el-descriptions-item label="Username" label-align="right" align="center" label-class-name="my-label"
                            class-name="my-content" width="150px">kooriookami</el-descriptions-item>
                        <el-descriptions-item label="Telephone" label-align="right"
                            align="center">18100000000</el-descriptions-item>
                        <el-descriptions-item label="Place" label-align="right" align="center">Suzhou</el-descriptions-item>
                        <el-descriptions-item label="Remarks" label-align="right" align="center">
                            <el-tag size="small">School</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="Address" label-align="right" align="center">No.1188, Wuzhong Avenue,
                            Wuzhong District, Suzhou, Jiangsu
                            Province</el-descriptions-item>
                    </el-descriptions>
                    <div class="flex-auto h-400px" id="map"/>
                </div>
            </el-card>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref,onMounted, watch } from "vue"
import { Search } from '@element-plus/icons-vue'
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import {
    getIpFromBaidu, 
    getIpFromCountryIs, 
    getIpFromFreeipapi, 
    getIpFromIpwho, 
    getIpFromPconline, 
    getIpv4FromIpSb, 
    getIpv6FromIpSb, 
    getIpFromGeojs,
getIpFromIpify,
} from "@/apis/ip";

const map = ref<L.Map>();
const toggle = ref('0');
const latitude = ref(22.5559); // 初始经度
const longitude = ref(114.0577); // 初始纬度

onMounted(() => {
  map.value = L.map('map').setView([latitude.value, longitude.value], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
});

watch([latitude, longitude], () => {
  if (map.value) {
    map.value.setView([latitude.value, longitude.value]);
  }
});

declare interface IpLocation{
        source:    string; 
        ip:        string; 
        isp:       string;
        location:   string;
    }
const ipLocations = ref<IpLocation[]>([]);
// baidu
getIpFromBaidu().then(res => {
    ipLocations.value.push({
        source: '百度(中国)',
        ip: res.data.ip,
        isp: res.data.data.isp,
        location: `${res.data.data.continent} ${res.data.data.country} ${res.data.data.prov} ${res.data.data.city} ${res.data.data.district}`,
    })
})

getIpv4FromIpSb().then(res => {
    ipLocations.value.push({
        source: 'ip.sb(美国)',
        ip: res.data.ip,
        isp: res.data.isp,
        location: `${res.data.country} ${res.data.region} ${res.data.city}`,
    })
})
getIpv6FromIpSb().then(res => {
    ipLocations.value.push({
        source: 'ip.sb(美国)',
        ip: res.data.ip,
        isp: res.data.isp,
        location: `${res.data.country} ${res.data.region} ${res.data.city}`,
    })
})
getIpFromPconline().then(res => {
    ipLocations.value.push({
        source: '太平洋科技(中国)',
        ip: res.data.ip,
        isp: '-',
        location: `${res.data.pro} ${res.data.city}`,
    })
})
getIpFromIpwho().then(res => {
    ipLocations.value.push({
        source: 'ipwho(新加坡)',
        ip: res.data.ip,
        isp: res.data.connection.isp,
        location: `${res.data.continent} ${res.data.country} ${res.data.region} ${res.data.city}`,
    })
})
getIpFromFreeipapi().then(res => {
    ipLocations.value.push({
        source: 'freeipapi(加拿大)',
        ip: res.data.ipAddress,
        isp: '-',
        location: `${res.data.continent} ${res.data.countryName} ${res.data.regionName} ${res.data.cityName}`,
    })
})
getIpFromCountryIs().then(res => {
    ipLocations.value.push({
        source: 'CountryIs(加拿大)',
        ip: res.data.ip,
        isp: '-',
        location: `${res.data.country}`,
    })
})
getIpFromGeojs().then(res => {
    ipLocations.value.push({
        source: 'Geojs(加拿大)',
        ip: res.data.ip,
        isp: res.data.organization_name,
        location: `${res.data.country} ${res.data.region} ${res.data.city}`,
    })
})
getIpFromIpify().then(res => {
    ipLocations.value.push({
        source: 'ipify(美国)',
        ip: res.data.ip,
        isp: '-',
        location: '-',
    })
})
</script>

<style scoped></style>