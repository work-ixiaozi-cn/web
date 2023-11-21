import axios from '@/utils/axios'
import { jsonp } from 'vue-jsonp'

export const getIpFromBaidu = () => axios.get('https://qifu-api.baidubce.com/ip/local/geo/v1/district', {baseURL:''})
export const getIpv4FromIpSb = () => axios.get('https://api-ipv4.ip.sb/geoip', {baseURL:''})
export const getIpv6FromIpSb = () => axios.get('https://api-ipv6.ip.sb/geoip', {baseURL:''})
export const getIpFromPconline = () => jsonp('https://whois.pconline.com.cn/ipJson.jsp', {json: true})
export const getIpFromIpwho = (ip:string = '') => axios.get(`https://ipwho.is/${ip}?lang=zh-CN`, {baseURL:''})
export const getIpFromFreeipapi = (ip:string = '') => axios.get(`https://freeipapi.com/api/json/${ip}?lang=zh-CN`, {baseURL:''})
export const getIpFromCountryIs = (ip:string = '') => axios.get(`https://api.country.is/${ip}`, {baseURL:''})
export const getIpFromGeojs = () => axios.get(`https://get.geojs.io/v1/ip/geo.json`, {baseURL:''})
export const getIpFromIpify = () => axios.get(`https://api.ipify.org/?format=json`, {baseURL:''})