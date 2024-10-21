interface Feature {
    content:string;
    available:boolean;
}
export interface Pack {
    id: number;
    color:string;
    price: string;
    tag:string;
    type:string;
    personalisation: string;
    translation: string;
    content_generation: string;
    cvtech: string;
    features: Feature[];
    import_cv: boolean,
    import_cv_fee: string;


}





