import axios from '@/utils/axios'
import {Cate, Note, PageParams, Paginate, Response, ResponseLinkList, Link} from '@/types'

export const getTabs = () => axios.get('/tabs.json', {baseURL:'/'})

export const getLinkList = () => axios.get<Response<ResponseLinkList[]>>(`/api/link`)
export const storeLink = (data: Link) => axios.post<Response>(`/api/link`, data)


export const getNoteList = (params?: PageParams) => axios.get<Response<Paginate<Note>>>(`/api/note`, {params})
export const storeNote = (data: Note) => axios.post<Response>(`/api/note`, data)
export const getNote = (id: number) => axios.get<Response<Note>>(`/api/note/${id}`)

export const getCate = () => axios.get<Response<Cate[]>>(`/api/cate`)