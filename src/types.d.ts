import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
    // 扩展 Text
    interface SlateText {
        text: string
    }

    // 扩展 Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}

export declare interface Response<T = any>{
    data:      T; 
    code:       number; 
    message:   string; 
}

export declare interface PageParams{
    page?:      number;
    per_page?:       number;
}

export declare interface Paginate<T = any> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: any;
    last_page: number;
    last_page_url: string;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
    next_page_url: string;
    path: string;
    per_page: number;
    to: any;
    total: number;
}

export declare interface Link{
    name:      string; 
    url:       string; 
    account?:   string; 
    password?:  string;
}

export declare interface Cate{
    id?:        number;
    pid:        number;
    name:       string;
    title:      string;
    sort:       number;
    children:   Cate[];
}

export declare interface Note{
    id?:        number; 
    cate_id:    number;
    title:      string; 
    content?:   string;
    cates?:      Cate[];
}


export declare interface ResponseLinkList{
    [key: string]: Link; 
}

export declare interface ResponseNoteList{
    [key: string]: Link; 
}